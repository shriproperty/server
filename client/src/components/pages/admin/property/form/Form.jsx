import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BPrimary, BUpload } from '../../../../util/button/Button';

import './form.scss';
import postFile from '../../../../../api/postFile';

const Form = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [specialPrice, setSpecialPrice] = useState('');
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
	const [images, setImages] = useState([]);
	const [videos, setVideos] = useState('');
	const [documents, setDocuments] = useState('');
	const [otherFeatures, setOtherFeatures] = useState([]);

	const body = new FormData();

	// submit handler
	const submitHandler = e => {
		e.preventDefault();

		// append data to body to send
		body.append('title', title);
		body.append('description', description);
		body.append('price', price);
		body.append('specialPrice', specialPrice);
		body.append('type', type);
		body.append('catagory', catagory);
		body.append('status', status);
		body.append('size', size);
		body.append('unit', unit);
		body.append('bedroom', bedroom);
		body.append('bathroom', bathroom);
		body.append('parking', parking);
		body.append('kitchen', kitchen);
		body.append('address', address);
		body.append('featured', featured);
		body.append('otherFeatures', otherFeatures);

		// append image to body in array
		for (let img in images) {
			body.append('images', images[img]);
		}

		// append video to body
		for (let video in videos) {
			body.append('videos', videos[video]);
		}

		// append documents to body
		for (let doc in documents) {
			body.append('documents', documents[doc]);
		}

		// post to server
		postFile('/propertys/add', body).then(data => {
			console.log(data);
		});
	};

	return (
		<section>
			<form onSubmit={submitHandler} className="admin-property-form">
				<TextField
					className="admin-property-form__input"
					varient="outlined"
					label="Title"
					fullWidth
					required
					onChange={e => setTitle(e.target.value)}
				/>

				<TextField
					className="admin-property-form__input"
					varient="outlined"
					label="Description"
					fullWidth
					required
					multiline
					onChange={e => setDescription(e.target.value)}
				/>

				<TextField
					className="admin-property-form__input"
					varient="outlined"
					label="Price"
					type="number"
					fullWidth
					required
					onChange={e => setPrice(e.target.value)}
				/>

				<TextField
					className="admin-property-form__input"
					varient="outlined"
					label="Special Price"
					type="number"
					fullWidth
					required
					onChange={e => setSpecialPrice(e.target.value)}
				/>

				<TextField
					className="admin-property-form__input"
					varient="outlined"
					label="Size"
					type="number"
					fullWidth
					required
					onChange={e => setSize(e.target.value)}
				/>

				<TextField
					className="admin-property-form__input"
					varient="outlined"
					label="Bedrooms"
					type="number"
					fullWidth
					onChange={e => setBedroom(e.target.value)}
				/>

				<TextField
					className="admin-property-form__input"
					varient="outlined"
					label="Bathroom"
					type="number"
					fullWidth
					onChange={e => setBathroom(e.target.value)}
				/>

				<TextField
					className="admin-property-form__input"
					varient="outlined"
					label="Kitchen"
					type="number"
					fullWidth
					onChange={e => setKitchen(e.target.value)}
				/>

				<TextField
					className="admin-property-form__input"
					varient="outlined"
					label="Parking"
					type="number"
					fullWidth
					onChange={e => setParking(e.target.value)}
				/>

				<TextField
					className="admin-property-form__input"
					varient="outlined"
					label="Address"
					required
					fullWidth
					onChange={e => setAddress(e.target.value)}
				/>

				<TextField
					className="admin-property-form__input"
					varient="outlined"
					label="Other Features"
					helperText="Separate with enter"
					fullWidth
					multiline
					required
					onChange={e => setOtherFeatures(e.target.value.split('\n'))}
				/>

				<FormControl className="admin-property-form__select">
					<InputLabel>Type</InputLabel>
					<Select
						label="Type"
						value={type}
						onChange={e => setType(e.target.value)}
						required
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
						required
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
					<InputLabel>Unit</InputLabel>
					<Select
						label="Unit"
						value={unit}
						onChange={e => setUnit(e.target.value)}
					>
						{/* WARNING: Add more units here */}
						<MenuItem value={'sq'}>sq</MenuItem>
						<MenuItem value={'marla'}>marla</MenuItem>
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
					onChange={e => setImages(e.target.files)}
					accept="image/*"
				/>

				<BUpload
					title="Videos"
					className="admin-property-form__upload-btn"
					onChange={e => setVideos(e.target.files)}
					accept="video/*"
				/>

				<BUpload
					title="Documents"
					className="admin-property-form__upload-btn"
					onChange={e => setDocuments(e.target.files)}
					accept="application/pdf"
				/>

				<br />

				<BPrimary
					title="Submit"
					className="admin-property-form__submit-btn"
					type="submit"
				/>
			</form>
		</section>
	);
};

export default Form;
