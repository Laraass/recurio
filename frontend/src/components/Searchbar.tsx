import { Icon } from "@iconify/react";
import { useState, type ChangeEvent } from "react";

export type SearchbarProps = {
    onSearch: (value: string) => void;
    placeholder?: string;
}

const Searchbar = ({ onSearch, placeholder = "Search... "}: SearchbarProps) => {
    const [value, setValue] = useState("");

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onSearch(value);
        }
    }
    return(
        <div className="flex items-center gap-1 px-4 py-2 rounded-3xl border border-neutral-400 
            placeholder-gray-500 placeholder-opacity-100 transition-colors 
            duration-200 focus:outline-none focus:shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] max-w-2xs">
                <input type={"search"}
                name={"search"} 
                placeholder={placeholder}
                className="focus:outline-none w-full"
                onChange={searchHandler}
                onKeyDown={handleKeyDown}
                >
                
                </input>
                <Icon icon="bitcoin-icons:search-filled" className="size-7.5 text-gray-500" ></Icon>
                
        </div>

    )
}

export default Searchbar
