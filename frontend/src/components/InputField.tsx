import { Icon } from "@iconify/react";
import { useState } from "react";

interface InputFieldProps {
  value: string;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number";
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  title,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1 ">
      <label className="font-semibold">{title}</label>
      <div className="relative flex items-center">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            flex-1 px-4 py-3 rounded-xl cursor-pointer border border-neutral-400 
            placeholder-gray-500 placeholder-opacity-100 transition-colors 
            duration-200 focus:outline-none shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] 
            focus:shadow-[0_2px_4px_0_rgba(0,0,0,0.45)] 
            ${type === "password" ? "pr-10" : ""} ${className}`}
        />

        {type === "password" && (
          <Icon
            icon={showPassword ? "ph:eye-closed" : "ph:eye"}
            className="absolute right-3 text-gray-500 size-5 cursor-pointer hover:text-neutral-925"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
