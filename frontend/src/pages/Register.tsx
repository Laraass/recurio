import Button from "../components/Button";

const Register: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-2xl font-semibold">Register an account</h1>
      <div className="flex flex-col px-6 py-9 border border-neutral-400 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] rounded-xl">
        <form className="flex flex-col gap-4">
          {/* inpiutfields here */}
          <Button type="submit">Register account</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
