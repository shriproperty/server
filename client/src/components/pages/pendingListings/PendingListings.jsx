/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BPrimary } from '../../util/button/Button';
import { AWarning } from '../../util/alert/Alert';
import Loader from '../../util/loader/Loader';
import EditIcon from '@mui/icons-material/Edit';
import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
} from '@mui/material';
import get from '../../../api/get';
import './pendingListing.scss';

const PendingListings = ({ user }) => {
	const navigate = useNavigate();

	const [response, setResponse] = useState('');
	const [propertyLoading, setPropertyLoading] = useState(true);

	useEffect(() => {
		if (user && !user.isLoggedIn) {
			navigate('/login');
		}

		get(`/users/single/${user.data._id}?listings=true`).then(data => {
			setResponse(data.data);
			setPropertyLoading(false);
		});
	}, []);

	return (
		<main>
			<Helmet>
				<title>Pending Listings | Shri Property</title>
				<link
					rel="canonical"
					href="https://shriproperty.com/account/pending-listings"
				/>
				<meta
					name="description"
					content="See All your properties which are not approved yet"
				/>
			</Helmet>

			{propertyLoading ? (
				<Loader fullScreen />
			) : response.listings.length > 0 ? (
				<Table className="admin-page__table">
					<TableHead>
						<TableRow>
							<TableCell className="contact-table__cell">
								Title
							</TableCell>

							<TableCell className="contact-table__cell">
								Address
							</TableCell>
							<TableCell className="contact-table__cell">
								Locality
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
						{response.listings.map(item => (
							<TableRow key={item._id}>
								<TableCell className="contact-table__cell">
									{item.title}
								</TableCell>

								<TableCell className="contact-table__cell table_address">
									{item.location && (
										<a
											href={item.location}
											target="_blank"
											rel="noreferrer"
										>
											<img
												src="/images/location.png"
												alt="location"
												className="pendingListing-location"
											/>
										</a>
									)}
									{item.address || '---'}
								</TableCell>

								<TableCell className="contact-table__cell">
									{item.locality || '---'}
								</TableCell>

								<TableCell className="contact-table__cell">
									{item.price}
								</TableCell>

								<TableCell className="contact-table__cell">
									{item.specialPrice}
								</TableCell>

								<TableCell className="contact-table__cell">
									<Link
										to={`/account/pending-listings/${item._id}`}
									>
										<BPrimary title={<EditIcon />} />
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<AWarning title="No Pending Listings" open={true} />
			)}
		</main>
	);
};

export default PendingListings;
