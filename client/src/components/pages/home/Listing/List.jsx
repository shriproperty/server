import React from 'react';
import './List.scss';

import { Link } from 'react-router-dom';
import { BPrimary } from '../../../util/button/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const List = () => {
	return (
		<section className="list-container">
			{/* Text continer */}
			<div className="list">
				<h1 className="list__head">
					Sell Your Property Quickly Through Us.
				</h1>
				<div className="list__elemContainer">
					<div className="list__points">
						<CheckCircleIcon />
						<h3>Submit Your Property</h3>
					</div>
					<div className="list__points">
						<CheckCircleIcon />
						<h3>Get Listing Published</h3>
					</div>
					<div className="list__points">
						<CheckCircleIcon />
						<h3>Start Receiving Offers</h3>
					</div>
				</div>
				<div className="list-btn">
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
			<div className="image">
				<img src="/images/background/selling.jpg" alt="selling" />
			</div>
		</section>
	);
};

export default List;
