import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import deletePost from "@/hooks/post/deletePost";
import { toast } from "react-toastify";
import { postRefetchAction, profileUpdateAction } from "@/hooks/action";

type DeleteBlogButtonProps = {
  blogId: string;
};

const DeleteBlogButton = ({ blogId }: DeleteBlogButtonProps) => {
  const deleteBlogHandle = async () => {
    const { message, success } = await deletePost(blogId);

    console.log(message);
    if (success) {
      toast.success(message);
      await profileUpdateAction();
    }
    if (!success) {
      toast.error(message);
    }
  };

  return (
    <>
      <Button
        onClick={deleteBlogHandle}
        // disabled={load}
        className="absolute top-2 right-2 text-destructive"
      >
        <Trash2 />
      </Button>
    </>
  );
};

export default DeleteBlogButton;
