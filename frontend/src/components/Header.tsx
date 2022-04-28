import { useNavigate } from 'react-router-dom';
import RedstoneLogo from '../public/redstone-logo.svg';

const Header = () => {
	const navigate = useNavigate();

	return (
		<nav className="flex items-center p-3">
			<img
				className="cursor-pointer"
				width="180"
				src={RedstoneLogo}
				onClick={() => navigate('/')}
			/>
		</nav>
	)
};

export default Header;
