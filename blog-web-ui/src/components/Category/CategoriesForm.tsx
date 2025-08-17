"use client";

import CatgeoryForm from "@/components/Form/CatgeoryForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import addCategory from "@/hooks/category/addCategory";
import { CategorySchemaType } from "@/lib/types";
import { categorySchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { categoryRefetchAction } from "@/hooks/action";

const CategoriesForm = () => {
  const form = useForm<CategorySchemaType>({
    defaultValues: { name: "" },
    resolver: zodResolver(categorySchema),
    mode: "all",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isValid },
  } = form;

  //   const categoryHandle = async (catData: CategorySchemaType) => {
  //     // await
  //     console.log(catData);
  //   };

  const categoryHandle = async (data: CategorySchemaType) => {
    console.log(data);
    try {
      const { message } = await addCategory(data);

      reset();
      toast.success(message);
      await categoryRefetchAction();
      //   onSuccess();
    } catch (err) {
      console.error(err);
      // you could set a form error or show a toast here
    }
  };

  return (
    <>
      <div className="">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Category</Button>
          </DialogTrigger>

          <DialogContent className="w-[355px]" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={handleSubmit(categoryHandle)}
                className="space-y-4"
              >
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Category name"
                          {...field}
                          disabled={isSubmitting}
                        />
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
                  <Plus
                    size={16}
                    className={isSubmitting ? "animate-spin" : ""}
                  />
                  {isSubmitting ? "Adding…" : "Add Category"}
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

export default CategoriesForm;
