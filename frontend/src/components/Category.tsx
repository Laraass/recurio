import { Icon } from "@iconify/react";

interface CategoryProps {
  category:
    | "Entertainment"
    | "Music"
    | "Fitness"
    | "Cloud"
    | "Shopping"
    | "News"
    | "Productivity";
  count: number;
  className?: string;
}

const Category: React.FC<CategoryProps> = ({
  category,
  count,
  className = "",
}) => {
  const categoryColor: Record<CategoryProps["category"], string> = {
    Entertainment: "",
    Music: "",
    Fitness: "",
    Cloud: "",
    Shopping: "",
    News: "",
    Productivity: "",
  };

  return (
    <div className="">
      <Icon icon="material-symbols:circle"></Icon>
    </div>
  );
};

export default Category;
