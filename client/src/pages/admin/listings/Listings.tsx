import { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import getRequest from '../../../api/get';
import Loader from '../../../components/util/loader/Loader';

import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import '../admin.scss';
const Listings: FC = () => {
	const [response, setResponse] = useState<Listing[]>([]);
	const [propertyLoading, setPropertyLoading] = useState(true);

	useEffect(() => {
		getRequest('/listings/all').then(data => {
			setResponse(data.data);
			setPropertyLoading(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section>
			<Helmet>
				<meta name="robots" content="noindex" />
			</Helmet>

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
								Type
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
								<TableCell className="contact-table__cell">
									<Link
										to={`${process.env.REACT_APP_ADMIN_ROUTE}/listings/${item._id}`}
									>
										{item.title}
									</Link>
								</TableCell>

								<TableCell className="contact-table__cell">
									{item.type}
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
												className="admin-page_location"
											/>
										</a>
									)}
									{item.address}
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
