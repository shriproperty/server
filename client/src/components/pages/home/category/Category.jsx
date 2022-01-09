import React from 'react';
import { Link } from 'react-router-dom';
import { BPrimary } from '../../../util/button/Button';
import './Category.scss';

const Category = () => {
	return (
		<section className="category">
			<div className="container">
				<h1 className="category__main">The most attractive deals</h1>
				<h3 className="category__sub">
					Highlight the best of your properties by using the List
					Category shortcode. You can list categories, types, cities,
					areas and states.
				</h3>
			</div>
			<div className="category__items">
				<Link to="/" className="list-1">
					<div className="category__items-img">
						<h2 className="category__items-head">Apartments</h2>
						<BPrimary
							title="2 Listings"
							className="category__items-btn"
							type="submit"
						/>
					</div>
				</Link>
				<Link to="/" className="list-2">
					<div className="category__items-img">
						<h2 className="category__items-head">Condos</h2>
						<BPrimary
							title="6 Listings"
							className="category__items-btn"
							type="submit"
						/>
					</div>
				</Link>
				<Link to="/" className="list-3">
					<div className="category__items-img">
						<h2 className="category__items-head">Kothi</h2>
						<BPrimary
							title="10 Listings"
							className="category__items-btn"
							type="submit"
						/>
					</div>
				</Link>
				<Link to="/" className="list-4">
					<div className="category__items-img">
						<h2 className="category__items-head">Land</h2>
						<BPrimary
							title="6 Listings"
							className="category__items-btn"
							type="submit"
						/>
					</div>
				</Link>
				<Link to="/" className="list-5">
					<div className="category__items-img">
						<h2 className="category__items-head">Buildings</h2>
						<BPrimary
							title="3 Listings"
							className="category__items-btn"
							type="submit"
						/>
					</div>
				</Link>
				<Link to="/" className="list-6">
					<div className="category__items-img">
						<h2 className="category__items-head">Flats</h2>
						<BPrimary
							title="1 Listings"
							className="category__items-btn"
							type="submit"
						/>
					</div>
				</Link>
			</div>
		</section>
	);
};

export default Category;
