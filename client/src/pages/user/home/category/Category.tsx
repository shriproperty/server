import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BPrimary } from '../../../../components/util/button/Button';
import { HPrimary } from '../../../../components/util/typography/Typography';
import './category.scss';

const Category: FC = () => {
	return (
		<section className="category-section">
			<div className="category-section__headings">
				<HPrimary title="Choose from following catagories" />
			</div>

			<div className="category-grid">
				<div className="category-grid__child  category-grid__child--apartment">
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

				<div className="category-grid__child  category-grid__child--villa">
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
				<div className="category-grid__child  category-grid__child--plot">
					<h2 className="category-grid__child-heading">
						Commercial Plot
					</h2>
					<Link to="/properties?s=Commercial Plot">
						<BPrimary
							title="Explore"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--plot">
					<h2 className="category-grid__child-heading">Plots</h2>
					<Link to="/properties?s=Plots">
						<BPrimary
							title="Explore"
							className="category-grid__child-btn"
							type="submit"
						/>
					</Link>
				</div>

				<div className="category-grid__child  category-grid__child--office">
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

				<div className="category-grid__child  category-grid__child--serviced-apartment">
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

				<div className="category-grid__child  category-grid__child--studio-apartment">
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

				<div className="category-grid__child  category-grid__child--floor">
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

				<div className="category-grid__child  category-grid__child--others">
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
