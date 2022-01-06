import React, { useState, useEffect } from 'react';
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

import { AError } from '../../../util/Alert';
import getRequest from '../../../../api/get';
import patchRequest from '../../../../api/patch';
import { TextField } from '@mui/material';

import './users.scss';

const Users = () => {
	const [response, setResponse] = useState([]);
	const [callingStatus, setCallingStatus] = useState('');
	const [callAgainDate, setCallAgainDate] = useState('');
	const [talkProgress, setTalkProgress] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [openError, setOpenError] = useState(false);

	useEffect(() => {
		getRequest('/users/all').then(data => {
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
	}, []);

	const submitHandler = id => {
		return e => {
			e.preventDefault();

			patchRequest(`/users/update-calling-status/${id}`, {
				callingStatus,
				talkProgress,
				// set data to null if there is no date
				callAgainDate: callAgainDate ? new Date(callAgainDate) : null,
			}).then(data => {
				if (data.success === false) {
					setErrorMessage(data.message);
					return setOpenError(true);
				}

				window.location.reload();
			});
		};
	};
	return (
		<>
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
								<form onSubmit={submitHandler(user._id)}>
									<button type="submit">
										<DoneIcon />
									</button>
								</form>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default Users;
