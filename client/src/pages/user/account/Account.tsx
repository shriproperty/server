/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, FC, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import get from '../../../api/get';
import { Link, useNavigate } from 'react-router-dom';
import { BPrimary } from '../../../components/util/button/Button';
import { HPrimary } from '../../../components/util/typography/Typography';
import { AWarning } from '../../../components/util/alert/Alert';
import EditIcon from '@mui/icons-material/Edit';
import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
} from '@mui/material';
import {
	UserContext,
	AuthFormSubmitContext,
} from '../../../helpers/Context';
import './account.scss';

const Account: FC = () => {
	const navigate = useNavigate();
	const user = useContext(UserContext) as LoggedInUser;
	const { setAuthFormSubmit } = useContext(AuthFormSubmitContext);
	const [openWarning, setOpenWarning] = useState(false);

	useEffect(() => {
		if (user.loaded && !user.isLoggedIn) {
			return navigate('/login');
		}

		if (user.isLoggedIn === true && user.data.properties.length <= 0)
			setOpenWarning(true);
	}, []);

	const logoutHandler = () => {
		get('/auth/logout').then(() => {
			setAuthFormSubmit(true);
			navigate('/');
		});
	};

	return (
		<main>
			<Helmet>
				<title>Account | Shri Property</title>
				<link rel="canonical" href="https://shriproperty.com/account" />
				<meta
					name="description"
					content="Check your approved and pending properties that you have added in Shri Property"
				/>
			</Helmet>

			<HPrimary title="My Account" className="main-heading" />

			<div className="account-page__buttons">
				<Link to="/account/pending-listings">
					<BPrimary title="Pending listings" />
				</Link>

				<BPrimary title="Logout" onClick={logoutHandler} />
			</div>
			<h1 className="listing-heading">Approved Listing</h1>

			{user.isLoggedIn && user.data.properties.length > 0 ? (
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
						{user.data.properties.map(item => (
							<TableRow key={item._id}>
								<TableCell className="contact-table__cell">
									{item.title}
								</TableCell>

								<TableCell
									className={`contact-table__cell ${
										item.location && 'table_address'
									}`}
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
												className="account-page__location"
											/>
										</a>
									)}
									{item.address}
								</TableCell>

								<TableCell className="contact-table__cell ">
									{item.locality}
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
			) : (
				<AWarning
					title="No Approved Properties"
					open={openWarning}
					setOpen={setOpenWarning}
				/>
			)}
		</main>
	);
};

export default Account;
