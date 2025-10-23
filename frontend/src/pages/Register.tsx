import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-2xl font-semibold">Register an account</h1>
      <div className="flex flex-col px-6 py-9 border border-neutral-400 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] rounded-xl">
        <form className="flex flex-col gap-4">
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
    </div>
  );
};

export default Register;
