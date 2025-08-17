"use client";

import { Eye, EyeOff, IdCard, Loader2 } from "lucide-react";
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
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { RegisterFormType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "@/lib/zodSchema";
import { MagicCard } from "../magicui/magic-card";
import { toast, ToastContainer } from "react-toastify";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { useRouter } from "next/navigation";
import register from "@/hooks/auth/register";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const RegisterForm = () => {
  const [vis, setVis] = useState(false);

  const { push } = useRouter();
  const rhform = useForm<RegisterFormType>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
      adminSecret: "",
    },
    resolver: zodResolver(registerFormSchema),
    mode: "all",
  });

  const { isSubmitting, isValid } = rhform.formState;
  const roleValue = rhform.watch("role");
  const registerFormFunc = async (rfData: RegisterFormType) => {
    // console.log(rfData);

    // if (rfData === undefined) {
    //   return;
    // }

    const { success, message } = await register(rfData);
    if (!success) {
      toast.error(message);
    }

    if (success) {
      toast.success(message);
      push("/auth/login");
    }
  };

  return (
    <>
      <Form {...rhform}>
        <form
          onSubmit={rhform.handleSubmit(registerFormFunc)}
          className="grid h-[95dvh] place-items-center"
        >
          <Card className="w-[320px]">
            <CardHeader className="px-4 py-2">
              <CardTitle className="text-center text-xl font-semibold">
                Register
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pb-0 ">
              <FormField
                control={rhform.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={rhform.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {/* <FormField
                control={rhform.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        // defaultValue="USER"
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USER">User</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={rhform.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Select Role</FormLabel> */}
                    <FormControl>
                      <Controller
                        name="role"
                        control={rhform.control}
                        render={({ field: { onChange, value } }) => (
                          <RadioGroup
                            onValueChange={onChange}
                            value={value}
                            className="flex space-x-4"
                          >
                            <RadioGroupItem value="USER" id="user" />
                            <label htmlFor="user">User</label>
                            <RadioGroupItem value="ADMIN" id="admin" />
                            <label htmlFor="admin">Admin</label>
                          </RadioGroup>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditional Admin Secret Field */}
              {roleValue === "ADMIN" && (
                <FormField
                  control={rhform.control}
                  name="adminSecret"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter admin secret" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button className="w-full" disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <IdCard />
                )}
                Register
              </Button>

              <Separator className="w-full" />
            </CardContent>

            <CardFooter className="p-2">
              <span className="flex w-full justify-center gap-1 text-sm">
                Already have an account?
                <Link
                  href={"/auth/login"}
                  className="font-semibold hover:underline"
                >
                  Login
                </Link>
              </span>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
