import { PostType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type BlogCardTypes = {
  postData: PostType;
};

const BlogCard = ({ postData }: BlogCardTypes) => {
  console.log(`${process.env.API_URL}${postData.coverImage}`);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Image
        className="w-full h-48 object-cover"
        src={`${process.env.NEXT_PUBLIC_API_URL}${postData.coverImage}`}
        width={100}
        height={100}
        alt={postData.title}
      />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          {postData.title}
        </h2>
        <div
          className="text-gray-600 text-sm mb-4 line-clamp-5 prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.content }}
        />

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {/* <span>
              {new Date(postData.createdAt).toLocaleDateString()}{" "}
              {new Date(postData.createdAt).toLocaleTimeString()}
            </span> */}
          </div>
          <Link
            href={`blog/${postData.id}`}
            className="text-blue-500 underline text-sm font-medium"
          >
            Read Article
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
