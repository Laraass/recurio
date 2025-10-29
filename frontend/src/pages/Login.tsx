import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("userName", response.data.user.name);
      navigate("/home");
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError("Email or password is incorrect.");
      } else {
        setError("Something went wrong, please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-screen cursor-default w-full sm:p-16 px-4 bg-gradient-to-br from-[#fd851c] via-[#fda532] to-[#fdc04c]">
      <Header />
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <div className="flex flex-col px-6 py-9 w-full max-w-90 bg-neutral-50 border border-neutral-400 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] rounded-xl">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit">Sign in</Button>
        </form>
      </div>
      <div className="flex gap-1">
        <p>Don't have an account?</p>
        <a
          href="/register"
          className="underline hover:underline hover:font-semibold"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default Login;
