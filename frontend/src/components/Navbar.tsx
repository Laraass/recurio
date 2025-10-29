import { useEffect, useState } from "react";
import NavbarButton from "./NavbarButton";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [activePage, setActivePage] = useState("home");
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      const user = JSON.parse(existingUser);
      setAdmin(user.role === "admin");
    }
  }, []);

  const navigation = (page: string, path: string) => {
    setActivePage(page);
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 sm:top-0 sm:h-20 flex items-center justify-between w-full sm:px-9 md:py-6 backdrop-blur-md bg-neutral-50/1">
      <a href="/home" className="hidden sm:block">
        <Logo />
      </a>
      <div className="flex flex-row justify-between gap-4 w-full sm:w-auto">
        <NavbarButton
          icon={"icon-park-solid:add"}
          title={"Add subscription"}
          className="text-primary"
          isActive={activePage === "add-subscription"}
          onClick={() => navigation("add-subscription", "/subscriptions")}
        ></NavbarButton>

        <NavbarButton
          icon={"ic:baseline-home"}
          title={"Home"}
          isActive={activePage === "home"}
          onClick={() => navigation("home", "home")}
        ></NavbarButton>

        <NavbarButton
          icon={"streamline:subscription-cashflow"}
          title={"My subscriptions"}
          iconSize={32}
          isActive={activePage === "my-subscriptions"}
          onClick={() => navigation("my-subscriptions", "/my-subscriptions")}
          className="px-2.5"
        ></NavbarButton>
        <NavbarButton
          icon={"mdi:user"}
          title={"Profile"}
          isActive={activePage === "profile"}
          onClick={() => navigation("profile", "/profile")}
        ></NavbarButton>

        {admin && (
          <NavbarButton
            icon={"dashicons:shield"}
            title={"Admin dashboard"}
            isActive={activePage === "admin"}
            onClick={() => navigation("admin", "/admin")}
          ></NavbarButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
