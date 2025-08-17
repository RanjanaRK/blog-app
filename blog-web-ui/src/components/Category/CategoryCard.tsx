import { Categories } from "@/lib/types";
import CategoryDeleteButton from "./CategoryDeleteButton";

const CategoryCard = ({ cat }: { cat: Categories }) => {
  return (
    <>
      <div className="flex justify-between  sm:w-lg">
        <div className="capitalize ">{cat.name}</div>
        <CategoryDeleteButton catId={cat.id} />
      </div>
    </>
  );
};

export default CategoryCard;
