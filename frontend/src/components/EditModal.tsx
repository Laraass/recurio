import { useEffect, useState } from "react";
import Button from "./Button";
import Role from "./Role";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    role: "default" | "subscriber" | "admin";
    image: string;
  };
  onSave: (newRole: "default" | "subscriber" | "admin") => void;
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  onClose,
  user,
  onSave,
}) => {
  const [selectedRole, setSelectedRole] = useState(user.role);

  useEffect(() => {
    if (open) {
      setSelectedRole(user.role);
    }
  }, [open, user.role]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      <div className="flex flex-col items-start gap-6 p-6 rounded-xl bg-neutral-50 shadow-[0_0_20px_0_rgba(0,0,0,0.25)]">
        <h2 className="text-2xl font-semibold">Edit user</h2>

        <div className="flex gap-3 items-center">
          <img src={user.image} alt={user.name} className="size-12" />
          <p className="text-xl font-medium">{user.name}</p>
        </div>

        <div className="flex flex-col">
          <p className="text-sm">
            <b>Email: </b>
            {user.email}
          </p>
        </div>

        <div className="flex gap-2">
          <Role
            role="default"
            active={selectedRole === "default"}
            onClick={() => setSelectedRole("default")}
          />
          <Role
            role="subscriber"
            active={selectedRole === "subscriber"}
            onClick={() => setSelectedRole("subscriber")}
          />
          <Role
            role="admin"
            active={selectedRole === "admin"}
            onClick={() => setSelectedRole("admin")}
          />
        </div>

        <div className="flex items-start gap-4">
          <Button
            type="button"
            onClick={() => {
              onSave(selectedRole);
              onClose();
            }}
          >
            Save changes
          </Button>
          <Button type="button" variant="dark" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
