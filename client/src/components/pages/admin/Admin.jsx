import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getRequest from '../../../api/get';
import deleteRequest from '../../../api/delete';
import { BPrimary } from '../../util/button/Button';
import { HPrimary, SSecondary } from '../../util/typography/Typography';
import { AError, ASuccess } from '../../util/alert/Alert';
import Modal from '../../util/modal/Modal';
import Loader from '../../util/loader/Loader';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './admin.scss';
import { Helmet } from 'react-helmet-async';

const AdminPage = ({ submit, setSubmit }) => {
	const [response, setResponse] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [propertyLoading, setPropertyLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [openError, setOpenError] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [openSuccess, setOpenSuccess] = useState(false);

	const [filters, setFilters] = useState({
		type: '',
		category: '',
		featured: '',
	});
	const marks = [
		{
			value: 10,
			label: '< 10L',
		},
		{
			value: 30,
			label: '10L - 30L',
		},
		{
			value: 60,
			label: '30L - 60L',
		},
		{
			value: 90,
			label: '60L - 90L',
		},
		{
			value: 120,
			label: '90L - 1.2Cr',
		},
		{
			value: 150,
			label: '1.2Cr - 1.5Cr',
		},
		{
			value: 180,
			label: '1.5Cr - 1.8Cr',
		},
		{
			value: 200,
			label: '> 2Cr',
		},
	];

	function valuetext(value) {
		return `${value}`;
	}

	useEffect(() => {
		setPropertyLoading(true);
		// get request with filters
		getRequest(
			`/properties/all?${filters.type && `type=${filters.type}`}&${
				filters.category && `category=${filters.category}`
			}&${filters.featured && `featured=${filters.featured}`}`
		).then(data => {
			setResponse(data.data);
			setPropertyLoading(false);
			setSubmit(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, filters]);

	const deleteHandler = id => {
		return e => {
			e.preventDefault();
			setDeleteLoading(true);

			deleteRequest(`/properties/delete/${id}`).then(data => {
				setDeleteLoading(false);
				setOpenModal(false);

				if (data.success) {
					setSuccessMessage(data.message);
					setOpenSuccess(true);
				} else {
					setErrorMessage(data.message);
					setOpenError(true);
				}

				setSubmit(true);
			});
		};
	};

	return (
		<section className="admin-page">
			<Helmet>
				<meta name="robots" content="noindex" />
			</Helmet>

			<HPrimary title="Admin Page" className="admin-page__heading" />

			<Link to={`${process.env.REACT_APP_ADMIN_ROUTE}/contacts`}>
				<BPrimary title="Contacts" className="admin-page__button" />
			</Link>

			<Link to={`${process.env.REACT_APP_ADMIN_ROUTE}/property/add`}>
				<BPrimary title="Add Property" className="admin-page__button" />
			</Link>

			<Link to={`${process.env.REACT_APP_ADMIN_ROUTE}/temp-users`}>
				<BPrimary title="Temporary" className="admin-page__button" />
			</Link>

			<Link to={`${process.env.REACT_APP_ADMIN_ROUTE}/listings`}>
				<BPrimary title="Listings" className="admin-page__button" />
			</Link>

			<Link to={`${process.env.REACT_APP_ADMIN_ROUTE}/users`}>
				<BPrimary title="Users" className="admin-page__button" />
			</Link>

			<HPrimary title="All Properties" className="admin-page__heading" />

			{/* Alert */}

			<ASuccess
				title={successMessage}
				open={openSuccess}
				setOpen={setOpenSuccess}
				className="admin-page__alert"
			/>

			<AError
				title={errorMessage}
				open={openError}
				setOpen={setOpenError}
				className="admin-page__alert"
			/>

			{propertyLoading ? (
				<Loader fullWidth />
			) : (
				<>
					<SSecondary
						title="Filters"
						className="admin-page__sub-heading"
					/>
					<div className="filters">
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
									<MenuItem value="true">True</MenuItem>
									<MenuItem value="false">False</MenuItem>
								</Select>
							</FormControl>

							<BPrimary
								title={<ClearIcon />}
								onClick={() =>
									setFilters({ ...filters, featured: '' })
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
									<MenuItem value="Rental">Rental</MenuItem>
									<MenuItem value="Sale">Sale</MenuItem>
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

									<MenuItem value="Other">Other</MenuItem>
								</Select>
							</FormControl>

							<BPrimary
								title={<ClearIcon />}
								onClick={() =>
									setFilters({ ...filters, category: '' })
								}
							/>
						</div>
						<div className="filter-container">
							<Box sx={{ width: 900 }}>
								<Slider
									aria-label="Always visible"
									defaultValue={80}
									getAriaValueText={valuetext}
									step={15}
									marks={marks}
									valueLabelDisplay="on"
								/>
							</Box>

							<BPrimary
								title={<ClearIcon />}
								onClick={() =>
									setFilters({ ...filters, category: '' })
								}
							/>
						</div>
					</div>

					<Table className="admin-page__table">
						<TableHead>
							<TableRow>
								<TableCell className="contact-table__cell">
									Title
								</TableCell>

								<TableCell className="contact-table__cell">
									Type
								</TableCell>

								<TableCell className="contact-table__cell">
									Address
								</TableCell>

								<TableCell className="contact-table__cell">
									Locality
								</TableCell>

								<TableCell className="contact-table__cell">
									Price
								</TableCell>

								<TableCell className="contact-table__cell">
									Special Price
								</TableCell>

								<TableCell className="contact-table__cell">
									Owner
								</TableCell>

								<TableCell className="contact-table__cell">
									Owner Contact
								</TableCell>

								<TableCell className="contact-table__cell">
									Delete
								</TableCell>

								<TableCell className="contact-table__cell">
									Update
								</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{response.map(item => (
								<TableRow key={item._id}>
									{/* Modal */}
									<Modal
										open={openModal}
										onClose={() => setOpenModal(false)}
										className="admin-page__modal"
									>
										<BPrimary
											title="confirm"
											onClick={deleteHandler(item._id)}
											loading={deleteLoading}
										/>
									</Modal>

									<TableCell className="contact-table__cell">
										{item.title}
									</TableCell>

									<TableCell className="contact-table__cell">
										{item.type}
									</TableCell>

									<TableCell className="contact-table__cell table_address">
										{item.location && (
											<a
												href={item.location}
												target="_blank"
												rel="noreferrer"
											>
												<img
													src="/images/location.png"
													alt="location"
													className="admin-page_location"
												/>
											</a>
										)}
										{item.address}
									</TableCell>

									<TableCell className="contact-table__cell">
										{item.locality || '---'}
									</TableCell>

									<TableCell className="contact-table__cell">
										{item.price}
									</TableCell>

									<TableCell className="contact-table__cell">
										{item.specialPrice}
									</TableCell>

									<TableCell className="contact-table__cell">
										{item.owner}
									</TableCell>

									<TableCell className="contact-table__cell">
										{item.ownerContact}
									</TableCell>

									<TableCell className="contact-table__cell">
										<BPrimary
											title={<DeleteIcon />}
											onClick={() => setOpenModal(true)}
										/>
									</TableCell>

									<TableCell className="contact-table__cell">
										<Link
											to={`${process.env.REACT_APP_ADMIN_ROUTE}/property/update/${item._id}`}
										>
											<BPrimary
												title={<EditIcon />}
												onClick={() =>
													setOpenModal(true)
												}
											/>
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</>
			)}
		</section>
	);
};

export default AdminPage;
