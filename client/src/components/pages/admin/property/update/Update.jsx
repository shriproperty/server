/* eslint-disable array-callback-return */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BPrimary, BUpload } from '../../../../util/button/Button';
import { ASuccess, AError } from '../../../../util/alert/Alert';
import Loader from '../../../../util/loader/Loader';
import DeleteIcon from '@mui/icons-material/Delete';

import { patchFile } from '../../../../../api/patch';
import get from '../../../../../api/get';

//WARNING: Sass is coming from form.scss file in ../form folder

const Update = () => {
	const { id } = useParams();
	const navigate = useNavigate();

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
		commission: 0,
		age: 0,
		possession: '',
		purchaseType: '',
		constructionStatus: '',
	});

	const [images, setImages] = useState([]);
	const [videos, setVideos] = useState([]);
	const [documents, setDocuments] = useState([]);
	const [otherFeatures, setOtherFeatures] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingPage, setLoadingPage] = useState(true);
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		get(`/properties/single/${id}`)
			.then(res => {
				setProperty(res.data);
				setOtherFeatures(res.data.otherFeatures);
				setLoadingPage(false);
			})
			.catch(err => {
				navigate('/404');
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const body = new FormData();

	// submit handler
	const submitHandler = e => {
		e.preventDefault();
		setLoading(true);

		// append data to body to send
		for (const key in property) {
			if (key !== 'otherFeatures') {
				body.append(key, property[key]);
			}
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
		patchFile(`/properties/update/${id}`, body).then(data => {
			setLoading(false);

			if (data.success) {
				setOpenSuccess(true);
				setSuccessMessage(data.message);
				navigate('/thisissomethingrandomwhichnoonecanthinkabout');
			} else {
				setOpenError(true);
				setErrorMessage(data.message);
			}
		});
	};

	return (
		<section>
			{loadingPage ? (
				<Loader fullScreen />
			) : (
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
						value={property.title}
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
						value={property.description}
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
						value={property.address}
						required
						fullWidth
						onChange={e =>
							setProperty({
								...property,
								address: e.target.value,
							})
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Owner"
						value={property.owner}
						required
						fullWidth
						onChange={e =>
							setProperty({ ...property, owner: e.target.value })
						}
					/>
					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Commission"
						value={property.commission}
						required
						fullWidth
						onChange={e =>
							setProperty({
								...property,
								commission: e.target.value,
							})
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Owner Contact"
						value={property.ownerContact}
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
						value={property.otherFeatures.join('\n')}
						fullWidth
						multiline
						onChange={e =>
							setOtherFeatures(e.target.value.split('\n'))
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Price"
						type="number"
						value={property.price}
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
						value={property.specialPrice}
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
						value={property.size}
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
								setProperty({
									...property,
									unit: e.target.value,
								})
							}
						>
							<MenuItem value={'Sq. Ft.'}>Sq. Ft</MenuItem>
							<MenuItem value={'Acre'}>Acre</MenuItem>
							<MenuItem value={'Gaj'}>Gaj</MenuItem>
							<MenuItem value={'Marla'}>Marla</MenuItem>
							<MenuItem value={'Bigha'}>Bigha</MenuItem>
							<MenuItem value={'Bigha-Pucca'}>
								Bigha-Pucca
							</MenuItem>
							<MenuItem value={'Bigha-Kachha'}>
								Bigha-Kachha
							</MenuItem>
							<MenuItem value={'Bigha-Kachha'}>
								Bigha-Kachha
							</MenuItem>
							<MenuItem value={'Biswa'}>Biswa</MenuItem>
							<MenuItem value={'Biswa'}>Biswa</MenuItem>
							<MenuItem value={'Biswa–Pucca'}>
								Biswa–Pucca
							</MenuItem>
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
						value={property.floor}
						onChange={e =>
							setProperty({ ...property, floor: e.target.value })
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Bedrooms"
						type="number"
						value={property.bedrooms}
						onChange={e =>
							setProperty({
								...property,
								bedroom: e.target.value,
							})
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Bathroom"
						type="number"
						value={property.bathroom}
						onChange={e =>
							setProperty({
								...property,
								bathroom: e.target.value,
							})
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Living Room"
						type="number"
						value={property.livingRoom}
						onChange={e =>
							setProperty({
								...property,
								livingRoom: e.target.value,
							})
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Lobby"
						type="number"
						value={property.lobby}
						onChange={e =>
							setProperty({ ...property, lobby: e.target.value })
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Kitchen"
						type="number"
						value={property.kitchen}
						onChange={e =>
							setProperty({
								...property,
								kitchen: e.target.value,
							})
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Dinning Room"
						type="number"
						value={property.dinningRoom}
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
						value={property.storeRoom}
						onChange={e =>
							setProperty({ ...property, store: e.target.value })
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Pooja Room"
						type="number"
						value={property.poojaRoom}
						onChange={e =>
							setProperty({
								...property,
								poojaRoom: e.target.value,
							})
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Open Parking"
						type="number"
						value={property.openParking}
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
						value={property.closeParking}
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
						value={property.balcony}
						onChange={e =>
							setProperty({
								...property,
								balcony: e.target.value,
							})
						}
					/>
					{/* backend still required */}
					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Property Age"
						value={property.age}
						onChange={e =>
							setProperty({ ...property, age: e.target.value })
						}
					/>
					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Possession"
						value={property.possession}
						onChange={e =>
							setProperty({
								...property,
								possession: e.target.value,
							})
						}
					/>

					<br />

					<FormControl className="admin-property-form__select">
						<InputLabel>Type</InputLabel>
						<Select
							label="Type"
							value={property.type}
							onChange={e =>
								setProperty({
									...property,
									type: e.target.value,
								})
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
								setProperty({
									...property,
									status: e.target.value,
								})
							}
						>
							<MenuItem value="Unfurnished">Unfurnished</MenuItem>
							<MenuItem value="Semifurnished">
								Semifurnished
							</MenuItem>
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
					<FormControl className="admin-property-form__select">
						<InputLabel>Purchase Type</InputLabel>
						<Select
							label="Purchase Type"
							value={property.purchaseType}
							onChange={e =>
								setProperty({
									...property,
									purchaseType: e.target.value,
								})
							}
						>
							<MenuItem value="New Booking">New Booking</MenuItem>
							<MenuItem value="Resale">Resale</MenuItem>
						</Select>
					</FormControl>
					<FormControl className="admin-property-form__select">
						<InputLabel>Construction Status</InputLabel>
						<Select
							label="Construction Status"
							value={property.constructionStatus}
							onChange={e =>
								setProperty({
									...property,
									constructionStatus: e.target.value,
								})
							}
						>
							<MenuItem value="Under Construction">
								Under Construction
							</MenuItem>
							<MenuItem value="Ready to Move">
								Ready to Move
							</MenuItem>
						</Select>
					</FormControl>

					{/* Amenities */}
					<br />

					<BUpload
						title="Image"
						className="admin-property-form__upload-btn"
						onChange={e =>
							setImages([...images, ...e.target.files])
						}
						accept="image/*"
					/>

					{images.map((img, i) => {
						if (img instanceof File) {
							const objectURL = URL.createObjectURL(img);
							return (
								<div
									className="admin-property-form__preview-container"
									key={i}
								>
									<img
										className="admin-property-form__preview"
										src={objectURL}
										alt="can't preview"
									/>
									<BPrimary
										title={<DeleteIcon />}
										onClick={() =>
											setImages(
												images.filter(
													(_, i) =>
														i !== images.length - 1
												)
											)
										}
									/>
								</div>
							);
						}
					})}

					<br />

					<BUpload
						title="Videos"
						className="admin-property-form__upload-btn"
						onChange={e =>
							setVideos([...videos, ...e.target.files])
						}
						accept="video/*"
					/>

					{videos.map((vid, i) => {
						if (vid instanceof File) {
							const objectURL = URL.createObjectURL(vid);
							return (
								<div
									className="admin-property-form__preview-container"
									key={i}
								>
									<video
										controls
										autoPlay
										muted
										loop
										className="admin-property-form__preview"
									>
										<source
											src={objectURL}
											type="video/mp4"
										/>
									</video>

									<BPrimary
										title={<DeleteIcon />}
										onClick={() =>
											setVideos(
												videos.filter(
													(_, i) =>
														i !== videos.length - 1
												)
											)
										}
									/>
								</div>
							);
						}
					})}

					<br />

					<BUpload
						title="Documents"
						className="admin-property-form__upload-btn"
						onChange={e =>
							setDocuments([...documents, ...e.target.files])
						}
						accept="application/pdf"
					/>

					{documents.map((doc, i) => {
						if (doc instanceof File) {
							const objectURL = URL.createObjectURL(doc);
							return (
								<div
									className="admin-property-form__preview-container"
									key={i}
								>
									<iframe
										src={objectURL}
										title={objectURL}
										height="200"
										width="300"
									></iframe>

									<BPrimary
										title={<DeleteIcon />}
										onClick={() =>
											setDocuments(
												documents.filter(
													(_, i) =>
														i !==
														documents.length - 1
												)
											)
										}
									/>
								</div>
							);
						}
					})}

					<br />

					<BPrimary
						title="Submit"
						className="admin-property-form__submit-btn"
						type="submit"
						loading={loading}
					/>
				</form>
			)}
		</section>
	);
};

export default Update;
