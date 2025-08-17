import getAllCategory from "@/hooks/category/getAllCategory";
import CategoriesForm from "./CategoriesForm";
import CategoryCard from "./CategoryCard";

const CategoryList = async () => {
  const { data, error, isError } = await getAllCategory();

  return (
    <>
      <div className="py-4">
        <CategoriesForm />
        <div className="text-xl font-semibold mt-6 my-2 underline">
          All Categories
        </div>
        <div className=" space-y-4">
          {data?.map((cat) => (
            <CategoryCard cat={cat} key={cat.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
