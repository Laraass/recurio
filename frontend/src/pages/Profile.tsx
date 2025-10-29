import { useEffect, useState } from "react";
import api from "../api/axios";
import Button from "../components/Button";

interface UserProfile {
  name: string;
  email: string;
  image: string;
  role: "default" | "subscriber" | "admin";
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const toggleSubscriber = async () => {
    if (!user) return;

    try {
      const res = await api.patch("/users/subscribe");
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
      setError("Failed to update role");
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p className="text-base">Loading profile...</p>;
  if (error) return <p className="text-base text-red-600">{error}</p>;

  return (
    <div className="flex flex-col items-center pt-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center gap-3 px-6 py-9 w-full border border-neutral-400 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] rounded-xl">
        {user && (
          <>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">My profile</h1>
              <img src={user.image} alt={user.name} className="size-16" />
              <h2>Name: {user.name}</h2>
              <p>E-mail: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>

            <Button onClick={toggleSubscriber}>
              {user.role === "subscriber"
                ? "Unsubscribe from e-mails"
                : "Subscribe to e-mails"}
            </Button>

            <Button variant="dark" onClick={logout}>
              Log out
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default Profile;
