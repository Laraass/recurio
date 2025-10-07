import { Icon } from "@iconify/react";

interface NavbarButtonProps {
  icon: string;
  title: string;
  iconSize?: number;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({
  icon,
  title,
  iconSize = 36,
  className = "",
  isActive = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center justify-center p-2 cursor-pointer hover:bg-neutral-250 transition-colors duration-200
        ${isActive ? "bg-neutral-250" : ""} ${className}`}
    >
      <Icon icon={icon} width={iconSize} height={iconSize} />
    </button>
  );
};

export default NavbarButton;
