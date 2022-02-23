import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BPrimary, BUpload } from '../../../../util/button/Button';
import { ASuccess, AError } from '../../../../util/alert/Alert';

import './form.scss';
import { postFile } from '../../../../../api/post';

const Form = () => {
	const [property, setProperty] = useState({
		title: '',
		description: '',
		price: '',
		specialPrice: '',
		type: '',
		category: '',
		status: '',
		size: '',
		unit: '',
		bedroom: 0,
		bathroom: 0,
		openParking: 0,
		closeParking: 0,
		livingRoom: 0,
		dinningRoom: 0,
		store: 0,
		poojaRoom: 0,
		balcony: 0,
		floor: '',
		direction: '',
		kitchen: 0,
		lobby: 0,
		address: '',
		featured: false,
		owner: '',
		ownerContact: '',
	});
	const [otherFeatures, setOtherFeatures] = useState([]);
	const [images, setImages] = useState([]);
	const [videos, setVideos] = useState([]);
	const [documents, setDocuments] = useState([]);

	const [loading, setLoading] = useState(false);
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const body = new FormData();

	// submit handler
	const submitHandler = e => {
		e.preventDefault();
		setLoading(true);

		// append data to body to send
		for (const key in property) {
			body.append(key, property[key]);
		}

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

		// append other Features to body
		for (let feature in otherFeatures) {
			body.append('otherFeatures', otherFeatures[feature]);
		}

		// post to server
		postFile('/properties/add', body).then(data => {
			setLoading(false);

			if (data.success) {
				setOpenSuccess(true);
				setSuccessMessage(data.message);
			} else {
				setOpenError(true);
				setErrorMessage(data.message);
			}
		});
	};

	return (
		<section>
			<form onSubmit={submitHandler} className="admin-property-form">
				<ASuccess
					title={successMessage}
					open={openSuccess}
					setOpen={setOpenSuccess}
				/>

				<AError
					title={errorMessage}
					open={openError}
					setOpen={setOpenError}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Title"
					fullWidth
					required
					onChange={e =>
						setProperty({ ...property, title: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Description"
					fullWidth
					required
					multiline
					onChange={e =>
						setProperty({
							...property,
							description: e.target.value,
						})
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Address"
					required
					fullWidth
					onChange={e =>
						setProperty({ ...property, address: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Owner"
					required
					fullWidth
					onChange={e =>
						setProperty({ ...property, owner: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Owner Contact"
					required
					fullWidth
					onChange={e =>
						setProperty({
							...property,
							ownerContact: e.target.value,
						})
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Other Features"
					helperText="Separate with enter"
					fullWidth
					multiline
					onChange={e => setOtherFeatures(e.target.value.split('\n'))}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Price"
					type="number"
					required
					onChange={e =>
						setProperty({ ...property, price: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Special Price"
					type="number"
					onChange={e =>
						setProperty({
							...property,
							specialPrice: e.target.value,
						})
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Size"
					type="number"
					required
					onChange={e =>
						setProperty({ ...property, size: e.target.value })
					}
				/>

				<FormControl className="admin-property-form__select">
					<InputLabel>Unit</InputLabel>
					<Select
						label="Unit"
						value={property.unit}
						onChange={e =>
							setProperty({ ...property, unit: e.target.value })
						}
					>
						<MenuItem value={'Sq. Ft'}>Sq. Ft</MenuItem>
						<MenuItem value={'Acre'}>Acre</MenuItem>
						<MenuItem value={'Gaj'}>Gaj</MenuItem>
						<MenuItem value={'Marla'}>Marla</MenuItem>
						<MenuItem value={'Bigha'}>Bigha</MenuItem>
						<MenuItem value={'Bigha-Pucca'}>Bigha-Pucca</MenuItem>
						<MenuItem value={'Bigha-Kachha'}>Bigha-Kachha</MenuItem>
						<MenuItem value={'Bigha-Kachha'}>Bigha-Kachha</MenuItem>
						<MenuItem value={'Biswa'}>Biswa</MenuItem>
						<MenuItem value={'Biswa'}>Biswa</MenuItem>
						<MenuItem value={'Biswa–Pucca'}>Biswa–Pucca</MenuItem>
						<MenuItem value={'Kanal'}>Kanal</MenuItem>
						<MenuItem value={'Killa'}>Killa</MenuItem>
						<MenuItem value={'Kattha'}>Kattha</MenuItem>
						<MenuItem value={'Ghumaon'}>Ghumaon</MenuItem>
					</Select>
				</FormControl>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Floor"
					onChange={e =>
						setProperty({ ...property, floor: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Bedrooms"
					type="number"
					onChange={e =>
						setProperty({ ...property, bedroom: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Bathroom"
					type="number"
					onChange={e =>
						setProperty({ ...property, bathroom: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Living Room"
					type="number"
					onChange={e =>
						setProperty({ ...property, livingRoom: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Lobby"
					type="number"
					onChange={e =>
						setProperty({ ...property, lobby: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Kitchen"
					type="number"
					onChange={e =>
						setProperty({ ...property, kitchen: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Dinning Room"
					type="number"
					onChange={e =>
						setProperty({
							...property,
							dinningRoom: e.target.value,
						})
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Store Room"
					type="number"
					onChange={e =>
						setProperty({ ...property, store: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Pooja Room"
					type="number"
					onChange={e =>
						setProperty({ ...property, poojaRoom: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Open Parking"
					type="number"
					onChange={e =>
						setProperty({
							...property,
							openParking: e.target.value,
						})
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Covered Parking"
					type="number"
					onChange={e =>
						setProperty({
							...property,
							closeParking: e.target.value,
						})
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Balcony"
					type="number"
					onChange={e =>
						setProperty({ ...property, balcony: e.target.value })
					}
				/>

				<br />

				<FormControl className="admin-property-form__select">
					<InputLabel>Type</InputLabel>
					<Select
						label="Type"
						value={property.type}
						onChange={e =>
							setProperty({ ...property, type: e.target.value })
						}
						required
					>
						<MenuItem value="Rental">Rental</MenuItem>
						<MenuItem value="Sale">Sale</MenuItem>
					</Select>
				</FormControl>

				<FormControl className="admin-property-form__select">
					<InputLabel>category</InputLabel>
					<Select
						label="category"
						value={property.category}
						onChange={e =>
							setProperty({
								...property,
								category: e.target.value,
							})
						}
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

						<MenuItem value="Commercial Office">
							Commercial Plot
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
						value={property.status}
						onChange={e =>
							setProperty({ ...property, status: e.target.value })
						}
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
						value={property.featured}
						onChange={e =>
							setProperty({
								...property,
								featured: e.target.value,
							})
						}
					>
						<MenuItem value={true}>True</MenuItem>
						<MenuItem value={false}>False</MenuItem>
					</Select>
				</FormControl>

				<FormControl className="admin-property-form__select">
					<InputLabel>Direction</InputLabel>
					<Select
						label="Direction"
						value={property.direction}
						onChange={e =>
							setProperty({
								...property,
								direction: e.target.value,
							})
						}
					>
						<MenuItem value="North">North</MenuItem>
						<MenuItem value="South">South</MenuItem>
						<MenuItem value="East">East</MenuItem>
						<MenuItem value="West">West</MenuItem>
						<MenuItem value="North-East">North-East</MenuItem>
						<MenuItem value="North-West">North-West</MenuItem>
						<MenuItem value="South-East">South-East</MenuItem>
						<MenuItem value="South-West">South-West</MenuItem>
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
					loading={loading}
				/>
			</form>
		</section>
	);
};

export default Form;
