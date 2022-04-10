import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { HSecondary, SSecondary } from '../../util/typography/Typography';
import get from '../../../api/get';
import Loader from '../../util/loader/Loader';
import NotFound from '../notFound/NotFound';

import HotelIcon from '@mui/icons-material/Hotel';
import ShowerIcon from '@mui/icons-material/Shower';
import MapIcon from '@mui/icons-material/Map';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import { BPrimary } from '../../util/button/Button';
import '../home/properties/properties.scss';

const Properties = () => {
	const [searchParams] = useSearchParams();

	const searchQuery =
		// this will check if search query is present only than convert it to lower case
		searchParams.get('s') && searchParams.get('s').toLowerCase();

	const [response, setResponse] = useState([]);
	const [loading, setLoading] = useState(true);
	const [notFound, setNotFound] = useState(false);
	const [filters, setFilters] = useState({
		type: '',
		category: '',
		featured: '',
	});
	useEffect(() => {
		setLoading(true);
		get('/properties/all').then(data => {
			// search functionality
			if (searchQuery) {
				const filteredData = data.data.filter(
					property =>
						property.title.toLowerCase().includes(searchQuery) ||
						property.description
							.toLowerCase()
							.includes(searchQuery) ||
						property.address.toLowerCase().includes(searchQuery) ||
						property.type.toLowerCase().includes(searchQuery) ||
						property.category.toLowerCase().includes(searchQuery) ||
						property.status.toLowerCase().includes(searchQuery) ||
						property.price.includes(searchQuery) ||
						property.specialPrice.includes(searchQuery) ||
						property.size.includes(searchQuery)
				);
				// redirect to 404 page if no data found
				if (filteredData.length === 0) setNotFound(true);
				else setResponse(filteredData);
			} else {
				setResponse(data.data);
			}
			setLoading(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	return (
		<>
			<Helmet>
				<title>Properties | Shri Property</title>
				<link
					rel="canonical"
					href="https://shriproperty.com/properties"
				/>
				<meta
					name="description"
					content="Check out all type of properties/real-estate at reasonable rates"
				/>
			</Helmet>

			{loading ? (
				<Loader fullScreen />
			) : (
				<section className="properties-section">
					{notFound ? (
						<NotFound comingSoon />
					) : (
						<>
							{' '}
							<div className="properties-filter">
								<div className="filter-container">
									<FormControl className="admin-property-form__select">
										<InputLabel>Featured</InputLabel>
										<Select
											required
											label="Type"
											value={filters.featured}
											onChange={e =>
												setFilters({
													...filters,
													featured: e.target.value,
												})
											}
										>
											<MenuItem value="true">
												True
											</MenuItem>
											<MenuItem value="false">
												False
											</MenuItem>
										</Select>
									</FormControl>

									<BPrimary
										title={<ClearIcon />}
										onClick={() =>
											setFilters({
												...filters,
												featured: '',
											})
										}
									/>
								</div>

								<div className="filter-container">
									<FormControl className="admin-property-form__select">
										<InputLabel>Type</InputLabel>
										<Select
											required
											label="Type"
											value={filters.type}
											onChange={e =>
												setFilters({
													...filters,
													type: e.target.value,
												})
											}
										>
											<MenuItem value="Rental">
												Rental
											</MenuItem>
											<MenuItem value="Sale">
												Sale
											</MenuItem>
											<MenuItem value="PG">PG</MenuItem>
										</Select>
									</FormControl>

									<BPrimary
										title={<ClearIcon />}
										onClick={() =>
											setFilters({ ...filters, type: '' })
										}
									/>
								</div>

								<div className="filter-container">
									<FormControl className="admin-property-form__select">
										<InputLabel>category</InputLabel>
										<Select
											required
											label="category"
											value={filters.category}
											onChange={e =>
												setFilters({
													...filters,
													category: e.target.value,
												})
											}
										>
											<MenuItem value="Residential Apartment">
												Residential Apartment
											</MenuItem>

											<MenuItem value="Independent House/Villa">
												Independent House/Villa
											</MenuItem>

											<MenuItem value="Plot">
												Plot
											</MenuItem>

											<MenuItem value="Commercial Office">
												Commercial Office
											</MenuItem>

											<MenuItem value="Commercial Office">
												Commercial Plot
											</MenuItem>

											<MenuItem value="Serviced Apartments">
												Serviced Apartments
											</MenuItem>

											<MenuItem value="1 RK/ Studio Apartment">
												1 RK/ Studio Apartment
											</MenuItem>

											<MenuItem value="Independent/Builder Floor">
												Independent/Builder Floor
											</MenuItem>

											<MenuItem value="Other">
												Other
											</MenuItem>
										</Select>
									</FormControl>

									<BPrimary
										title={<ClearIcon />}
										onClick={() =>
											setFilters({
												...filters,
												category: '',
											})
										}
									/>
								</div>
							</div>
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
														src={
															property.images[0]
																?.url
														}
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
												₹ {property.price}{' '}
												<span className="price-text">
													Click here for best price
												</span>
											</h4>

											<SSecondary
												title={property.description}
												className="properties-section__property-description"
												maxLength={10}
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
														{property.size}{' '}
														{property.unit}
													</h4>
												</div>
											</div>
										</div>
									</Link>
								))}
							</div>
						</>
					)}
				</section>
			)}
		</>
	);
};

export default Properties;
