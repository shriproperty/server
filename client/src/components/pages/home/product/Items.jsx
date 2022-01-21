import React, { useState, useEffect } from 'react';
import './Items.scss';
import { Link } from 'react-router-dom';

import { BPrimary } from '../../../util/button/Button';
import get from '../../../../api/get';

import HotelIcon from '@mui/icons-material/Hotel';
import ShowerIcon from '@mui/icons-material/Shower';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import MapIcon from '@mui/icons-material/Map';

const Items = () => {
	const [response, setResponse] = useState([]);

	useEffect(() => {
		get('/properties/all?featured=true').then(data => {
			setResponse(data.data);
		});
	}, []);

	return (
		<section className="items">
			<div className="Items__content">
				<h1 className="Items__content-main">
					Afforadable Homes in Chandigarh
				</h1>
				<h3 className="Items__content-sub">
					Showcase properties in homepage to be visible and
					accessible. Select the most wanted categories or cities to
					be displayed in the lists.
				</h3>
			</div>
			{/* ITEMS LIST */}
			<div className="Items">
				{response.map(property => (
					<div className="Items__list" key={property._id}>
						{/* Image */}
						<div className="Items__list-image">
							<img src={property.images[0]} alt="property" />
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
			{/* More Listing Button */}

			<Link to="#" className="Items__btn">
				<BPrimary
					title="More Listings"
					className="Items__btn-listing"
					type="submit"
				/>
			</Link>
		</section>
	);
};

export default Items;
