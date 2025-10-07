import { Icon } from "@iconify/react";

interface NavbarButtonProps {
  icon: string;
  title: string;
  iconSize?: number;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}


export default NavbarButton;
