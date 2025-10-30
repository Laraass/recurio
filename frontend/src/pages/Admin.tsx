import { useEffect, useState } from "react";
import api from "../api/axios";
import UserCard from "../components/UserCard";

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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
