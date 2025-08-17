"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { CommentSchemaType } from "@/lib/types";
import { commentSchema } from "@/lib/zodSchema";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import createComment from "@/hooks/comment/createComment";
import { useAtom } from "jotai";
import { authAtom } from "@/lib/atoms/authAtom";
import { toast } from "react-toastify";
import { categoryRefetchAction, commentsRefetchAction } from "@/hooks/action";

const CommentsForm = ({ postId }: { postId: string }) => {
  const [auth] = useAtom<any>(authAtom);

  const form = useForm<CommentSchemaType>({
    defaultValues: { content: "" },
    resolver: zodResolver(commentSchema),
    mode: "all",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isValid },
  } = form;

  const commentHndle = async (commentData: CommentSchemaType) => {
    console.log(commentData);

    const { success, message } = await createComment(
      commentData,
      postId,
      auth?.id
    );

    if (success) {
      reset();
      toast.success(`succesffuly sent comment `);

      await commentsRefetchAction();
    }
    if (!success) {
      toast.error(`${message} ! please login to comment`);
    }

    console.log(success);
    console.log(message);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(commentHndle)} className="space-y-4">
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Leave comment here.........."
                    {...field}
                    // disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className=" flex items-center justify-center gap-2"
          >
            <Send size={16} className={isSubmitting ? "animate-spin" : ""} />
            {isSubmitting ? "posting..." : "leave comment"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CommentsForm;
