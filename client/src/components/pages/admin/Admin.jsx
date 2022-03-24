import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getRequest from '../../../api/get';
import deleteRequest from '../../../api/delete';
import { BPrimary } from '../../util/button/Button';
import { HPrimary } from '../../util/typography/Typography';
import { AError, ASuccess } from '../../util/alert/Alert';
import Modal from '../../util/modal/Modal';
import Loader from '../../util/loader/Loader';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
} from '@mui/material';

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

	useEffect(() => {
		getRequest('/properties/all').then(data => {
			setResponse(data.data);
			setPropertyLoading(false);
			setSubmit(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit]);

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
				<Table className="admin-page__table">
					<TableHead>
						<TableRow>
							<TableCell className="contact-table__cell">
								Title
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
									{item.locality || 'Chandigarh'} 
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
											onClick={() => setOpenModal(true)}
										/>
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</section>
	);
};

export default AdminPage;
