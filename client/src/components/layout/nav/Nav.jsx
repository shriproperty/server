import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './nav.scss';
import { BPrimary } from '../../util/button/Button';

const Nav = () => {
	return (
		<header>
			<nav className="nav">
				<div className="nav__logo">
					<img src="/images/logo/logo.png" alt="Logo" />
				</div>
				<ul className="nav__list">
					<li>
						<Link to="/">Home</Link>
					</li>

					<li>
						<Link to="/properties">Properties</Link>
					</li>

					<li>
						<Link to="/contact-us">Contact Us</Link>
					</li>

					<li>
						<input type="text" placeholder="Search" />
						<SearchIcon />
					</li>
				</ul>
				<ul className="nav__btns">
					<AccountCircleIcon />
					<BPrimary title="Add Listings" />
				</ul>
			</nav>
		</header>
	);
};

export default Nav;
