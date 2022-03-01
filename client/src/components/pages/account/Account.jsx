/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import get from '../../../api/get';
import { Link } from 'react-router-dom';
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

const Account = () => {
	const [response, setResponse] = useState([]);
	const [propertyLoading, setPropertyLoading] = useState(true);

	useEffect(() => {
		get('/users/decode').then(res => {
			get(
				`/users/single/${res.data.id}?listings=false&properties=true`
			).then(data => {
				setResponse(data.data.properties);
				setPropertyLoading(false);
			});
		});
	}, []);

	return (
		<section>
			<HPrimary title="My Account" className="main-heading" />

			<div className="buttons">
				<Link to="/account/edit">
					<BPrimary title="Hello" />
				</Link>
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
						{response.map(item => (
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
		</section>
	);
};

export default Account;
