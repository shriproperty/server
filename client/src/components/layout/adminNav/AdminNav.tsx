import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BPrimary } from '../../util/button/Button';

import './adminNav.scss';

const AdminNav: FC = () => {
	return (
		<nav className="admin-nav">
			<Link to={`${process.env.REACT_APP_ADMIN_ROUTE}/`}>
				<BPrimary title="Home" className="admin-page__button" />
			</Link>

			<Link to={`${process.env.REACT_APP_ADMIN_ROUTE}/users`}>
				<BPrimary title="Users" className="admin-page__button" />
			</Link>

			<Link to={`${process.env.REACT_APP_ADMIN_ROUTE}/temp-users`}>
				<BPrimary
					title="Temporary Users"
					className="admin-page__button"
				/>
			</Link>

			<Link to={`${process.env.REACT_APP_ADMIN_ROUTE}/contacts`}>
				<BPrimary title="Contacts" className="admin-page__button" />
			</Link>

			<Link to={`${process.env.REACT_APP_ADMIN_ROUTE}/listings`}>
				<BPrimary title="Listings" className="admin-page__button" />
			</Link>

			<Link to={`${process.env.REACT_APP_ADMIN_ROUTE}/property/add`}>
				<BPrimary title="Add Property" className="admin-page__button" />
			</Link>
		</nav>
	);
};

export default AdminNav;
