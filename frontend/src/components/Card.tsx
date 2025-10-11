import { Icon } from "@iconify/react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface CardProps {
  variant: "Sub" | "MySub" | "Company";
  company?: string;
  description?: string;
  price?: string;
  image?: string;
  onAdd?: () => void;
}

const Card: React.FC<CardProps> = ({
  variant,
  company,
  description,
  price,
  image,
  onAdd,
}) => {
  return (
    <div className="flex items-center bg-neutral-50 border-b border-neutral-400 p-5 cursor-default">
      
    </div>
  );
};

export default Card;
