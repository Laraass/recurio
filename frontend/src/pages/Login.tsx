import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col items-center gap-3 pt-8">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <div className="flex flex-col px-6 py-9 w-full max-w-90 border border-neutral-400 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] rounded-xl">
        <form className="flex flex-col gap-4">
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
