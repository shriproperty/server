import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './form.scss';

const Form = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [type, setType] = useState('');
	const [catagory, setCatagory] = useState('');
	const [status, setStatus] = useState('');
	const [size, setSize] = useState('');
	const [unit, setUnit] = useState('');
	const [bedroom, setBedroom] = useState(1);
	const [bathroom, setBathroom] = useState(1);
	const [parking, setParking] = useState(1);
	const [kitchen, setKitchen] = useState(1);
	const [address, setAddress] = useState('');

	//TODO: Impliment other feathers array logic

	return (
		<section className="admin-property-form">
			<TextField
				className="admin-property-form__input"
				varient="outlined"
				label="Title"
				fullWidth
				onChange={e => setTitle(e.target.value)}
			/>

			<TextField
				className="admin-property-form__input"
				varient="outlined"
				label="Description"
				fullWidth
				multiline
				onChange={e => setDescription(e.target.value)}
			/>

			<TextField
				className="admin-property-form__input"
				varient="outlined"
				label="Price"
				fullWidth
				onChange={e => setPrice(e.target.value)}
			/>

			<TextField
				className="admin-property-form__input"
				varient="outlined"
				label="Size"
				fullWidth
				onChange={e => setSize(e.target.value)}
			/>

			<TextField
				className="admin-property-form__input"
				varient="outlined"
				label="Bedrooms"
				fullWidth
				onChange={e => setBedroom(e.target.value)}
			/>

			<TextField
				className="admin-property-form__input"
				varient="outlined"
				label="Bathroom"
				fullWidth
				onChange={e => setBathroom(e.target.value)}
			/>

			<TextField
				className="admin-property-form__input"
				varient="outlined"
				label="Kitchen"
				fullWidth
				onChange={e => setKitchen(e.target.value)}
			/>

			<TextField
				className="admin-property-form__input"
				varient="outlined"
				label="Parking"
				fullWidth
				onChange={e => setParking(e.target.value)}
			/>

			<TextField
				className="admin-property-form__input"
				varient="outlined"
				label="Address"
				fullWidth
				onChange={e => setAddress(e.target.value)}
			/>

			<FormControl className="admin-property-form__select">
				<InputLabel>Type</InputLabel>
				<Select
					label="Type"
					value={type}
					onChange={e => setType(e.target.value)}
				>
					<MenuItem value={'Rental'}>Rental</MenuItem>
					<MenuItem value={'Sale'}>Sale</MenuItem>
				</Select>
			</FormControl>
		</section>
	);
};

export default Form;
