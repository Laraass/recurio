import { Icon } from "@iconify/react";
import { useState, type ChangeEvent } from "react";

export type SearchbarProps = {
  onSearch: (value: string) => void;
  placeholder?: string;
};

const Searchbar = ({
  onSearch,
  placeholder = "Search... ",
}: SearchbarProps) => {
  const [value, setValue] = useState("");

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(value);
    }
  };
  return (
    <div
      className="flex items-center gap-1 px-4 py-2 rounded-3xl border border-neutral-400 
            placeholder-gray-500 placeholder-opacity-100 transition-colors max-w-2xs
            duration-200"
    >
      <input
        type={"search"}
        name={"search"}
        placeholder={placeholder}
        value={value}
        className="focus:outline-none w-full"
        onChange={searchHandler}
        onKeyDown={handleKeyDown}
      ></input>
      <div className="flex items-center">
        {value && (
          <Icon
            icon="mdi:close"
            className=" text-gray-500 hover:text-red-500 cursor-pointer size-5"
            onClick={() => setValue("")}
          />
        )}

        <Icon
          icon="bitcoin-icons:search-filled"
          className="size-7 text-gray-500 cursor-pointer hover:text-neutral-925 active:text-neutral-925"
          onClick={() => onSearch(value)}
        ></Icon>
      </div>
    </div>
  );
};

export default Searchbar;
