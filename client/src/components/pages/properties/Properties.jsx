import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { HSecondary, SSecondary } from '../../util/typography/Typography';
import get from '../../../api/get';
import Loader from '../../util/loader/Loader';

import HotelIcon from '@mui/icons-material/Hotel';
import ShowerIcon from '@mui/icons-material/Shower';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import MapIcon from '@mui/icons-material/Map';

import '../home/properties/properties.scss';

const Properties = () => {
	const [response, setResponse] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		get('/properties/all').then(data => {
			setResponse(data.data);
			setLoading(false);
		});
	}, []);

	return (
		<section className="properties-section">
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
								<div className="properties-section__property-image">
									<img
										src={property.images[0].url}
										alt="property"
									/>
								</div>

								{/* Mains */}
								<HSecondary
									title={property.title}
									className="properties-section__property-title"
								/>

								<h4 className="properties-section__property-price">
									₹ {property.price}
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
										<CarRepairIcon />
										<h4>{property.parking}</h4>
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
		</section>
	);
};

export default Properties;
