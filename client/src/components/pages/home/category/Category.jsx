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
					<h2 className="category-grid__child-heading">
						Residential Apartment
					</h2>
					<Link to="/properties?s=Residential Apartment ">
						<BPrimary
							title="Explore"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--2">
					<h2 className="category-grid__child-heading">
						Independent House/Villa
					</h2>
					<Link to="/properties?s=Independent House/Villa">
						<BPrimary
							title="Explore"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--3">
					<h2 className="category-grid__child-heading">Plots</h2>
					<Link to="/properteis?s=Plots">
						<BPrimary
							title="Explore"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--4">
					<h2 className="category-grid__child-heading">
						Commercial Office
					</h2>
					<Link to="/properties?s=Commercial Office">
						<BPrimary
							title="Explore"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--5">
					<h2 className="category-grid__child-heading">
						Serviced Apartments
					</h2>
					<Link to="/properties?s=Serviced Apartments">
						<BPrimary
							title="Explore"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--6">
					<h2 className="category-grid__child-heading">
						1 RK/ Studio Apartment
					</h2>
					<Link to="/properties?s=1 RK/ Studio Apartment">
						<BPrimary
							title="Explore"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--7">
					<h2 className="category-grid__child-heading">
						Independent/Builder Floor
					</h2>
					<Link to="/properties?s=Independent/Builder Floor">
						<BPrimary
							title="Explore"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--8">
					<h2 className="category-grid__child-heading">Other</h2>
					<Link to="/properties?s=Other">
						<BPrimary
							title="Explore"
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
