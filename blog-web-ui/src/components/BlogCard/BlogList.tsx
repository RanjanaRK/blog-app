"use client";

import { useEffect, useState } from "react";
import { PostType, Categories } from "@/lib/types";
import BlogCard from "./BlogCard";

type Props = {
  posts: PostType[];
  categories: Categories[];
};

const BlogList = ({ posts, categories }: Props) => {
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>("All");

  useEffect(() => {
    setFilteredPosts(posts);
    setSelectedCat("All");
  }, [posts]);

  const handleFilter = (rawCatId: string) => {
    const catId = rawCatId.trim();
    setSelectedCat(catId);

    const next =
      catId === "All"
        ? posts
        : posts.filter((p) => {
            const key = p.categoryId ?? p.categories.id;
            return key === catId;
          });

    setFilteredPosts(next);
  };

  const activeBtn = "bg-blue-500 text-white";
  const idleBtn =
    "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white";

  return (
    <div className="py-6 px-4">
      <h1 className="text-2xl text-center font-bold mb-4">
        Learn & Read about Digital and Technology
      </h1>

      <div className="flex flex-wrap justify-center mb-6">
        <button
          onClick={() => handleFilter("All")}
          className={`m-1 px-4 py-2 rounded ${
            selectedCat === "All" ? activeBtn : idleBtn
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.id)}
            className={`m-1 px-4 py-2 rounded ${
              selectedCat === cat.id ? activeBtn : idleBtn
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center text-2xl col-span-full">
            No posts found.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <BlogCard key={post.id} postData={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
