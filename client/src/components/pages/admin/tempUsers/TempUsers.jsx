import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import DoneIcon from '@mui/icons-material/Done';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';

import { AError } from '../../../util/alert/Alert';
import getRequest from '../../../../api/get';
import { patchRequest } from '../../../../api/patch';
import { TextField } from '@mui/material';
import { BPrimary } from '../../../util/button/Button';
import deleteRequest from '../../../../api/delete';

import './tempUsers.scss';
import { Helmet } from 'react-helmet-async';

const TempUsers = () => {
	const [response, setResponse] = useState([]);
	const [callingStatus, setCallingStatus] = useState('');
	const [callAgainDate, setCallAgainDate] = useState('');
	const [talkProgress, setTalkProgress] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [openError, setOpenError] = useState(false);
	const [submit, setSubmit] = useState(false);

	useEffect(() => {
		setSubmit(false);
		getRequest('/temp-users/all').then(data => {
			// sort data.data by date
			data.data.sort((a, b) => {
				return new Date(a.callAgainDate) - new Date(b.callAgainDate);
			});

			// sort data.data by status
			data.data.sort((a, b) =>
				a.callingStatus > b.callingStatus
					? 1
					: b.callingStatus > a.callingStatus
					? -1
					: 0
			);

			setResponse(data.data);
		});
	}, [submit]);

	const updateHandler = id => {
		return e => {
			e.preventDefault();

			patchRequest(`/temp-users/update-calling-status/${id}`, {
				callingStatus,
				talkProgress,
				// set data to null if there is no date
				callAgainDate: callAgainDate ? new Date(callAgainDate) : null,
			}).then(data => {
				if (data.success === false) {
					setErrorMessage(data.message);
					return setOpenError(true);
				}

				setSubmit(true);
			});
		};
	};

	const deleteHandler = id => {
		return e => {
			e.preventDefault();

			deleteRequest(`/temp-users/delete/${id}`).then(data => {
				if (data.success === false) {
					setErrorMessage(data.message);
					return setOpenError(true);
				}

				setSubmit(true);
			});
		};
	};

	return (
		<>
			<Helmet>
				<meta name="robots" content="noindex" />
			</Helmet>

			<AError
				title={errorMessage}
				id="alert-error"
				open={openError}
				setOpen={setOpenError}
			/>

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
						<TableCell className="user-table__cell" align="right">
							Date
						</TableCell>
						<TableCell className="user-table__cell" align="right">
							Calling Status
						</TableCell>
						<TableCell className="user-table__cell" align="right">
							Call Again Date
						</TableCell>
						<TableCell className="user-table__cell" align="right">
							Talk Progress
						</TableCell>
						<TableCell className="user-table__cell" align="right">
							Update Call Status
						</TableCell>
						<TableCell className="user-table__cell" align="right">
							Update Call Again Date
						</TableCell>
						<TableCell className="user-table__cell" align="right">
							Update Talk Progress
						</TableCell>
						<TableCell className="user-table__cell" align="right">
							Update
						</TableCell>
						<TableCell className="user-table__cell" align="right">
							Delete
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
							<TableCell
								className="user-table__cell"
								align="right"
							>
								{moment(new Date(user.createdAt)).format(
									'DD/MM/YYYY'
								)}
							</TableCell>
							<TableCell
								className="user-table__cell"
								align="right"
							>
								{user.callingStatus}
							</TableCell>
							<TableCell
								className="user-table__cell"
								align="right"
							>
								{/* format date */}
								{user.callAgainDate
									? moment(user.callAgainDate).format(
											'DD/MM/YYYY'
									  )
									: '----'}
							</TableCell>
							<TableCell
								className="user-table__cell"
								align="right"
								width="20%"
							>
								{user.talkProgress}
							</TableCell>
							<TableCell
								className="user-table__cell"
								align="right"
							>
								<FormControl sx={{ m: 1, minWidth: 80 }}>
									<InputLabel>Update Call Status</InputLabel>
									<Select
										required
										id="demo-simple-select"
										value={callingStatus}
										label="Update Call Status"
										onChange={e =>
											setCallingStatus(e.target.value)
										}
									>
										<MenuItem value="Pending">
											Pending
										</MenuItem>
										<MenuItem value="Done">Done</MenuItem>
										<MenuItem value="Rejected">
											Rejected
										</MenuItem>
										<MenuItem value="Call Again">
											Call Again
										</MenuItem>
									</Select>
								</FormControl>
							</TableCell>

							<TableCell
								align="right"
								className="user-table__cell"
							>
								<input
									type="date"
									onChange={e =>
										setCallAgainDate(e.target.value)
									}
								/>
							</TableCell>
							<TableCell
								className="user-table__cell"
								align="right"
							>
								<TextField
									multiline
									label="Talk Progress"
									value={talkProgress}
									onChange={e =>
										setTalkProgress(e.target.value)
									}
								/>
							</TableCell>

							<TableCell
								className="user-table__cell"
								align="right"
							>
								<form onSubmit={updateHandler(user._id)}>
									<BPrimary
										type="submit"
										title={<DoneIcon />}
									/>
								</form>
							</TableCell>

							<TableCell
								className="user-table__cell"
								align="right"
							>
								<form onSubmit={deleteHandler(user._id)}>
									<BPrimary
										type="submit"
										title={<DeleteIcon />}
									/>
								</form>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default TempUsers;
