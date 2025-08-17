import BlogList from "@/components/BlogCard/BlogList";
import getAllCategory from "@/hooks/category/getAllCategory";
import getAllPost from "@/hooks/post/getAllPost";

const page = async () => {
  const { data, isError, error } = await getAllPost();
  const { data: cat, isError: catErr } = await getAllCategory();

  if (isError || catErr || !data || !cat) {
    console.error("Failed to load data", isError, catErr);
    return <div className="p-8 text-center">Could not load posts.</div>;
  }

  return (
    <>
      <div className="">
        <div className="flex flex-col ">
          <BlogList posts={data} categories={cat} />
        </div>
      </div>
    </>
  );
};

export default page;
