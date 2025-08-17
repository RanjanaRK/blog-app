import { CategorySchemaType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { categorySchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import addCategory from "@/hooks/category/addCategory";
import { toast } from "react-toastify";

type CatgeoryFormProps = {
  onSuccess: () => void;
};

const CatgeoryForm = () => {
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
      //   onSuccess();
    } catch (err) {
      console.error(err);
      // you could set a form error or show a toast here
    }
  };

  return <></>;
};

export default CatgeoryForm;
