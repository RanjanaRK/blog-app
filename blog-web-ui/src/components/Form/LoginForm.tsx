"use client";

import login from "@/hooks/auth/login";
import { LoginFormType } from "@/lib/types";
import { loginFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, IdCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useAtom } from "jotai";
import { authAtom } from "@/lib/atoms/authAtom";
import { loginAction } from "@/hooks/action";

const LoginForm = () => {
  const [vis, setVis] = useState(false);
  const [auth, setAuth] = useAtom(authAtom);

  const { push } = useRouter();

  const rhform = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
    mode: "all",
  });

  const { isSubmitting, isValid } = rhform.formState;

  const loginFormFunc = async (lfData: LoginFormType) => {
    try {
      const { success, message, data } = await login(lfData);

      if (!success || !data || !data.user) {
        toast.error(message);
        return;
      }

      const userRole = data?.user.role;

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
      if (data.user && data.user.id && data.user.email && data.user.role) {
        await setAuth({
          id: data.user.id,
          first_name: data.user.first_name,
          email: data.user.email,
          role: data.user.role,
        });

        console.log(auth);

        await loginAction();
      } else {
        throw new Error("Incomplete user data in login response");
      }

      if (userRole === "ADMIN") {
        push("/profile");
      } else {
        push("/");
      }

      await loginAction();
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      console.error(error);
    }
  };

  return (
    <>
      <Form {...rhform}>
        <form
          onSubmit={rhform.handleSubmit(loginFormFunc)}
          className="grid h-[95dvh] place-items-center"
        >
          <Card className="w-[320px]">
            <CardHeader className="px-4 py-2">
              <CardTitle className="text-center text-xl font-semibold">
                Login
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pb-0">
              <FormField
                control={rhform.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={rhform.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center justify-end">
                        <Input
                          type={vis ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute pe-2"
                          onClick={() => setVis(!vis)}
                        >
                          {vis ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <IdCard />
                )}
                Login
              </Button>

              <Separator className="w-full" />
            </CardContent>

            <CardFooter className="p-2">
              <span className="flex w-full justify-center gap-1 text-sm">
                dont have an account?
                <Link
                  href={"/auth/register"}
                  className="font-semibold hover:underline"
                >
                  Register
                </Link>
              </span>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
