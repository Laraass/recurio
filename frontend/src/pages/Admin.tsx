import { useEffect, useState } from "react";
import api from "../api/axios";
import UserCard from "../components/UserCard";
import Modal from "../components/Modal";

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: "default" | "subscriber" | "admin";
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [confirmAction, setConfirmAction] = useState<() => void>();
  const [confirmMessage, setConfirmMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteClick = (user: User) => {
    setDeleteUser(user);
    setConfirmMessage(`Are you sure you want to delete ${user.name}?`);
    setModalOpen(true);

    setConfirmAction(() => async () => {
      if (!user._id) return;
      try {
        await api.delete(`/admin/users/${user._id}`);
        fetchUsers();
        setModalOpen(false);
      } catch (error) {
        console.error("Failed to delete user", error);
      }
    });
  };

  if (loading) return <p className="text-base pt-8">Loading users...</p>;
  if (error) return <p className="text-base text-red-600">{error}</p>;

  return (
    <div className="flex flex-col items-center pt-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center sm:gap-3 sm:px-6 sm:py-9 w-full sm:border sm:border-neutral-400 sm:shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] sm:rounded-xl">
        <h1 className="text-2xl"></h1>
        <div className="flex flex-col overflow-auto sm:max-h-[34rem] w-full sm:w-110 scrollbar-none rounded-xl border border-neutral-400">
          {users.map((user) => (
            <UserCard
              key={user._id}
              name={user.name}
              email={user.email}
              image={user.image}
              role={user.role}
              onDelete={() => deleteClick(user)}
            />
          ))}
        </div>
      </div>
      {deleteUser && (
        <Modal
          variant="Confirm"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          confirmAction={confirmAction}
          confirmMessage={confirmMessage}
        />
      )}
    </div>
  );
};

export default Admin;
