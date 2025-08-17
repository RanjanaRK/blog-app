import { any } from "zod";
import CommentsForm from "./CommentsForm";
import getComments from "@/hooks/comment/getComments";
import { Card } from "../ui/card";
import { cookies } from "next/headers";
import { Trash2 } from "lucide-react";
import DeleteComment from "./DeleteComment";

const CommentSection = async ({ postId }: { postId: string }) => {
  const token = (await cookies()).get("authCookie")?.value as string;

  const { data, error, isError } = await getComments(postId);

  console.log(data);

  if (isError) {
    console.log(error);
  }

  if (!data) {
    return;
  }
  return (
    <>
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Comments</h2>

        {data.length === 0 ? (
          <p className="italic text-gray-500">No comments yet.</p>
        ) : (
          <Card className="space-y-2">
            {data.map((c) => (
              <div className="flex justify-between px-4" key={c.id}>
                <div className="">
                  <div className="text-sm text-gray-600 mb-1 capitalize">
                    {c?.author?.first_name} {c?.author?.last_name}{" "}
                    <span className="text-xs">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="">{c.content}</p>
                </div>
                <div className="">
                  {token ? <DeleteComment commentInfo={c} /> : ""}
                </div>
              </div>
            ))}
          </Card>
        )}

        {/* Client‐side form */}
        <CommentsForm postId={postId} />
      </section>
    </>
  );
};

export default CommentSection;
