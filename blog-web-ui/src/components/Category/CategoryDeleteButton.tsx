"use client";

import deleteCategory from "@/hooks/category/deleteCategory";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import { categoryRefetchAction } from "@/hooks/action";

const CategoryDeleteButton = ({ catId }: { catId: string }) => {
  const deleteCatHandle = async () => {
    const { message, success } = await deleteCategory(catId);
    console.log(message);
    if (success) {
      toast.success(message);
      await categoryRefetchAction();
    }
  };

  return (
    <>
      <Button
        variant={"ghost"}
        onClick={deleteCatHandle}
        // disabled={load}
        className=" text-destructive"
      >
        <Trash size={16} />
      </Button>
    </>
  );
};

export default CategoryDeleteButton;
