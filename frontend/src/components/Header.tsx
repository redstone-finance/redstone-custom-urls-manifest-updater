import { useLocation, useNavigate } from 'react-router-dom';
import RedstoneLogo from '../assets/redstone-logo.svg';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex items-center align-center gap-16 p-3">
      <img
        className="cursor-pointer"
        width="180"
        src={RedstoneLogo}
        onClick={() => navigate('/')}
      />
      {location.pathname !== '/' && (
        <div className="cursor-pointer text-gray-400" onClick={() => navigate('/')}>
          Back
        </div>
      )}
    </nav>
  )
};

export default Header;
