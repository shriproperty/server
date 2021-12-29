import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import get from '../../../api/get';

const Users = () => {
	const [response, setResponse] = useState([]);

	useEffect(() => {
		get('/users/get-all').then(data => {
			setResponse(data.data);
		});
	}, []);

	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell align="left">Id</TableCell>
					<TableCell align="right">Name</TableCell>
					<TableCell align="right">Email</TableCell>
					<TableCell align="right">Phone</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{response.map(user => (
					<TableRow key={user._id}>
						<TableCell>{user._id}</TableCell>
						<TableCell align="right">{user.name}</TableCell>
						<TableCell align="right">{user.email}</TableCell>
						<TableCell align="right">{user.phone}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default Users;
