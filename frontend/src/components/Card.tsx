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
  onDelete?: () => void;
  onEdit?: () => void;
}

const Card: React.FC<CardProps> = ({
  variant,
  company,
  description,
  price,
  image,
  onAdd,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="flex items-center bg-neutral-50 border-b border-neutral-400 p-5 cursor-default">
      {variant === "Sub" && (
        <div className="flex items-center w-full justify-between">
          <div className="flex gap-4 items-center">
            {image && <img src={image} alt={company} className="size-12" />}

            <div className="flex flex-col">
              {company && <p className="text-lg font-medium">{company}</p>}
              {description && (
                <p className="text-xs line-clamp-1 pr-5">{description}</p>
              )}
            </div>
          </div>
          {price && <p>{price}</p>}
        </div>
      )}
      {variant === "MySub" && (
        <div className="flex items-center w-full justify-between">
          <div className="flex gap-4 items-center">
            {image && (
              <img src={image} alt={company} className="size-12 flex" />
            )}
            <div className="flex flex-col">
              {company && <p className="text-lg font-medium">{company}</p>}
              {price && <p className="text-xs">{price} kr</p>}
              {description && (
                <p className="text-xs line-clamp-1 pr-5">{description}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <EditButton onClick={onEdit}/>
            <DeleteButton onConfirm={onDelete}/>
          </div>
        </div>
      )}
      {variant === "Company" && (
        <div className="flex items-center w-full justify-between">
          <div className="flex gap-4 items-center">
            {image && (
              <img src={image} alt={company} className="size-12 flex" />
            )}
            <div className="flex flex-col">
              {company && <p className="text-lg font-medium">{company}</p>}
            </div>
          </div>
          <button title="Add subscription" onClick={onAdd}>
            <Icon
              icon="icon-park-solid:add"
              className="size-9 text-primary hover:text-accent active:text-accent cursor-pointer"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
