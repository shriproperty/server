import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getRequest from '../../../api/get';
import deleteRequest from '../../../api/delete';
import { BPrimary } from '../../util/button/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const AdminPage = () => {
	const [response, setResponse] = React.useState([]);

	useEffect(() => {
		getRequest('/properties/all').then(data => {
			setResponse(data.data);
			console.log(data.data);
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
		<div>
			<h1 style={{ padding: '5rem' }}>Admin Page</h1>
			<Link to="/admin/Contacts">
				<BPrimary title="Contacts" style={{ margin: '5rem' }} />
			</Link>
			<Link to="/admin/Property">
				<BPrimary title="Property" />
			</Link>
			<h1 style={{ padding: '2rem 5rem' }}>All Properties</h1>

			<Table style={{ margin: '0 2rem' }}>
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
				{response.map(item => (
					<TableBody>
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
							<form onSubmit={deleteHandler(item._id)}>
								<button type="submit"> Delete</button>
							</form>
						</TableCell>
					</TableBody>
				))}
				;
			</Table>
		</div>
	);
};

export default AdminPage;
