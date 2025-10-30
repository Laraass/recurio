import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface UserCardProps {
  name: string;
  email: string;
  role: "default" | "subscriber" | "admin";
  image: string;
  onDelete: () => void;
  onEdit: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  role,
  image,
  onDelete,
  onEdit
}) => {
  return (
    <div className="flex items-center bg-neutral-50 border-b border-neutral-400 p-5 cursor-default justify-between">
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="size-16" />

        <div className="flex flex-col">
          <p className="text-lg font-medium">{name}</p>
          <p className="text-xs">{email}</p>
          <p className="text-xs">{role}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <EditButton onClick={onEdit}/>
        <DeleteButton onConfirm={onDelete} />
      </div>
    </div>
  );
};

export default UserCard;
