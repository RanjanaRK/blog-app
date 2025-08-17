"use client";

import { LucideTrash2, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import deleteComment from "@/hooks/comment/deleteComment";
import { Comments, CommentSchemaType } from "@/lib/types";
import { useAtom } from "jotai";
import { authAtom } from "@/lib/atoms/authAtom";
import { categoryRefetchAction, commentsRefetchAction } from "@/hooks/action";

type DeleteCommentPropsType = {
  commentInfo: Comments;
};

const DeleteComment = ({ commentInfo }: DeleteCommentPropsType) => {
  const [auth] = useAtom(authAtom);

  const deleteCommentFn = async () => {
    const { message, success } = await deleteComment(commentInfo.id);

    console.log(message);
    if (success) {
      toast.success(message);
      await commentsRefetchAction();
    }
    // if (!success) {
    //   toast.success(message);
    // }
  };

  return (
    <>
      {auth?.id === commentInfo.authorId ? (
        <Button
          variant={"ghost"}
          onClick={deleteCommentFn}
          // disabled={load}
          className=" text-destructive"
        >
          <Trash size={16} />
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default DeleteComment;
