import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getRequest from '../../../../api/get';
import deleteRequest from '../../../../api/delete';
import { BPrimary } from '../../../util/button/Button';
import { AError, ASuccess } from '../../../util/alert/Alert';
import Modal from '../../../util/modal/Modal';
import Loader from '../../../util/loader/Loader';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
} from '@mui/material';

const Listings = ({ submit, setSubmit }) => {
	const [response, setResponse] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [propertyLoading, setPropertyLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [openError, setOpenError] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [openSuccess, setOpenSuccess] = useState(false);

	useEffect(() => {
		getRequest('/add-listing/all').then(data => {
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
		<section>
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
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</section>
	);
};

export default Listings;
