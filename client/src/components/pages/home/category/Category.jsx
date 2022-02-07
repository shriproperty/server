import { Link } from 'react-router-dom';
import { BPrimary } from '../../../util/button/Button';
import { HPrimary, SPrimary } from '../../../util/typography/Typography';
import './category.scss';

const Category = () => {
	return (
		<section className="category-section">
			<div className="category-section__headings">
				<HPrimary title="The most attractive deals" />

				<SPrimary
					title="Highlight the best of your properties by using the List
					Category shortcode. You can list categories, types, cities,
					areas and states."
				/>
			</div>
			<div className="category-grid">
				<div className="category-grid__child  category-grid__child--1">
					<h2 className="category-grid__child-heading">Apartments</h2>
					<Link to="/">
						<BPrimary
							title="2 Listings"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--2">
					<h2 className="category-grid__child-heading">Apartments</h2>
					<Link to="/">
						<BPrimary
							title="2 Listings"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--3">
					<h2 className="category-grid__child-heading">Apartments</h2>
					<Link to="/">
						<BPrimary
							title="2 Listings"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--4">
					<h2 className="category-grid__child-heading">Apartments</h2>
					<Link to="/">
						<BPrimary
							title="2 Listings"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--5">
					<h2 className="category-grid__child-heading">Apartments</h2>
					<Link to="/">
						<BPrimary
							title="2 Listings"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--6">
					<h2 className="category-grid__child-heading">Apartments</h2>
					<Link to="/">
						<BPrimary
							title="2 Listings"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--7">
					<h2 className="category-grid__child-heading">Apartments</h2>
					<Link to="/">
						<BPrimary
							title="2 Listings"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--8">
					<h2 className="category-grid__child-heading">Apartments</h2>
					<Link to="/">
						<BPrimary
							title="2 Listings"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Category;
