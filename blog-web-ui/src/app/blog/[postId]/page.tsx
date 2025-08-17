import CommentSection from "@/components/Comment/CommentSection";
import postById from "@/hooks/post/postById";
import Image from "next/image";

const page = async ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = await params;
  console.log(postId);

  const { data } = await postById(postId);
  // console.log(data);
  // console.log(`http://127.0.0.1:9000/${data?.coverImage}`);

  if (!data) {
    return (
      <main className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-semibold text-red-500">Post not found</h1>
      </main>
    );
  }

  return (
    <>
      <main className="max-w-3xl mx-auto py-12 px-4 space-y-12">
        <article className="space-y-6">
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={`${process.env.API_URL}${data.coverImage}`}
              alt="Post cover"
              fill
              className="object-contain"
            />
          </div>

          <h1 className="text-4xl font-bold">{data?.title} </h1>

          <div className="text-gray-500 text-sm">
            {new Date(data?.createdAt).toLocaleDateString()}
          </div>

          <div className="prose max-w-none">{data?.content}</div>
        </article>

        <CommentSection postId={postId} />
      </main>
    </>
  );
};

export default page;
