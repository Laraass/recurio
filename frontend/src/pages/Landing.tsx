import Logo from "../components/Logo"

const Landing: React.FC = () => {
    return (
        <div className="w-screen h-screen bg-gradient-to-br from-[#fd851c] via-[#fda532] to-[#fdc04c]">
            <Logo />
            <h1 className="Keep track of your subscription"></h1>
        </div>
    )
}
export default Landing;