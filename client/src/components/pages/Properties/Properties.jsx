import React, { useState, useEffect } from 'react';

import '../home/product/Items.scss';
import get from '../../../api/get';

import HotelIcon from '@mui/icons-material/Hotel';
import ShowerIcon from '@mui/icons-material/Shower';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import MapIcon from '@mui/icons-material/Map';

const Properties = () => {
	const [response, setResponse] = useState([]);

	useEffect(() => {
		get('/properties/all').then(data => {
			setResponse(data.data);
		});
	}, []);

	return (
		<section className="items" style={{paddingTop: 50 , paddingBottom: 50}}>
			
            <div className="Items" >
				{response.map(property => (
					<div className="Items__list" key={property._id}>
						{/* Image */}
						<div className="Items__list-image">
							<img src={property.images[0].url} alt="property" />
						</div>
						{/* Mains */}
						<div className="Items__list-title">
							{property.title}
						</div>
						<div className="Items__list-price">
							₹ {property.price}
						</div>
						<div className="Items__list-addr">
							{property.description}
						</div>
						{/* IconsBar */}
						<div className="Items__list-iconbar">
							<div className="Items__list-iconbar-icon">
								<HotelIcon />
								<h4>{property.bedroom}</h4>
							</div>
							<div className="Items__list-iconbar-icon">
								<ShowerIcon />
								<h4>{property.bathroom}</h4>
							</div>
							<div className="Items__list-iconbar-icon">
								<CarRepairIcon />
								<h4>{property.parking}</h4>
							</div>
							<div className="Items__list-iconbar-icon">
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
