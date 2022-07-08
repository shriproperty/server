import { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';

import { BPrimary } from '../../../../components/util/button/Button';
import {
	HPrimary,
	HSecondary,
	SSecondary,
} from '../../../../components/util/typography/Typography';
import get from '../../../../api/get';

import HotelIcon from '@mui/icons-material/Hotel';
import ShowerIcon from '@mui/icons-material/Shower';
import MapIcon from '@mui/icons-material/Map';

import './properties.scss';
import Loader from '../../../../components/util/loader/Loader';

const Properties: FC = () => {
	const [response, setResponse] = useState<Property[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		get('/properties/all?featured=true').then((data: any) => {
			setResponse(data.data);
			setLoading(false);
		});
	}, []);

	return (
		<section className="properties-section">
			<div className="properties-section__headings">
				<HPrimary title="Affordable Homes in Chandigarh" />
			</div>
			{/* Properties */}
			{loading ? (
				<Loader fullWidth />
			) : (
				<div className="properties-section__properties">
					{response.map(property => (
						<Link
							to={`/properties/${property._id}`}
							key={property._id}
						>
							<div className="properties-section__property">
								{/* Image */}
								<div className="image-container">
									<div className="properties-section__property-image">
										<img
											src={property.images[0]?.url}
											alt="property"
										/>
										<div className="properties-section__property-type">
											{property.type}
										</div>
									</div>
								</div>

								{/* Mains */}
								<HSecondary
									title={property.title}
									className="properties-section__property-title"
								/>

								<h4 className="properties-section__property-price">
									₹ {property.price}
									<span className="price-text">
										Click here for best price
									</span>
								</h4>

								<SSecondary
									title={property.description}
									className="properties-section__property-description"
								/>

								{/* IconsBar */}
								<div className="properties-section__property-iconbar">
									<div className="properties-section__property-iconbar-icon">
										<HotelIcon />
										<h4>{property.bedroom}</h4>
									</div>
									<div className="properties-section__property-iconbar-icon">
										<ShowerIcon />
										<h4>{property.bathroom}</h4>
									</div>

									<div className="properties-section__property-iconbar-icon">
										<MapIcon />
										<h4>
											{property.size} {property.unit}
										</h4>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
			{/* More Listing Button */}

			<div className="properties-section__btn">
				<Link to="/properties">
					<BPrimary title="More Listings" />
				</Link>
			</div>
		</section>
	);
};

export default Properties;
