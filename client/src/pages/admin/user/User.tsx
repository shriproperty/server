import { useState, useEffect, FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AError, ASuccess } from '../../../components/util/alert/Alert';
import Modal from '../../../components/util/modal/Modal';
import { BPrimary } from '../../../components/util/button/Button';
import Loader from '../../../components/util/loader/Loader';
import get from '../../../api/get';
import deleteRequest from '../../../api/delete';
import { Helmet } from 'react-helmet-async';

interface UserFromAPI {
	listings: Listing[];
	properties: Property[];
}

const User: FC = () => {
	const { id } = useParams();
	const [response, setResponse] = useState<UserFromAPI>({
		listings: [],
		properties: [],
	});
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [openError, setOpenError] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [openSuccess, setOpenSuccess] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [submit, setSubmit] = useState(false);

	useEffect(() => {
		get(`/users/single/${id}?listings=true&properties=true`).then(res => {
			setResponse(res.data);
			setLoading(false);
			setSubmit(false);
		});
	}, [id, submit]);

	const deleteHandler = (id: string, type: string) => {
		return (e: any) => {
			e.preventDefault();
			setDeleteLoading(true);

			deleteRequest(`/${type}/delete/${id}`)
				.then((data: any) => {
					setDeleteLoading(false);
					setOpenModal(false);

					if (data.success) {
						setSuccessMessage(data.message);
						setOpenSuccess(true);
					} else {
						setErrorMessage(data.message);
						setOpenError(true);
					}
				})
				.finally(() => {
					setSubmit(true);
				});
		};
	};

	return (
		<main>
			<Helmet>
				<meta name="robots" content="noindex" />
			</Helmet>

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

			{loading ? (
				<Loader fullScreen />
			) : (
				<>
					<h1>Listings</h1>

					<Table className="contact-table">
						<TableHead>
							<TableRow>
								<TableCell
									className="contact-table__cell"
									align="right"
								>
									Title
								</TableCell>
								<TableCell
									className="contact-table__cell"
									align="right"
								>
									Address
								</TableCell>
								<TableCell
									className="contact-table__cell"
									align="right"
								>
									Price
								</TableCell>

								<TableCell
									className="contact-table__cell"
									align="right"
								>
									Special Price
								</TableCell>

								<TableCell
									className="contact-table__cell"
									align="right"
								>
									Delete
								</TableCell>

								<TableCell
									className="contact-table__cell"
									align="right"
								>
									Update
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{response.listings.map(listing => (
								<TableRow key={listing._id}>
									<Modal
										open={openModal}
										onClose={() => setOpenModal(false)}
										className="admin-page__modal"
									>
										<BPrimary
											title="confirm"
											onClick={deleteHandler(
												listing._id,
												'listings'
											)}
											loading={deleteLoading}
										/>
									</Modal>

									<TableCell
										className="contact-table__cell"
										align="right"
									>
										<Link
											to={`${process.env.REACT_APP_ADMIN_ROUTE}/listings/${listing._id}`}
										>
											{listing.title}
										</Link>
									</TableCell>
									<TableCell
										className="contact-table__cell"
										align="right"
									>
										{listing.address}
									</TableCell>
									<TableCell
										className="contact-table__cell"
										align="right"
									>
										{listing.price}
									</TableCell>

									<TableCell
										className="contact-table__cell"
										align="right"
									>
										{listing.specialPrice}
									</TableCell>

									<TableCell
										className="contact-table__cell"
										align="right"
									>
										<BPrimary
											title={<DeleteIcon />}
											onClick={() => setOpenModal(true)}
										/>
									</TableCell>

									<TableCell
										className="contact-table__cell"
										align="right"
									>
										<Link
											to={`${process.env.REACT_APP_ADMIN_ROUTE}/listings/${listing._id}`}
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
					<h1>Properties</h1>

					<Table className="contact-table">
						<TableHead>
							<TableRow>
								<TableCell
									className="contact-table__cell"
									align="right"
								>
									Title
								</TableCell>
								<TableCell
									className="contact-table__cell"
									align="right"
								>
									Address
								</TableCell>
								<TableCell
									className="contact-table__cell"
									align="right"
								>
									Price
								</TableCell>

								<TableCell
									className="contact-table__cell"
									align="right"
								>
									Special Price
								</TableCell>

								<TableCell
									className="contact-table__cell"
									align="right"
								>
									Delete
								</TableCell>

								<TableCell
									className="contact-table__cell"
									align="right"
								>
									Update
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{response.properties.map(property => (
								<TableRow key={property._id}>
									<Modal
										open={openModal}
										onClose={() => setOpenModal(false)}
										className="admin-page__modal"
									>
										<BPrimary
											title="confirm"
											onClick={deleteHandler(
												property._id,
												'properties'
											)}
											loading={deleteLoading}
										/>
									</Modal>

									<TableCell
										className="contact-table__cell"
										align="right"
									>
										<Link
											to={`${process.env.REACT_APP_ADMIN_ROUTE}/property/update/${property._id}`}
										>
											{property.title}
										</Link>
									</TableCell>
									<TableCell
										className="contact-table__cell"
										align="right"
									>
										{property.address}
									</TableCell>
									<TableCell
										className="contact-table__cell"
										align="right"
									>
										{property.price}
									</TableCell>

									<TableCell
										className="contact-table__cell"
										align="right"
									>
										{property.specialPrice}
									</TableCell>

									<TableCell
										className="contact-table__cell"
										align="right"
									>
										<BPrimary
											title={<DeleteIcon />}
											onClick={() => setOpenModal(true)}
										/>
									</TableCell>

									<TableCell
										className="contact-table__cell"
										align="right"
									>
										<Link
											to={`${process.env.REACT_APP_ADMIN_ROUTE}/property/update/${property._id}`}
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
		</main>
	);
};

export default User;
