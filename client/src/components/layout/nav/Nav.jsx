import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from '@mui/icons-material/Search';

import './nav.scss';
import { BPrimary } from '../../util/button/Button';

const Nav = () => {
	const navigate = useNavigate();

	const [search, setSearch] = useState('');

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
				<ul className="nav__btns">
					<BPrimary title="Add Listings" />
				</ul>
			</nav>
		</header>
	);
};

export default Nav;
