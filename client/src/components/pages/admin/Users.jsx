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

import { AError } from '../../util/Alert';
import get from '../../../api/get';
import patch from '../../../api/patch';
import { TextField } from '@mui/material';

const Users = () => {
	const [response, setResponse] = useState([]);
	const [callingStatus, setCallingStatus] = useState('');
	const [callAgainDate, setCallAgainDate] = useState('');
	const [talkProgress, setTalkProgress] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [openError, setOpenError] = useState(false);

    console.log(talkProgress);
	useEffect(() => {
		get('/users/get-all').then(data => {
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

			patch(`/users/update-calling-status/${id}`, {
				callingStatus,
				// set data to null if there is no date
				callAgainDate: callAgainDate ? new Date(callAgainDate) : null,
				talkProgress,
			}).then(data => {
				if (data.success === false) {
					setErrorMessage(data.message);
					setOpenError(true);
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
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Name</TableCell>
						<TableCell align="center">Email</TableCell>
						<TableCell align="center">Phone</TableCell>
						<TableCell align="center">Calling Status</TableCell>
						<TableCell align="center">Call Again Date</TableCell>
						<TableCell align="center">Update Call Status</TableCell>
						<TableCell align="center">
							Update Call Again Date
						</TableCell>
						<TableCell align="center">Talk Progress</TableCell>
						<TableCell align="center">Update</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{response.map(user => (
						<TableRow key={user._id}>
							<TableCell align="center">{user.name}</TableCell>
							<TableCell align="center">{user.email}</TableCell>
							<TableCell align="center">{user.phone}</TableCell>
							<TableCell align="center">
								{user.callingStatus}
							</TableCell>
							<TableCell align="center">
								{/* format date */}
								{user.callAgainDate
									? moment(user.callAgainDate).format(
											'DD/MM/YYYY'
									  )
									: '----'}
							</TableCell>
							<TableCell align="center">
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

							<TableCell align="center">
								<input
									type="date"
									onChange={e =>
										setCallAgainDate(e.target.value)
									}
								/>
							</TableCell>
							<TableCell align="center">
								<TextField
									multiline
									label="Kya Baat Hai"
									value={user.talkProgress}
									onChange={e =>
										setTalkProgress(e.target.value)
									}
								/>
							</TableCell>
							<TableCell align="center">
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
