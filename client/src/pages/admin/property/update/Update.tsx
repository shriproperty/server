/* eslint-disable array-callback-return */
import { useState, useEffect, FC, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BPrimary, BUpload } from '../../../../components/util/button/Button';
import { ASuccess, AError } from '../../../../components/util/alert/Alert';
import Loader from '../../../../components/util/loader/Loader';
import DeleteIcon from '@mui/icons-material/Delete';

import { patchFile } from '../../../../api/patch';
import get from '../../../../api/get';
import deleteRequest from '../../../../api/delete';
import { CheckBox } from '../../../../components/util/input/Input';
import { Helmet } from 'react-helmet-async';
import {
	fakeFurnishingDetails,
	fakeProperty,
} from '../../../../helpers/fakeData';

//NOTE Sass is coming from form.scss file in ../form folder

const Update: FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	/* --------------------------------- ANCHOR States --------------------------------- */
	const [property, setProperty] = useState<any>(fakeProperty);
	const [otherFeatures, setOtherFeatures] = useState<string[]>([]);
	const [furnishingDetails, setFurnishingDetails] =
		useState<FurnishingDetails>(fakeFurnishingDetails);
	const [facilities, setFacilities] = useState<string[]>([]);
	const [images, setImages] = useState<any[]>([]);
	const [videos, setVideos] = useState<any[]>([]);
	const [documents, setDocuments] = useState<any[]>([]);

	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const [loading, setLoading] = useState(false);
	const [deleteFile, setDeleteFile] = useState(false);
	const [loadingPage, setLoadingPage] = useState(true);

	/* ------------------------------- ANCHOR Use Effect ------------------------------- */
	useEffect(() => {
		get(`/properties/single/${id}`)
			.then(res => {
				setProperty(res.data);
				setOtherFeatures(res.data.otherFeatures);
				setFurnishingDetails(res.data.furnishingDetails);
				res.data.facilities.forEach((facility: string) => {
					setFacilities(prevState => [
						...prevState,
						JSON.stringify(facility),
					]);
				});
				setLoadingPage(false);
				setDeleteFile(false);
			})
			.catch(err => {
				navigate('/404');
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, deleteFile]);

	const body = new FormData();

	/* -------------------------- ANCHOR submit handler ------------------------- */
	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// append data to body to send
		for (const key in property) {
			if (
				key !== '_id' &&
				key !== '__v' &&
				key !== 'otherFeatures' &&
				key !== 'facilities' &&
				key !== 'furnishingDetails'
			) {
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

		body.append(
			'furnishingDetails',
			JSON.stringify(furnishingDetails ? furnishingDetails : {})
		);

		//  append Facilities to body
		for (let facility in facilities) {
			body.append('facilities', facilities[facility]);
		}

		// post to server
		patchFile(`/properties/update/${id}`, body).then((data: any) => {
			setLoading(false);

			if (data.success) {
				setOpenSuccess(true);
				setSuccessMessage(data.message);
				navigate(`${process.env.REACT_APP_ADMIN_ROUTE}`);
			} else {
				setOpenError(true);
				setErrorMessage(data.message);
			}
		});
	};

	/**
	 * @param {string} id Id of file
	 * @param {string} type type of file `image` | `video`
	 * @param {string} key key of file
	 */
	const deleteFileHandler = (
		id: string,
		type: 'images' | 'videos',
		key: string
	) => {
		return () => {
			deleteRequest(`/properties/delete-file/${id}/${type}/${key}`).then(
				data => {
					setDeleteFile(true);
				}
			);
		};
	};

	/* --------------------------------- ANCHOR Checkbox handler --------------------------------- */
	/**
	 * Checkbox handler
	 * @param {boolean} checked If checkbox is checked: `true` or unchecked: `false`
	 * @param {string} title The title of the facility
	 * @param {string} icon Icon which will be used for facility should be same as icon name in file system
	 */
	const checkboxHandler = (checked: string, title: string, icon: string) => {
		if (checked && !facilities.includes(JSON.stringify({ title, icon }))) {
			setFacilities(prevState => [
				...prevState,
				JSON.stringify({
					title,
					icon,
				}),
			]);
		} else {
			setFacilities(prevState =>
				prevState.filter(item => JSON.parse(item).title !== title)
			);
		}
	};

	/* ---------------------------- ANCHOR Facility Checker ---------------------------- */
	/**
	 * Check if an facility exists in the facilities array
	 * @param {string} title The title of the facility
	 */
	const facilityChecker = (title: string) => {
		return facilities.some(
			facility => JSON.parse(facility).title === title
		);
	};

	return (
		<section>
			<Helmet>
				<meta name="robots" content="noindex" />
			</Helmet>

			{loadingPage ? (
				<Loader fullScreen />
			) : (
				<form onSubmit={submitHandler} className="admin-property-form">
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
						label="Locality"
						value={property.locality}
						fullWidth
						onChange={e =>
							setProperty({
								...property,
								locality: e.target.value,
							})
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Location"
						value={property.location}
						helperText="Paste google maps url here"
						fullWidth
						onChange={e =>
							setProperty({
								...property,
								location: e.target.value,
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
						value={otherFeatures.join('\n')}
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

					<FormControl className="admin-property-form__select">
						<InputLabel>Type</InputLabel>
						<Select
							required
							label="Type"
							value={property.type}
							onChange={e =>
								setProperty({
									...property,
									type: e.target.value,
								})
							}
						>
							<MenuItem value="Rental">Rental</MenuItem>
							<MenuItem value="Sale">Sale</MenuItem>
							<MenuItem value="PG">PG</MenuItem>
						</Select>
					</FormControl>

					{(property.type === 'Rental' || property.type === 'PG') && (
						<>
							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Security"
								value={property.security}
								onChange={e =>
									setProperty({
										...property,
										security: e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Maintenance"
								value={property.maintenance}
								onChange={e =>
									setProperty({
										...property,
										maintenance: e.target.value,
									})
								}
							/>
						</>
					)}

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
							required
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
							<MenuItem value={'Biswa-Pucca'}>
								Biswa-Pucca
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
						value={property.bedroom}
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

					{(property.type === 'Rental' ||
						property.type === 'Sale') && (
						<>
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
									setProperty({
										...property,
										lobby: e.target.value,
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
						</>
					)}

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
						label="Store Room"
						type="number"
						value={property.store}
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

					<br />
					{/* -------------------------------- ANCHOR Drop Down -------------------------------  */}

					<FormControl className="admin-property-form__select">
						<InputLabel>category</InputLabel>
						<Select
							required
							label="category"
							value={property.category}
							onChange={e =>
								setProperty({
									...property,
									category: e.target.value,
								})
							}
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
							required
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
							required
							label="Featured"
							value={property.featured}
							onChange={e =>
								setProperty({
									...property,
									featured: e.target.value,
								})
							}
						>
							<MenuItem value={'true'}>True</MenuItem>
							<MenuItem value={'false'}>False</MenuItem>
						</Select>
					</FormControl>
					<FormControl className="admin-property-form__select">
						<InputLabel>Direction</InputLabel>
						<Select
							required
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

					{property.type === 'Sale' && (
						<>
							<FormControl className="admin-property-form__select">
								<InputLabel>Purchase Type</InputLabel>
								<Select
									required
									label="Purchase Type"
									value={property.purchaseType}
									onChange={e =>
										setProperty({
											...property,
											purchaseType: e.target.value,
										})
									}
								>
									<MenuItem value="New Booking">
										New Booking
									</MenuItem>
									<MenuItem value="Resale">Resale</MenuItem>
								</Select>
							</FormControl>

							<FormControl className="admin-property-form__select">
								<InputLabel>Construction Status</InputLabel>
								<Select
									required
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
						</>
					)}

					{(property.type === 'Sale' ||
						property.type === 'Rental') && (
						<FormControl className="admin-property-form__select">
							<InputLabel>Possession</InputLabel>
							<Select
								required
								label="Possession"
								value={property.possession}
								onChange={e =>
									setProperty({
										...property,
										possession: e.target.value,
									})
								}
							>
								<MenuItem value="Immediate">Immediate</MenuItem>

								<MenuItem value="Between 1 Month">
									Between 1 Month
								</MenuItem>

								<MenuItem value="Between 2 Month">
									Between 2 Month
								</MenuItem>

								<MenuItem value="Between 3 Month">
									Between 3 Month
								</MenuItem>

								<MenuItem value="Between 6 Months">
									Between 6 Months
								</MenuItem>

								<MenuItem value="2023">2023</MenuItem>

								<MenuItem value="2024">2024</MenuItem>

								<MenuItem value="2025">2025</MenuItem>

								<MenuItem value="2026">2026</MenuItem>

								<MenuItem value="2027">2027</MenuItem>

								<MenuItem value="2028">2028</MenuItem>

								<MenuItem value="2029">2029</MenuItem>

								<MenuItem value="2030">2030</MenuItem>
							</Select>
						</FormControl>
					)}

					{/*  --------------------------- ANCHOR Furnishing Details --------------------------- */}
					{(property.status === 'Furnished' ||
						property.status === 'Semifurnished') && (
						<>
							<h1>
								Add Furnishing Details (Add amount of things
								eg:- fans = 5)
							</h1>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="AC"
								type="number"
								value={furnishingDetails.ac}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										ac: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="stove"
								type="number"
								value={furnishingDetails.stove}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										stove: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Modular Kitchen"
								type="number"
								value={furnishingDetails.modularKitchen}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										modularKitchen: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Fans"
								type="number"
								value={furnishingDetails.fans}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										fans: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Fridge"
								type="number"
								value={furnishingDetails.fridge}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										fridge: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Light"
								type="number"
								value={furnishingDetails.light}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										light: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Bed"
								type="number"
								value={furnishingDetails.beds}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										beds: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="microwave"
								type="number"
								value={furnishingDetails.microwave}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										microwave: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="dinning table"
								type="number"
								value={furnishingDetails.dinningTable}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										dinningTable: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="TV"
								type="number"
								value={furnishingDetails.tv}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										tv: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Dressing Table"
								type="number"
								value={furnishingDetails.dressingTable}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										dressingTable: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="TV Wall Panel"
								type="number"
								value={furnishingDetails.tvWallPanel}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										tvWallPanel: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="wardrobe"
								type="number"
								value={furnishingDetails.wardrobe}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										wardrobe: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="washing machine"
								type="number"
								value={furnishingDetails.washingMachine}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										washingMachine: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Geyser"
								type="number"
								value={furnishingDetails.geyser}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										geyser: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Curtains"
								type="number"
								value={furnishingDetails.curtains}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										curtains: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Sofa"
								type="number"
								value={furnishingDetails.sofa}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										sofa: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="water purifier"
								type="number"
								value={furnishingDetails.waterPurifier}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										waterPurifier: +e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Exhaust"
								type="number"
								value={furnishingDetails.exhaust}
								onChange={e =>
									setFurnishingDetails({
										...furnishingDetails,
										exhaust: +e.target.value,
									})
								}
							/>
						</>
					)}

					{/* /* ------------------------------- ANCHOR Facilities -------------------------------  */}
					<h1>Choose Facilities From The Following </h1>
					<div className="admin-property-form__facilities">
						<CheckBox
							label="Fire/Security Alarm"
							checked={facilityChecker('Fire/Security Alarm')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Fire/Security Alarm',
									'alarm.png'
								)
							}
						/>

						<CheckBox
							label="Power Backup"
							checked={facilityChecker('Power Backup')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Power Backup',
									'power-backup.png'
								)
							}
						/>

						<CheckBox
							label="Intercome"
							checked={facilityChecker('Intercome')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Intercome',
									'intercome.png'
								)
							}
						/>

						<CheckBox
							label="Lift"
							checked={facilityChecker('Lift')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Lift',
									'lift.png'
								)
							}
						/>

						<CheckBox
							label="Maintenance Staff"
							checked={facilityChecker('Maintenance Staff')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Maintenance Staff',
									'maintenance.png'
								)
							}
						/>

						<CheckBox
							label="Park"
							checked={facilityChecker('Park')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Park',
									'park.png'
								)
							}
						/>

						<CheckBox
							label="Swimming Pool"
							checked={facilityChecker('Swimming Pool')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Swimming Pool',
									'swimming-pool.png'
								)
							}
						/>

						<CheckBox
							label="Gym"
							checked={facilityChecker('Gym')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Gym',
									'gym.png'
								)
							}
						/>

						<CheckBox
							label="Market"
							checked={facilityChecker('Market')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Market',
									'market.png'
								)
							}
						/>

						<CheckBox
							label="Water Storage"
							checked={facilityChecker('Water Storage')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Water Storage',
									'water-tank.png'
								)
							}
						/>

						<CheckBox
							label="Piped Gas"
							checked={facilityChecker('Piped Gas')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Piped Gas',
									'piped-gas.png'
								)
							}
						/>

						<CheckBox
							label="Visitor Parking"
							checked={facilityChecker('Visitor Parking')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Visitor Parking',
									'parking.png'
								)
							}
						/>

						<CheckBox
							label="Water supply 24/7"
							checked={facilityChecker('Water supply 24/7')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Water supply 24/7',
									'water.png'
								)
							}
						/>

						<CheckBox
							label="Security Guard"
							checked={facilityChecker('Security Guard')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Security Guard',
									'security-guard.png'
								)
							}
						/>

						<CheckBox
							label="CCTV"
							checked={facilityChecker('CCTV')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'CCTV',
									'cctv.png'
								)
							}
						/>

						<CheckBox
							label="Gated Society"
							checked={facilityChecker('Gated Society')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Gated Society',
									'gate.png'
								)
							}
						/>

						<CheckBox
							label="Street Light"
							checked={facilityChecker('Street Light')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Street Light',
									'street-light.png'
								)
							}
						/>

						<CheckBox
							label="WiFi"
							checked={facilityChecker('WiFi')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'WiFi',
									'wifi.png'
								)
							}
						/>
						<CheckBox
							label="Club House"
							checked={facilityChecker('Club House')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Club House',
									'club-house.png'
								)
							}
						/>

						<CheckBox
							label="STP"
							checked={facilityChecker('STP')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'STP',
									'STP.png'
								)
							}
						/>

						<CheckBox
							label="Ceiling Light"
							checked={facilityChecker('Ceiling Light')}
							onChange={e =>
								checkboxHandler(
									e.target.checked,
									'Ceiling Light',
									'ceiling-light.png'
								)
							}
						/>
					</div>

					{/*   ----------------------------- ANCHOR Upload Buttons ----------------------------- */}

					<h1>Images</h1>
					{property.images.length > 0 ? (
						property.images.map((img: any) => (
							<div
								className="admin-property-form__preview-container"
								key={img.key}
							>
								<img
									className="admin-property-form__preview"
									src={img.url}
									alt="can't preview"
								/>
								<BPrimary
									title={<DeleteIcon />}
									onClick={deleteFileHandler(
										property._id,
										'images',
										img.key
									)}
								/>
							</div>
						))
					) : (
						<h1>there are no images</h1>
					)}
					<h1>Videos</h1>
					{property.videos.length > 0 ? (
						property.videos.map((vid: any) => (
							<div
								className="admin-property-form__preview-container"
								key={vid.key}
							>
								<video
									controls
									autoPlay
									muted
									loop
									className="admin-property-form__preview"
								>
									<source src={vid.url} type="video/mp4" />
								</video>

								<BPrimary
									title={<DeleteIcon />}
									onClick={deleteFileHandler(
										property._id,
										'videos',
										vid.key
									)}
								/>
							</div>
						))
					) : (
						<h1>there are no Videos</h1>
					)}
					<br />
					<BUpload
						title="Image"
						className="admin-property-form__upload-btn"
						onChange={(e: any) =>
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
													(_, index) => index !== i
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
						onChange={(e: any) =>
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
													(_, index) => index !== i
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
						onChange={(e: any) =>
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
													(_, index) => index !== i
												)
											)
										}
									/>
								</div>
							);
						}
					})}
					<br />

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
