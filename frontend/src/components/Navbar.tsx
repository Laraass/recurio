import { useState } from "react";
import NavbarButton from "./NavbarButton";
import Logo from "./Logo";

const Navbar = () => {
  const [activePage, setActivePage] = useState("home");

  return (
    <nav className="fixed bottom-0 sm:top-0 sm:h-20 flex items-center justify-between w-full sm:px-9 md:py-6 backdrop-blur-md bg-neutral-50/1">
      <a href="/" className="hidden sm:block">
        <Logo />
      </a>
      <div className="flex flex-row justify-between gap-4 w-full sm:w-auto">
        <NavbarButton
          icon={"icon-park-solid:add"}
          title={"Add subscription"}
          className="text-primary"
          isActive={activePage === "add-subscription"}
          onClick={() => setActivePage("add-subscription")}
        ></NavbarButton>
        <NavbarButton
          icon={"ic:baseline-home"}
          title={"Home"}
          isActive={activePage === "home"}
          onClick={() => setActivePage("home")}
        ></NavbarButton>
        <NavbarButton
          icon={"streamline:subscription-cashflow"}
          title={"My subscriptions"}
          iconSize={32}
          isActive={activePage === "my-subscriptions"}
          onClick={() => setActivePage("my-subscriptions")}
          className="px-2.5"
        ></NavbarButton>
        <NavbarButton
          icon={"mdi:user"}
          title={"Profile"}
          isActive={activePage === "profile"}
          onClick={() => setActivePage("profile")}
        ></NavbarButton>
      </div>
    </nav>
  );
};

export default Navbar;
