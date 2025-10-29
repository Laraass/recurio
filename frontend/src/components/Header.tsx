import Logo from "./Logo";

const Header = () => {
  return (
    <header className="fixed top-0 flex items-center justify-center w-full py-2 backdrop-blur-md bg-neutral-50/1 sm:hidden">
      <Logo />
    </header>
  );
};

export default Header;
