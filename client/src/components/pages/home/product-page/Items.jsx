import React from 'react';
import './Items.scss';
import { Link } from 'react-router-dom';

import {BPrimary} from '../../../util/button/Button'

import HotelIcon from '@mui/icons-material/Hotel';
import ShowerIcon from '@mui/icons-material/Shower';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import MapIcon from '@mui/icons-material/Map';

const Items = () => {
	return (
		<section>
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
				<div href="#" className="Items__list">
					{/* Image */}
					<div className="Items__list-image"></div>
					{/* Mains */}
					<div className="Items__list-title">Chugh's Villa</div>
					<div className="Items__list-price">$2000 / Month</div>
					<div className="Items__list-addr">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Ad, assumenda dolores maiores doloremque quos
						error at quia iusto totam neque recusandae ut vel nisi
						repellat.
					</div>
					{/* IconsBar */}
					<div className="Items__list-iconbar">
						<div className="Items__list-iconbar-icon">
							<HotelIcon />
							<h4>2</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<ShowerIcon />
							<h4>2</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<CarRepairIcon />
							<h4>1</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<MapIcon />
							<h4>2000 sq</h4>
						</div>
					</div>
					<div className="horizontal-line"></div>
					{/* About */}
					<div className="Items__list-about">
						<div className="Items__list-about-image"></div>
						<div className="Items__list-about-title">
							Arpit Chugh
						</div>
					</div>
				</div>
				<div href="#" className="Items__list">
					{/* Image */}
					<div className="Items__list-image"></div>
					{/* Mains */}
					<div className="Items__list-title">Chugh's Villa</div>
					<div className="Items__list-price">$2000 / Month</div>
					<div className="Items__list-addr">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Ad, assumenda dolores maiores doloremque quos
						error at quia iusto totam neque recusandae ut vel nisi
						repellat.
					</div>
					{/* IconsBar */}
					<div className="Items__list-iconbar">
						<div className="Items__list-iconbar-icon">
							<HotelIcon />
							<h4>2</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<ShowerIcon />
							<h4>2</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<CarRepairIcon />
							<h4>1</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<MapIcon />
							<h4>2000 sq</h4>
						</div>
					</div>
					<div className="horizontal-line"></div>
					{/* About */}
					<div className="Items__list-about">
						<div className="Items__list-about-image"></div>
						<div className="Items__list-about-title">
							Arpit Chugh
						</div>
					</div>
				</div>
				<div href="#" className="Items__list">
					{/* Image */}
					<div className="Items__list-image"></div>
					{/* Mains */}
					<div className="Items__list-title">Chugh's Villa</div>
					<div className="Items__list-price">$2000 / Month</div>
					<div className="Items__list-addr">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Ad, assumenda dolores maiores doloremque quos
						error at quia iusto totam neque recusandae ut vel nisi
						repellat.
					</div>
					{/* IconsBar */}
					<div className="Items__list-iconbar">
						<div className="Items__list-iconbar-icon">
							<HotelIcon />
							<h4>2</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<ShowerIcon />
							<h4>2</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<CarRepairIcon />
							<h4>1</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<MapIcon />
							<h4>2000 sq</h4>
						</div>
					</div>
					<div className="horizontal-line"></div>
					{/* About */}
					<div className="Items__list-about">
						<div className="Items__list-about-image"></div>
						<div className="Items__list-about-title">
							Arpit Chugh
						</div>
					</div>
				</div>
				<div href="#" className="Items__list">
					{/* Image */}
					<div className="Items__list-image"></div>
					{/* Mains */}
					<div className="Items__list-title">Chugh's Villa</div>
					<div className="Items__list-price">$2000 / Month</div>
					<div className="Items__list-addr">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Ad, assumenda dolores maiores doloremque quos
						error at quia iusto totam neque recusandae ut vel nisi
						repellat.
					</div>
					{/* IconsBar */}
					<div className="Items__list-iconbar">
						<div className="Items__list-iconbar-icon">
							<HotelIcon />
							<h4>2</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<ShowerIcon />
							<h4>2</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<CarRepairIcon />
							<h4>1</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<MapIcon />
							<h4>2000 sq</h4>
						</div>
					</div>
					<div className="horizontal-line"></div>
					{/* About */}
					<div className="Items__list-about">
						<div className="Items__list-about-image"></div>
						<div className="Items__list-about-title">
							Arpit Chugh
						</div>
					</div>
				</div>
				<div href="#" className="Items__list">
					{/* Image */}
					<div className="Items__list-image"></div>
					{/* Mains */}
					<div className="Items__list-title">Chugh's Villa</div>
					<div className="Items__list-price">$2000 / Month</div>
					<div className="Items__list-addr">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Ad, assumenda dolores maiores doloremque quos
						error at quia iusto totam neque recusandae ut vel nisi
						repellat.
					</div>
					{/* IconsBar */}
					<div className="Items__list-iconbar">
						<div className="Items__list-iconbar-icon">
							<HotelIcon />
							<h4>2</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<ShowerIcon />
							<h4>2</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<CarRepairIcon />
							<h4>1</h4>
						</div>
						<div className="Items__list-iconbar-icon">
							<MapIcon />
							<h4>2000 sq</h4>
						</div>
					</div>
					<div className="horizontal-line"></div>
					{/* About */}
					<div className="Items__list-about">
						<div className="Items__list-about-image"></div>
						<div className="Items__list-about-title">
							Arpit Chugh
						</div>
					</div>
				</div>
			</div>
			{/* More Listing Button */}

			<Link to="#" className="Items__btn">
				<BPrimary title="More Listings" className="Items__btn-listing"  type="submit" />
			</Link>
		</section>
	);
};

export default Items;
