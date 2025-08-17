import addCategory from "@/hooks/category/addCategory";
import { EditProfileFormSchemaType } from "@/lib/types";
import { editProfileFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Edit2, Plus } from "lucide-react";
import editAuthProfile from "@/hooks/user/editAuthProfile";
import { profileUpdateAction } from "@/hooks/action";

const EditProfile = ({
  profileInfo,
}: {
  profileInfo: EditProfileFormSchemaType;
}) => {
  const form = useForm<EditProfileFormSchemaType>({
    defaultValues: {
      first_name: profileInfo.first_name || "",
      last_name: profileInfo.last_name || "",
      email: profileInfo.email || "",
      bio: profileInfo.bio || "",
    },
    resolver: zodResolver(editProfileFormSchema),
    mode: "all",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isValid },
  } = form;

  const editProfileHandle = async (data: EditProfileFormSchemaType) => {
    try {
      const { message, success } = await editAuthProfile(data);
      console.log(message);
      console.log(success);

      if (success) {
        reset();
        toast.success(message);
        await profileUpdateAction();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="">
        <Dialog>
          <DialogTrigger asChild>
            <Button className=" w-full bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 transition duration-300">
              Edit Profile
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[400px]" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={handleSubmit(editProfileHandle)}
                className="space-y-4"
              >
                <FormField
                  control={control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Edit2
                    size={16}
                    className={isSubmitting ? "animate-spin" : ""}
                  />
                  {isSubmitting ? "updating.." : "Update"}
                </Button>
              </form>
            </Form>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default EditProfile;
