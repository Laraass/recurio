import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Try again.");
      return;
    }

    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("userName", response.data.user.name);
      navigate("/home");
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to register account");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-screen cursor-default w-full sm:p-16 px-4 bg-gradient-to-br from-[#fd851c] via-[#fda532] to-[#fdc04c]">
      <Header />
      <h1 className="text-2xl font-semibold">Register an account</h1>
      <div className="flex flex-col px-6 py-9 w-full max-w-90 bg-neutral-50 border border-neutral-400 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] rounded-xl">
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <InputField
            value={name}
            onChange={(e) => setName(e.target.value)}
            title="Name"
            placeholder="Enter your name"
          ></InputField>
          <InputField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            title="E-mail"
            placeholder="Enter your e-mail"
            type="email"
          ></InputField>
          <InputField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            title="Password"
            placeholder="Enter your password"
            type="password"
          ></InputField>
          <InputField
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            title="Confirm password"
            placeholder="Repeat password"
            type="password"
          ></InputField>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit">Register account</Button>
        </form>
      </div>
      <div className="flex gap-1">
        <p className="">Already have an account?</p>
        <a
          href="/login"
          className="underline hover:underline hover:font-semibold"
        >
          Sign in
        </a>
      </div>
    </div>
  );
};

export default Register;
