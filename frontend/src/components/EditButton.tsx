import { Icon } from "@iconify/react";

interface EditButtonProps {
  onClick?: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button title="Edit" onClick={onClick}>
      <Icon
        icon="ant-design:edit-filled"
        className="size-5 text-neutral-925 hover:text-accent active:text-accent cursor-pointer transition-colors duration-200"
      ></Icon>
    </button>
  );
};

export default EditButton;
