/* eslint-disable react-hooks/exhaustive-deps */
import EditIcon from '@mui/icons-material/Edit';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../helpers/Context';
import { AWarning } from '../../../components/util/alert/Alert';
import { BPrimary } from '../../../components/util/button/Button';
import Loader from '../../../components/util/loader/Loader';
import './pendingListing.scss';

const PendingListings: FC = () => {
	const navigate = useNavigate();
	const user = useContext(UserContext) as LoggedInUser;

	const [propertyLoading, setPropertyLoading] = useState(true);
	const [warningOpen, setWarningOpen] = useState(true);

	useEffect(() => {
		if (user && !user.isLoggedIn) {
			navigate('/login');
		}

		setPropertyLoading(false);
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
			) : user.data.listings.length > 0 ? (
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
						{user.data.listings.map(item => (
							<TableRow key={item._id}>
								<TableCell className="contact-table__cell">
									{item.title}
								</TableCell>

								<TableCell
									className={`contact-table__cell ${
										item.location && 'table_address'
									} `}
								>
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
				<AWarning
					title="No Pending Listings"
					open={warningOpen}
					setOpen={setWarningOpen}
				/>
			)}
		</main>
	);
};

export default PendingListings;
