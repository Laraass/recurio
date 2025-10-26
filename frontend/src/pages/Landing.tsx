import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-center gap-4 
    p-6 cursor-default w-screen min-h-screen bg-gradient-to-br from-[#fd851c] 
    via-[#fda532] to-[#fdc04c]"
    >
      <img
        src="/recurio_phone.svg"
        alt="mobile preview"
        className="w-76 max-w-96 animate-[float_4s_ease-in-out_infinite]"
      />
      <div className="flex flex-col gap-4 animate-[fadein_2s_ease-out]">
        <div className="flex flex-col gap-1">
          <Logo />
          <h1 className="text-3xl font-semibold">
            Keep track of your subscriptions
          </h1>
          <p className="text-3xl font-radley">
            Recurio helps you organize, monitor and never miss a payment again.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="dark" onClick={() => navigate("/register")}>
            Get started now
          </Button>
          <Button variant="dark" onClick={() => navigate("/login")}>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Landing;
