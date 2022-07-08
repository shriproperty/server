/* eslint-disable array-callback-return */
import { useState, useEffect, useContext, FC, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BPrimary, BUpload } from '../../../components/util/button/Button';
import { ASuccess, AError } from '../../../components/util/alert/Alert';
import Loader from '../../../components/util/loader/Loader';
import DeleteIcon from '@mui/icons-material/Delete';

import { patchFile } from '../../../api/patch';
import deleteRequest from '../../../api/delete';
import { CheckBox } from '../../../components/util/input/Input';
import { Helmet } from 'react-helmet-async';
import { UserContext } from '../../../helpers/Context';
import {
	fakeFurnishingDetails,
	fakeListing,
} from '../../../helpers/fakeData';

//NOTE Sass is coming from form.scss file in ../form folder

const UpdatePendingListing: FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const user = useContext(UserContext) as LoggedInUser;

	/* --------------------------------- ANCHOR States --------------------------------- */

	const [listing, setListing] = useState<any>(fakeListing);
	const [otherFeatures, setOtherFeatures] = useState<
		Listing['otherFeatures']
	>([]);
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
	const [loadingPage, setLoadingPage] = useState(true);

	/* ------------------------------- ANCHOR Use Effect ------------------------------- */
	useEffect(() => {
		if (user.loaded) {
			const listingFromUser = user.data.listings.find(
				listing => listing._id === id
			);

			if (!listingFromUser) {
				navigate('/404');
			}

			if (listingFromUser) {
				setListing(listingFromUser);
				setOtherFeatures(listingFromUser?.otherFeatures);
				setFurnishingDetails(listingFromUser?.furnishingDetails);

				listingFromUser.facilities.forEach(facility =>
					setFacilities(prevState => [
						...prevState,
						JSON.stringify(facility),
					])
				);

				setLoadingPage(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, user.loaded, user.update]);

	const body = new FormData();

	/* -------------------------- ANCHOR submit handler ------------------------- */
	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// append data to body to send
		for (let key in listing) {
			if (
				key !== '_id' &&
				key !== '__v' &&
				key !== 'otherFeatures' &&
				key !== 'facilities' &&
				key !== 'furnishingDetails'
			) {
				body.append(key, listing[key]);
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
			body.append(
				'facilities',
				facilities[facility] as unknown as string
			);
		}

		// post to server
		patchFile(`/listings/update/${id}`, body).then((data: any) => {
			setLoading(false);

			if (data.success) {
				setOpenSuccess(true);
				setSuccessMessage(data.message);
				navigate('/account');
			} else {
				setOpenError(true);
				setErrorMessage(data.message);
			}
		});
	};

	const deleteFileHandler = (
		id: string,
		type: 'images' | 'videos',
		key: string
	) => {
		return (e: FormEvent) => {
			deleteRequest(`/listings/delete-file/${id}/${type}/${key}`).then(
				data => {
					user.setUpdate(true);
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
	const checkboxHandler = (checked: boolean, title: string, icon: string) => {
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
	 *
	 * `title` The title of the facility
	 */
	const facilityChecker = (title: string) => {
		return facilities.some(
			facility => JSON.parse(facility).title === title
		);
	};

	/* ---------------------------- ANCHOR Facility Checker ---------------------------- */

	return (
		<section>
			<Helmet>
				<title>Update Pending Listing | Shri Property</title>
				<link
					rel="canonical"
					href="https://shriproperty.com/account/pending-listings/"
				/>
				<meta
					name="description"
					content="Update your pending Listing"
				/>
			</Helmet>

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
						value={listing.title}
						fullWidth
						required
						onChange={e =>
							setListing({ ...listing, title: e.target.value })
						}
					/>
					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Description"
						value={listing.description}
						fullWidth
						required
						multiline
						onChange={e =>
							setListing({
								...listing,
								description: e.target.value,
							})
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Address"
						value={listing.address}
						required
						fullWidth
						onChange={e =>
							setListing({
								...listing,
								address: e.target.value,
							})
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Locality"
						value={listing.locality}
						required
						fullWidth
						onChange={e =>
							setListing({
								...listing,
								locality: e.target.value,
							})
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Location"
						value={listing.location}
						helperText="Paste google maps url here"
						fullWidth
						onChange={e =>
							setListing({
								...listing,
								location: e.target.value,
							})
						}
					/>
					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Owner"
						value={listing.owner}
						required
						fullWidth
						onChange={e =>
							setListing({ ...listing, owner: e.target.value })
						}
					/>
					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Commission"
						value={listing.commission}
						required
						fullWidth
						onChange={e =>
							setListing({
								...listing,
								commission: e.target.value,
							})
						}
					/>
					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Owner Contact"
						value={listing.ownerContact}
						required
						fullWidth
						onChange={e =>
							setListing({
								...listing,
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
						value={listing.price}
						required
						onChange={e =>
							setListing({ ...listing, price: e.target.value })
						}
					/>
					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Special Price"
						type="number"
						value={listing.specialPrice}
						onChange={e =>
							setListing({
								...listing,
								specialPrice: e.target.value,
							})
						}
					/>

					<FormControl className="admin-property-form__select">
						<InputLabel>Type</InputLabel>
						<Select
							required
							label="Type"
							value={listing.type}
							onChange={e =>
								setListing({
									...listing,
									type: e.target.value,
								})
							}
						>
							<MenuItem value="Rental">Rental</MenuItem>
							<MenuItem value="Sale">Sale</MenuItem>
							<MenuItem value="PG">PG</MenuItem>
						</Select>
					</FormControl>

					{(listing.type === 'Rental' || listing.type === 'PG') && (
						<>
							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Security"
								value={listing.security}
								onChange={e =>
									setListing({
										...listing,
										security: e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Maintenance"
								value={listing.maintenance}
								onChange={e =>
									setListing({
										...listing,
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
						value={listing.size}
						required
						onChange={e =>
							setListing({ ...listing, size: e.target.value })
						}
					/>
					<FormControl className="admin-property-form__select">
						<InputLabel>Unit</InputLabel>
						<Select
							required
							label="Unit"
							value={listing.unit}
							onChange={e =>
								setListing({
									...listing,
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
						value={listing.floor}
						onChange={e =>
							setListing({ ...listing, floor: e.target.value })
						}
					/>
					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Bedrooms"
						type="number"
						value={listing.bedroom}
						onChange={e =>
							setListing({
								...listing,
								bedroom: e.target.value,
							})
						}
					/>
					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Bathroom"
						type="number"
						value={listing.bathroom}
						onChange={e =>
							setListing({
								...listing,
								bathroom: e.target.value,
							})
						}
					/>
					{(listing.type === 'Rental' || listing.type === 'Sale') && (
						<>
							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Living Room"
								type="number"
								value={listing.livingRoom}
								onChange={e =>
									setListing({
										...listing,
										livingRoom: e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Lobby"
								type="number"
								value={listing.lobby}
								onChange={e =>
									setListing({
										...listing,
										lobby: e.target.value,
									})
								}
							/>

							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Dinning Room"
								type="number"
								value={listing.dinningRoom}
								onChange={e =>
									setListing({
										...listing,
										dinningRoom: e.target.value,
									})
								}
							/>
							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Store Room"
								type="number"
								value={listing.store}
								onChange={e =>
									setListing({
										...listing,
										store: e.target.value,
									})
								}
							/>
							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Pooja Room"
								type="number"
								value={listing.poojaRoom}
								onChange={e =>
									setListing({
										...listing,
										poojaRoom: e.target.value,
									})
								}
							/>
						</>
					)}

					{listing.type === 'Sale' && (
						<>
							<TextField
								className="admin-property-form__input"
								variant="outlined"
								label="Property Age"
								value={listing.age}
								onChange={e =>
									setListing({
										...listing,
										age: e.target.value,
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
						value={listing.kitchen}
						onChange={e =>
							setListing({
								...listing,
								kitchen: e.target.value,
							})
						}
					/>

					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Open Parking"
						type="number"
						value={listing.openParking}
						onChange={e =>
							setListing({
								...listing,
								openParking: e.target.value,
							})
						}
					/>
					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Covered Parking"
						type="number"
						value={listing.closeParking}
						onChange={e =>
							setListing({
								...listing,
								closeParking: e.target.value,
							})
						}
					/>
					<TextField
						className="admin-property-form__input"
						variant="outlined"
						label="Balcony"
						type="number"
						value={listing.balcony}
						onChange={e =>
							setListing({
								...listing,
								balcony: e.target.value,
							})
						}
					/>

					<br />

					{/* -------------------------------- ANCHOR Drop Down -------------------------------  */}

					<FormControl className="admin-property-form__select">
						<InputLabel>category</InputLabel>
						<Select
							required
							label="category"
							value={listing.category}
							onChange={e =>
								setListing({
									...listing,
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
							value={listing.status}
							onChange={e =>
								setListing({
									...listing,
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
						<InputLabel>Direction</InputLabel>
						<Select
							required
							label="Direction"
							value={listing.direction}
							onChange={e =>
								setListing({
									...listing,
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

					{listing.type === 'Sale' && (
						<>
							<FormControl className="admin-property-form__select">
								<InputLabel>Purchase Type</InputLabel>
								<Select
									required
									label="Purchase Type"
									value={listing.purchaseType}
									onChange={e =>
										setListing({
											...listing,
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
									value={listing.constructionStatus}
									onChange={e =>
										setListing({
											...listing,
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

					{(listing.type === 'Sale' || listing.type === 'Rental') && (
						<FormControl className="admin-property-form__select">
							<InputLabel>Possession</InputLabel>
							<Select
								required
								label="Possession"
								value={listing.possession}
								onChange={e =>
									setListing({
										...listing,
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
					{(listing.status === 'Furnished' ||
						listing.status === 'Semifurnished') && (
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
					{listing.images.length > 0 ? (
						listing.images.map((img: S3File) => (
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
									type="button"
									onClick={deleteFileHandler(
										listing._id,
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
					{listing.videos.length > 0 ? (
						listing.videos.map((vid: S3File) => (
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
									type="button"
									onClick={deleteFileHandler(
										listing._id,
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

export default UpdatePendingListing;
