import { useLocation, useNavigate } from "react-router-dom";
import RedstoneLogo from "../assets/redstone-logo.svg";
import ArrowLeft from "../assets/arrow-left.svg";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between gap-16 p-3">
      <div className="flex items-center align-center gap-16">
        <a href="https://app.redstone.finance/" target="_blank">
          <img className="cursor-pointer" width="180" src={RedstoneLogo} />
        </a>
        {location.pathname !== "/" && (
          <div
            className="flex gap-1 align-center cursor-pointer text-gray-400"
            onClick={() => navigate("/")}
          >
            <img src={ArrowLeft} width="20" />
            Back
          </div>
        )}
      </div>
      <a
        className="bg-redstone hover:opacity-75 text-white py-2 px-4 rounded-full"
        href="https://discord.com/invite/PVxBZKFr46"
        target="_blank"
      >
        Contact us
      </a>
    </nav>
  );
};

export default Header;
