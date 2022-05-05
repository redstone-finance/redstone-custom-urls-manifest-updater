import { useNavigate } from 'react-router-dom';
import RedstoneLogo from '../assets/redstone-logo.svg';

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center align-center gap-16 p-3">
      <img
        className="cursor-pointer"
        width="180"
        src={RedstoneLogo}
        onClick={() => navigate('/')}
      />
      <div className="cursor-pointer text-gray-400" onClick={() => navigate('/')}>
        Back
      </div>
    </nav>
  )
};

export default Header;
