/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import get from '../../../api/get';
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
import './account.scss';

const Account = ({ isLoggedIn }) => {
	const navigate = useNavigate();
	const [response, setResponse] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [propertyLoading, setPropertyLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [openError, setOpenError] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [openSuccess, setOpenSuccess] = useState(false);

	useEffect(() => {
		get('/users/decode').then(res => {
			get(
				`/users/single/${res.data.id}?listings=false&properties=true`
			).then(data => {
				setResponse(data.data.properties);
				setPropertyLoading(false);
			});
		});
	}, []);

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
			});
		};
	};
	return (
		<section>
			<h1 className="main-heading">MyAccount</h1>
			<div className="buttons">
				<Link to="/account/edit"><BPrimary title = 'Hello'/></Link>
			</div>
			<h1 className='listing-heading'>Approved Listing</h1>
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
				<Loader fullScreen />
			) : (
				<Table className="admin-page__table">
					<TableHead>
						<TableRow>
							<TableCell className="contact-table__cell">
								Title
							</TableCell>

							<TableCell className="contact-table__cell">
								Location
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

								<TableCell className="contact-table__cell ">
									{item.address}
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

								{/* <TableCell className="contact-table__cell">
									<BPrimary
										title={<DeleteIcon />}
										onClick={() => setOpenModal(true)}
									/>
								</TableCell>

								<TableCell className="contact-table__cell">
									<Link
										to={`/thisissomethingrandomwhichnoonecanthinkabout/property/update/${item._id}`}
									>
										<BPrimary
											title={<EditIcon />}
											onClick={() => setOpenModal(true)}
										/>
									</Link>
								</TableCell> */}
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</section>
	);
};

export default Account;
