interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "default" | "dark";
  type?: "button" | "submit" | "reset";
  className?: string;
}
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "default",
  type = "button",
  className = "rounded-",
}) => {
  const styles = {
    default: " bg-primary hover:bg-accent active:bg-accent",
    dark: "bg-neutral-950 text-neutral-50 hover:text-primary active:text-primary",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex items-center justify-center px-5.5 py-4 rounded-xl text-base font-bold cursor-pointer transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
