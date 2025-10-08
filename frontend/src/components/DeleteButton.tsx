import { Icon } from "@iconify/react";

interface DeleteButtonProps {
  onClick?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button title="Delete" onClick={onClick}>
      <Icon
        icon="mingcute:delete-fill"
        className="size-5 text-neutral-925 hover:text-red-500 active:text-red-500 cursor-pointer transition-colors duration-200"
      ></Icon>
    </button>
  );
};

export default DeleteButton;
