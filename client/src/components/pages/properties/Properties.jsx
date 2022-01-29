import React, { useState, useEffect } from 'react';

import {
	HPrimary,
	HSecondary,
	SPrimary,
	SSecondary,
} from '../../util/typography/Typography';
import get from '../../../api/get';

import HotelIcon from '@mui/icons-material/Hotel';
import ShowerIcon from '@mui/icons-material/Shower';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import MapIcon from '@mui/icons-material/Map';

import '../home/properties/properties.scss';

const Properties = () => {
	const [response, setResponse] = useState([]);

	useEffect(() => {
		get('/properties/all').then(data => {
			setResponse(data.data);
		});
	}, []);

	return (
		<section className="properties-section">
			<div className="properties-section__headings">
				<HPrimary title="Afforadable Homes in Chandigarh" />

				<SPrimary
					title="Showcase properties in homepage to be visible and
					accessible. Select the most wanted categories or cities to
					be displayed in the lists."
				/>
			</div>
			{/* Properties */}
			<div className="properties-section__properties">
				{response.map(property => (
					<div
						className="properties-section__property"
						key={property._id}
					>
						{/* Image */}
						<div className="properties-section__property-image">
							<img src={property.images[0].url} alt="property" />
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
				))}
			</div>
			
		</section>
	);
};

export default Properties;