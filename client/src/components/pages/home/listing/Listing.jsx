
import { Link } from 'react-router-dom';
import { BPrimary } from '../../../util/button/Button';
import { HPrimary } from '../../../util/typography/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import './listing.scss';

const Listing = () => {
	return (
		<section className="listing-section">
			{/* Text continer */}
			<div className="listing-content">
				<HPrimary className='listing-content__head' title="Sell Your Property Quickly Through Us." />
				<div className="listing-content__points">
					<div className="listing-content__point">
						<CheckCircleIcon />
						<h3>Submit Your Property</h3>
					</div>
					<div className="listing-content__point">
						<CheckCircleIcon />
						<h3>Get Listing Published</h3>
					</div>
					<div className="listing-content__point">
						<CheckCircleIcon />
						<h3>Start Receiving Offers</h3>
					</div>
				</div>
				<div className="listing-content__btn">
					<Link to="#">
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
				<img src="/images/background/selling.jpg" alt="selling" />
			</div>
		</section>
	);
};

export default Listing;
