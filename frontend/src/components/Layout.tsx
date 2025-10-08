import type { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({children }: LayoutProps) => {
  return (
    <div className="flex flex-col items-center min-h-screen cursor-default">
      
      <Navbar />

      <main className="w-full flex-1 p-20 md:p-16 px-4">
        {children}
      </main>

    </div>
  );
};

export default Layout;
