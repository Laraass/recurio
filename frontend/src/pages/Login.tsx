import Button from "../components/Button";

const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-3 pt-8">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <div className="flex flex-col px-6 py-9 w-full max-w-90 border border-neutral-400 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] rounded-xl">
        <form className="flex flex-col gap-4">
          {/* inputfields here */}
          <Button type="submit">Sign in</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
