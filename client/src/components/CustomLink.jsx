import { Link, useMatch } from 'react-router-dom';
import Header from "./header";

const CustomLink = ({ children, to, ...props }) => {
	const match = useMatch(to);

	return (
		<Link
			to={to}
			style={{
				color: match ? '#63BDFF' : '#fff'
			}}
			{...props}
		>
			{children}
		</Link>
	);
};

export default CustomLink