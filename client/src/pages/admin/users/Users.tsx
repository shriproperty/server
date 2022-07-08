import { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import getRequest from '../../../api/get';
import Loader from '../../../components/util/loader/Loader';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';

interface User {
	_id: string;
	name: string;
	email: string;
	phone: string;
	createdAt: string;
}

const Users: FC = () => {
	const [response, setResponse] = useState<User[]>([]);
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
				<Table className="contact-table">
					<TableHead>
						<TableRow>
							<TableCell
								className="contact-table__cell"
								align="right"
							>
								Name
							</TableCell>
							<TableCell
								className="contact-table__cell"
								align="right"
							>
								Email
							</TableCell>
							<TableCell
								className="contact-table__cell"
								align="right"
							>
								Phone
							</TableCell>
							<TableCell
								className="contact-table__cell"
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
									className="contact-table__cell"
									align="right"
								>
									<Link
										to={`${process.env.REACT_APP_ADMIN_ROUTE}/users/${user._id}`}
									>
										{user.name}
									</Link>
								</TableCell>
								<TableCell
									className="contact-table__cell"
									align="right"
								>
									{user.email}
								</TableCell>
								<TableCell
									className="contact-table__cell"
									align="right"
								>
									{user.phone}
								</TableCell>
								<TableCell
									className="contact-table__cell"
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
