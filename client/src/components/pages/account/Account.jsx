/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import get from '../../../api/get';
import { Link, useNavigate } from 'react-router-dom';
import { BPrimary } from '../../util/button/Button';
import { HPrimary } from '../../util/typography/Typography';
import Loader from '../../util/loader/Loader';
import EditIcon from '@mui/icons-material/Edit';
import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
} from '@mui/material';
import './account.scss';

const Account = ({ setAuthFormSubmit }) => {
	const navigate = useNavigate();

	const [response, setResponse] = useState([]);
	const [propertyLoading, setPropertyLoading] = useState(true);

	useEffect(() => {
		get('/users/decode')
			.then(res => {
				get(`/users/single/${res.data.id}?properties=true`).then(
					data => {
						setResponse(data.data);
						setPropertyLoading(false);
					}
				);
			})
			.catch(() => {
				navigate('/login');
			});
	}, []);

	const logoutHandler = () => {
		get('/auth/logout').then(() => {
			setAuthFormSubmit(true);
			navigate('/');
		});
	};

	return (
		<main>
			<HPrimary title="My Account" className="main-heading" />

			<div className="account-page__buttons">
				<Link to="/account/pending-listings">
					<BPrimary title="Pending listings" />
				</Link>

				<BPrimary title="Logout" onClick={logoutHandler} />
			</div>
			<h1 className="listing-heading">Approved Listing</h1>

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
								Edit
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{response.properties.map(item => (
							<TableRow key={item._id}>
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
									<Link to={`/property/update/${item._id}`}>
										<BPrimary title={<EditIcon />} />
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</main>
	);
};

export default Account;
