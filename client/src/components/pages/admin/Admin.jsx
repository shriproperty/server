import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getRequest from '../../../api/get';
import deleteRequest from '../../../api/delete';
import { BPrimary } from '../../util/button/Button';
import { HPrimary } from '../../util/typography/Typography';
import Modal from '../../util/modal/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
} from '@mui/material';

import './admin.scss';

const AdminPage = () => {
	const [response, setResponse] = useState([]);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		getRequest('/properties/all').then(data => {
			setResponse(data.data);
		});
	}, []);

	const deleteHandler = id => {
		return e => {
			e.preventDefault();

			deleteRequest(`/properties/delete/${id}`).then(data => {
				console.log(data);
			});
		};
	};

	return (
		<section className="admin-page">
			<HPrimary title="Admin Page" className="admin-page__heading" />

			<Link to="/admin/contacts">
				<BPrimary title="Contacts" className="admin-page__button" />
			</Link>

			<Link to="/admin/property">
				<BPrimary title="Add Property" className="admin-page__button" />
			</Link>

			<HPrimary title="All Properties" className="admin-page__heading" />

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
							Delete
						</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{response.map(item => (
						<TableRow key={item._id}>
							<Modal
								open={openModal}
								onClose={() => setOpenModal(false)}
								className="admin-page__modal"
							>
								<BPrimary
									title="confirm"
									onClick={deleteHandler(item._id)}
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
								<BPrimary
									type="submit"
									title={<DeleteIcon />}
									onClick={() => setOpenModal(true)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
};

export default AdminPage;
