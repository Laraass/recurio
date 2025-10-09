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
  return (
    <div className="flex flex-col gap-1 ">
      <label className="font-semibold">{title}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
            px-4 py-3 rounded-xl cursor-pointer border border-neutral-400 
            placeholder-gray-500 placeholder-opacity-100 transition-colors 
            duration-200 focus:outline-none shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] 
            focus:shadow-[0_2px_4px_0_rgba(0,0,0,0.45)] 
            ${className}`}
      ></input>
    </div>
  );
};

export default InputField;
