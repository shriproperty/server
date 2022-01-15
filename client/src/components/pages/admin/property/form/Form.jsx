import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BUpload } from '../../../../util/button/Button';

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
	const [featured, setFeatured] = useState(false);
	const [image, setImage] = useState('');
	const [video, setVideo] = useState('');
	const [document, setDocument] = useState('');
	const [otherFeatures, setOtherFeatures] = useState([]);

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

			<TextField
				className="admin-property-form__input"
				varient="outlined"
				label="Other Features"
				fullWidth
				multiline
				onChange={e => setOtherFeatures(e.target.value.split('\n'))}
			/>

			<FormControl className="admin-property-form__select">
				<InputLabel>Type</InputLabel>
				<Select
					label="Type"
					value={type}
					onChange={e => setType(e.target.value)}
				>
					<MenuItem value="Rental">Rental</MenuItem>
					<MenuItem value="Sale">Sale</MenuItem>
				</Select>
			</FormControl>

			<FormControl className="admin-property-form__select">
				<InputLabel>Catagory</InputLabel>
				<Select
					label="Catagory"
					value={catagory}
					onChange={e => setCatagory(e.target.value)}
				>
					<MenuItem value="Residential Apartment">
						Residential Apartment
					</MenuItem>

					<MenuItem value="Independent House/Villa">
						Independent House/Villa
					</MenuItem>

					<MenuItem value="Plot">Plot</MenuItem>

					<MenuItem value="Commercial Office">
						Commercial Office
					</MenuItem>

					<MenuItem value="Serviced Apartments">
						Serviced Apartments
					</MenuItem>

					<MenuItem value="1 RK/ Studio Apartment">
						1 RK/ Studio Apartment
					</MenuItem>

					<MenuItem value="Independent/Builder Floor">
						Independent/Builder Floor
					</MenuItem>

					<MenuItem value="Other">Other</MenuItem>
				</Select>
			</FormControl>

			<FormControl className="admin-property-form__select">
				<InputLabel>Status</InputLabel>
				<Select
					label="Status"
					value={status}
					onChange={e => setStatus(e.target.value)}
				>
					<MenuItem value="Unfurnished">Unfurnished</MenuItem>
					<MenuItem value="Semifurnished">Semifurnished</MenuItem>
					<MenuItem value="Furnished">Furnished</MenuItem>
				</Select>
			</FormControl>

			<FormControl className="admin-property-form__select">
				<InputLabel>Featured</InputLabel>
				<Select
					label="Featured"
					value={featured}
					onChange={e => setFeatured(e.target.value)}
				>
					<MenuItem value={true}>True</MenuItem>
					<MenuItem value={false}>False</MenuItem>
				</Select>
			</FormControl>

			<br />

			<BUpload
				title="Image"
				className="admin-property-form__upload-btn"
				onChange={e => setImage(e.target.files)}
			/>

			<BUpload
				title="Video"
				className="admin-property-form__upload-btn"
				onChange={e => setVideo(e.target.files)}
			/>

			<BUpload
				title="Documents"
				className="admin-property-form__upload-btn"
				onChange={e => setDocument(e.target.files)}
			/>
		</section>
	);
};

export default Form;
