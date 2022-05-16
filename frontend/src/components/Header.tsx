import { useLocation, useNavigate } from "react-router-dom";
import RedstoneLogo from "../assets/redstone-logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between gap-16 p-3">
      <div className="flex items-center align-center gap-16">
        <img
          className="cursor-pointer"
          width="180"
          src={RedstoneLogo}
          onClick={() => navigate("/")}
        />
        {location.pathname !== "/" && (
          <div className="cursor-pointer text-gray-400" onClick={() => navigate("/")}>
            Back
          </div>
        )}
      </div>
      <a
        className="bg-redstone hover:opacity-75 text-white font-bold py-2 px-4 rounded-full"
        href="https://discord.com/invite/PVxBZKFr46"
        target="_blank"
      >
        Contact us
      </a>
    </nav>
  )
};

export default Header;
