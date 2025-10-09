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
  className?: string;
}

const Category: React.FC<CategoryProps> = ({ category, className = "" }) => {
  const categoryColor: Record<CategoryProps["category"], string> = {
    Entertainment: "text-red-500",
    Music: "text-purple-500",
    Fitness: "text-emerald-500",
    Cloud: "text-sky-500",
    Shopping: "text-orange-500",
    News: "text-yellow-400",
    Productivity: "text-gray-500",
  };

  return (
    <div className="flex items-center gap-1">
      <Icon
        icon="material-symbols:circle"
        className={`size-6 ${categoryColor[category]} ${className}`}
      />
      <span className="text-base font-medium cursor-default">{category}</span>
    </div>
  );
};

export default Category;
