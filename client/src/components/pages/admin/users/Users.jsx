import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import getRequest from '../../../../api/get';

const Users = () => {
	const [response, setResponse] = useState([]);

	useEffect(() => {
		getRequest('/users/all').then(data => {
			setResponse(data.data);
		});
	}, []);

	return (
		<main>
			<Table className="user-table">
				<TableHead>
					<TableRow>
						<TableCell className="user-table__cell" align="right">
							Name
						</TableCell>
						<TableCell className="user-table__cell" align="right">
							Email
						</TableCell>
						<TableCell className="user-table__cell" align="right">
							Phone
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{response.map(user => (
						<TableRow key={user._id}>
							<TableCell
								className="user-table__cell"
								align="right"
							>
								{user.name}
							</TableCell>
							<TableCell
								className="user-table__cell"
								align="right"
							>
								{user.email}
							</TableCell>
							<TableCell
								className="user-table__cell"
								align="right"
							>
								{user.phone}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</main>
	);
};

export default Users;
