import Image from "next/image";
import { Card } from "../ui/card";
import { PostType } from "@/lib/types";
import Link from "next/link";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import DeleteBlogButton from "./DeleteBlogButton";

type AdminPostPropsType = {
  postData: PostType;
};

const AdminPost = ({ postData }: AdminPostPropsType) => {
  return (
    <>
      <div className="">
        <Card className="relative pt-0 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-[380px] h-[400px]">
          <DeleteBlogButton blogId={postData.id} />
          <Image
            className="w-full h-48 object-cover"
            src={`${process.env.NEXT_PUBLIC_API_URL}${postData.coverImage}`}
            width={100}
            height={100}
            alt={postData.title}
          />

          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{postData.title}</h2>
            <p
              className=" text-sm mb-4 h-14 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <span>{postData.createdAt}</span>
              </div>
              <Link
                href={"/"}
                className="text-blue-500 underline text-sm font-medium"
              >
                Read Article
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AdminPost;
