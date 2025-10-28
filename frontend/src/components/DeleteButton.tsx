import { Icon } from "@iconify/react";

interface DeleteButtonProps {
  onConfirm?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onConfirm }) => {
  return (
    <button title="Delete" onClick={onConfirm}>
      <Icon
        icon="mingcute:delete-fill"
        className="size-5 text-neutral-925 hover:text-red-600 active:text-red-600 cursor-pointer transition-colors duration-200"
      ></Icon>
    </button>
  );
};

export default DeleteButton;
