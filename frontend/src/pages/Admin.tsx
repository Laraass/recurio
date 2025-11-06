import { useEffect, useState } from "react";
import api from "../api/axios";
import UserCard from "../components/UserCard";
import Modal from "../components/Modal";
import Searchbar from "../components/Searchbar";
import EditModal from "../components/EditModal";
import Button from "../components/Button";

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
  const [editUser, setEditUser] = useState<User | null>(null);
  const [sendEmail, setSendEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const fetchUsers = async (search?: string) => {
    try {
      const url = search ? `/admin/users?search=${search}` : "/admin/users";
      const res = await api.get(url);
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

  const editClick = (user: User) => {
    setEditUser(user);
    setModalOpen(true);
  };

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

  const sendEmails = async () => {
    setSendEmail(true);
    setEmailMessage("");
    try {
      const res = await api.post("/admin/email");
      setEmailMessage(res.data.message);
    } catch (error) {
      console.error("Failed to send emails", error);
      setEmailMessage("Failed to send emails");
    } finally {
      setSendEmail(false);
    }
  };

  if (loading) return <p className="text-base pt-8">Loading users...</p>;
  if (error) return <p className="text-base text-red-600">{error}</p>;

  return (
    <div className="flex flex-col items-center pt-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center sm:gap-3 sm:px-6 sm:py-9 w-full sm:border sm:border-neutral-400 sm:shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] sm:rounded-xl">
        <div className="flex flex-col gap-3 ">
          <h1 className="text-2xl font-bold">Admin dashboard</h1>

          <Searchbar
            onSearch={(value) => fetchUsers(value)}
            placeholder="Search users..."
          />

          <div className="flex flex-col overflow-auto sm:max-h-[34rem] w-full sm:w-110 scrollbar-none rounded-xl border border-neutral-400">
            {users.map((user) => (
              <UserCard
                key={user._id}
                name={user.name}
                email={user.email}
                image={user.image}
                role={user.role}
                onDelete={() => deleteClick(user)}
                onEdit={() => editClick(user)}
              />
            ))}
          </div>

          <Button onClick={sendEmails}>
            {sendEmail ? "Sending..." : "Send out e-mails"}
          </Button>
          {emailMessage && (
            <p className="text-sm text-center">{emailMessage}</p>
          )}
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

      {editUser && (
        <EditModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          user={editUser}
          onSave={async (newRole) => {
            try {
              await api.put(`/admin/users/${editUser._id}/role`, {
                role: newRole,
              });
              fetchUsers();
              setModalOpen(false);
            } catch (error) {
              console.error("Failed to update user role", error);
            }
          }}
        />
      )}
    </div>
  );
};

export default Admin;
