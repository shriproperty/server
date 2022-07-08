import { useState, useEffect, FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import getRequest from '../../api/get';
import deleteRequest from '../../api/delete';
import { BPrimary } from '../../components/util/button/Button';
import { HPrimary, SSecondary } from '../../components/util/typography/Typography';
import { AError, ASuccess } from '../../components/util/alert/Alert';
import Modal from '../../components/util/modal/Modal';
import Loader from '../../components/util/loader/Loader';
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
	TextField,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './admin.scss';
import { Helmet } from 'react-helmet-async';

const AdminPage: FC = () => {
	const [response, setResponse] = useState<ApiResponse>({});
	const [openModal, setOpenModal] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [propertyLoading, setPropertyLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [openError, setOpenError] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [openSuccess, setOpenSuccess] = useState(false);
	const [sliderValue, setSliderValue] = useState(0);
	const [submit, setSubmit] = useState(false);

	const [filters, setFilters] = useState<Filters>({});

	useEffect(() => {
		setPropertyLoading(true);
		// get request with filters
		getRequest(
			`/properties/all?${filters.type && `type=${filters.type}`}${
				filters.category && `&category=${filters.category}`
			}${filters.featured && `&featured=${filters.featured}`}${
				filters.price && `&price=0,${filters.price}`
			}${filters.title && `&title=${filters.title}`}`
		).then(data => {
			setResponse(data);
			setPropertyLoading(false);
			setSubmit(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, filters]);

	const deleteHandler = (id: string) => {
		return (e: FormEvent) => {
			e.preventDefault();
			setDeleteLoading(true);

			deleteRequest(`/properties/delete/${id}`).then((data: any) => {
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

			<TextField
				label="Search"
				variant="outlined"
				onKeyUp={(e: any) =>
					e.key === 'Enter' &&
					setFilters({ ...filters, title: e.target.value })
				}
			/>

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

			<SSecondary title="Filters" className="admin-page__sub-heading" />

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
						onClick={() => setFilters({ ...filters, featured: '' })}
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
						onClick={() => setFilters({ ...filters, type: '' })}
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
						onClick={() => setFilters({ ...filters, category: '' })}
					/>
				</div>

				{response.maxPrice && (
					<Box sx={{ width: 900 }} className="filter-container">
						<h1>Price</h1>
						<Slider
							defaultValue={parseInt(response.maxPrice)}
							step={500000}
							valueLabelDisplay="auto"
							marks
							min={parseInt(response.minPrice)}
							max={parseInt(response.maxPrice)}
							onChange={(e: any) =>
								setSliderValue(e.target.value)
							}
							onChangeCommitted={e =>
								setFilters({
									...filters,
									price: +sliderValue,
								})
							}
						/>
					</Box>
				)}
			</div>

			{propertyLoading ? (
				<Loader fullWidth />
			) : (
				<>
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
							{response.data.map((item: Property) => (
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

									<TableCell
										className={`contact-table__cell ${
											item.location && 'table_address'
										}`}
									>
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
