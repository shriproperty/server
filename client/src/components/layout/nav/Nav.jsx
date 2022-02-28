import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from '@mui/icons-material/Search';
import { Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './nav.scss';
import { BPrimary } from '../../util/button/Button';

const Nav = ({ isLoggedIn }) => {
	const navigate = useNavigate();

	const [search, setSearch] = useState('');
	const [open, setOpen] = useState(false);

	return (
		<header>
			<nav className="nav">
				<div className="nav__logo">
					<Link to="/">
						<img src="/images/logo/logo.png" alt="Logo" />
					</Link>
				</div>

				<ul className="nav__list">
					<li>
						<Link to="/">Home</Link>
					</li>

					<li>
						<Link to="/properties">Properties</Link>
					</li>

					<li>
						<a href="/#form-section">Contact Us</a>
					</li>

					<li className="nav__search">
						<input
							type="text"
							placeholder="Search"
							onChange={e => setSearch(e.target.value)}
							onKeyPress={e =>
								e.key === 'Enter' &&
								navigate(`/properties?s=${search}`)
							}
						/>
						<Link to={`/properties?s=${search}`}>
							<Search />
						</Link>
					</li>
				</ul>

				<div className="nav__btns">
					<Link to={isLoggedIn ? '/account' : '/login'}>
						<AccountCircleIcon />
					</Link>

					<Link to={'/listing'}>
						<BPrimary title="Add Listings" />
					</Link>
				</div>

				<MenuIcon
					onClick={() => setOpen(true)}
					className="nav__hamburger-icon"
				/>

				<Drawer
					anchor="right"
					open={open}
					onClose={() => setOpen(false)}
					className="hamburger"
					variant="temporary"
					transitionDuration={{ enter: 300, exit: 300 }}
				>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>

						<li>
							<Link to="/properties">Properties</Link>
						</li>

						<li>
							<a href="/#form-section">Contact Us</a>
						</li>

						<li>
							<Link to={isLoggedIn ? '/account' : '/login'}>
								My Account
							</Link>
						</li>

						<li>
							<Link to="/listing">Add Listing</Link>
						</li>
					</ul>
				</Drawer>
			</nav>
		</header>
	);
};

export default Nav;
