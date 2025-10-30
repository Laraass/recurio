import Button from "./Button";

interface EditModalProps {
    open: boolean;
    onClose: () => void;
    user: {
        name: string;
        email: string;
        role: "default" | "subscriber" | "admin";
        image: string;
    }
    onSave: (newRole: "default" | "subscriber" | "admin") => void;
}

const EditModal: React.FC<EditModalProps> = ({ open, onClose, user, onSave }) => {
    if (!open) return null;
    
    return(
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      <div className="flex flex-col items-start gap-6 p-6 rounded-xl w-full max-w-80 bg-neutral-50 shadow-[0_0_20px_0_rgba(0,0,0,0.25)]">
        <h2 className="text-2xl font-semibold">Edit user</h2>

        <div className="flex gap-3 items-center">
          <img
            src={user.image}
            alt={user.name}
            className="size-12"
          />
          <p className="text-xl font-medium">{user.name}</p>
        </div>

        <div className="flex flex-col">
            <p className="text-sm"><b>Email: </b>{user.email}</p>
        </div>

        <div className="flex items-start gap-4">
                <Button type="submit"> Save </Button>
                <Button type="button" variant="dark">
                  Cancel
                </Button>
        </div>

        </div>
    </div>
  );
};

export default EditModal;