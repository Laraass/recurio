import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-col items-center min-h-screen cursor-default bg-neutral-50">
      <Navbar />
      <Header />

      <main className="w-full flex-1 p-20 sm:p-16 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
