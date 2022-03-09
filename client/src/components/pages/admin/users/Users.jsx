import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import getRequest from '../../../../api/get';
import Loader from '../../../util/loader/Loader';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';

const Users = () => {
	const [response, setResponse] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getRequest('/users/all').then(data => {
			setResponse(data.data);
			setLoading(false);
		});
	}, []);

	return (
		<main>
			<Helmet>
				<meta name="robots" content="noindex" />
			</Helmet>

			{loading ? (
				<Loader fullScreen />
			) : (
				<Table className="user-table">
					<TableHead>
						<TableRow>
							<TableCell
								className="user-table__cell"
								align="right"
							>
								Name
							</TableCell>
							<TableCell
								className="user-table__cell"
								align="right"
							>
								Email
							</TableCell>
							<TableCell
								className="user-table__cell"
								align="right"
							>
								Phone
							</TableCell>
							<TableCell
								className="user-table__cell"
								align="right"
							>
								Date
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
									<Link
										to={`${process.env.REACT_APP_ADMIN_ROUTE}/users/${user._id}`}
									>
										{user.name}
									</Link>
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
								<TableCell
									className="user-table__cell"
									align="right"
								>
									{moment(new Date(user.createdAt)).format(
										'DD/MM/YY'
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</main>
	);
};

export default Users;
