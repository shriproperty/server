import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BPrimary } from '../../../components/util/button/Button';
import get from '../../../api/get';
import './property.scss';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StraightenIcon from '@mui/icons-material/Straighten';

const Property = () => {
	const [response, setResponse] = useState([]);

	useEffect(() => {
		get('/properties/all').then(data => {
			setResponse(data.data);
			console.log(data.data);
		});
	}, []);
	return (
		<section>
			<div className="image-list">
				<img
					src="/images/background/hero.png"
					alt="property"
					className="image-1"
				/>

				<h2 className="pos">Resale</h2>
				<h2 className="pos left">Full Furnished</h2>
				<div className="flex">
					<img
						src="/images/background/hero.png"
						alt="property"
						className="image-2"
					/>
					<img
						src="/images/background/hero.png"
						alt="property"
						className="image-3"
					/>
				</div>
			</div>
			<div>
				<div className="heading-section">
					<div className="heading-section_sub">
						<h1>PropertiesName</h1>
						<h2 className="heading-section_addr">
							sector 70, near community centre road
						</h2>
					</div>
					<Link to="/properties" className="heading-section_link">
						<BPrimary title="Request a Call" type="submit" />
					</Link>
				</div>
				<h1 className="pricing-section_heading">Pricing and Size</h1>
				<div className="pricing-section">
					<div className="pricing-section_item space">
						<div className="sell-icon">
							<LocalOfferIcon />
						</div>
                        <h3 className='price'>80,000</h3>
                        <h3 className='special-price'>50,000</h3>
					</div>
					<div className="pricing-section_item">
						<div className="sell-icon">
							<StraightenIcon />
						</div>
						<h3>2200-23600</h3>
					</div>
				</div>
				<h1 className="facilities-section_heading">Facilities</h1>
				<div className="facilities-section">
					<div className="facilities-section_item">
						<h3>BedRooms</h3> <h3>4</h3>
					</div>
					<div className="facilities-section_item">
						<h3>Bathroom</h3> <h3>2</h3>
					</div>
					<div className="facilities-section_item">
						<h3>Kitchen</h3> <h3>1</h3>
					</div>
					<div className="facilities-section_item">
						<h3>Parking</h3> <h3>2</h3>
					</div>
				</div>
				<div className="description-section">
					<h1>About</h1>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Ipsum pariatur omnis libero? Fuga culpa saepe
						quibusdam, corporis nobis atque excepturi voluptas
						dolore laudantium possimus? Explicabo tenetur, maxime
						maiores tempora optio sunt similique nisi distinctio eos
						repudiandae repellendus. Iure nemo cum dolore vel
						similique dolor hic quam porro nesciunt corrupti? Atque
						quasi voluptas recusandae at reiciendis! Rerum tempora
						iure commodi? Eos beatae consequuntur enim cumque
						ratione quis debitis, esse repellendus deleniti quaerat
						sit nesciunt recusandae eligendi omnis ullam porro ipsa
						dolorum.
					</p>
				</div>

				<Link to="#" className="link">
					Download
				</Link>
			</div>
		</section>
	);
};

export default Property;
