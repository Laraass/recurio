interface RoleProps {
  role: "default" | "subscriber" | "admin";
  active?: boolean;
  onClick?: () => void;
}

const Role: React.FC<RoleProps> = ({ role, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-200
            ${
              active
                ? "bg-primary border border-accent"
                : "bg-neutral-250 border border-neutral-400 hover:bg-neutral-400 cursor-pointer"
            }
        `}
    >
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </button>
  );
};

export default Role;
