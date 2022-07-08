import { Link } from 'react-router-dom';
import { BPrimary } from '../../../../components/util/button/Button';
import { HPrimary } from '../../../../components/util/typography/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import './listing.scss';
import { FC } from 'react';

const Listing: FC = () => {
	return (
		<section className="listing-section">
			{/* Text container */}
			<div className="listing-content">
				<HPrimary
					className="listing-content__head"
					title="Sell Your Property, Quickly Through Us."
				/>
				<div className="listing-content__points">
					<div className="listing-content__point">
						<CheckCircleIcon />
						<h3>Submit Your Property</h3>
					</div>
					<div className="listing-content__point">
						<CheckCircleIcon />
						<h3>Get Listing Published For Free</h3>
					</div>
					<div className="listing-content__point">
						<CheckCircleIcon />
						<h3>Start Receiving Offers</h3>
					</div>
				</div>
				<div className="listing-content__btn">
					<Link to="/listing">
						<BPrimary
							title="Submit your listing"
							className="btn"
							type="submit"
						/>
					</Link>
				</div>
			</div>
			{/* Image */}
			<div className="listing-section__image">
				<img src="/images/background/selling.webp" alt="selling" />
			</div>
		</section>
	);
};

export default Listing;
