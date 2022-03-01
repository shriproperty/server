import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getRequest from '../../../../api/get';
import Loader from '../../../util/loader/Loader';

import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
} from '@mui/material';

const Listings = ({ submit, setSubmit }) => {
	const [response, setResponse] = useState([]);
	const [propertyLoading, setPropertyLoading] = useState(true);

	useEffect(() => {
		getRequest('/listings/all').then(data => {
			setResponse(data.data);
			setPropertyLoading(false);
			setSubmit(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit]);

	return (
		<section>
			{/* Alert */}

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
										to={`/thisissomethingrandomwhichnoonecanthinkabout/listings/${item._id}`}
									>
										{item.title}
									</Link>
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
