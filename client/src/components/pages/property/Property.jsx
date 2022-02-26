/* eslint-disable react-hooks/exhaustive-deps */
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BPrimary } from '../../../components/util/button/Button';
import get from '../../../api/get';
import { post } from '../../../api/post';
import './property.scss';
import { HPrimary, SPrimary } from '../../util/typography/Typography';
import { AError } from '../../../components/util/alert/Alert';
import Loader from '../../util/loader/Loader';
import Modal from '../../util/modal/Modal';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StraightenIcon from '@mui/icons-material/Straighten';

const Property = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [modal, setModal] = useState(false);
	const [verifyOtpModel, setVerifyOtpModel] = useState(false);
	const [response, setResponse] = useState({});
	const [loading, setLoading] = useState(true);
	const [btnLoading, setBtnLoading] = useState(false);
	const [phone, setPhone] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [otp, setOtp] = useState('');
	const [errorModalOpen, setErrorModalOpen] = useState(false);
	const [errorModalMessage, setErrorModalMessage] = useState('');
	const [errorVerifyModalOpen, setErrorVerifyModalOpen] = useState(false);
	const [errorVerifyModalMessage, setErrorVerifyModalMessage] = useState('');

	useEffect(() => {
		// Verify token
		get('/temp-users/verify').catch(res => {
			setModal(true);
		});

		get(`/properties/single/${id}`)
			.then(data => {
				setResponse(data.data);
				setLoading(false);
			})
			.catch(() => {
				navigate('/404');
			});
	}, [id]);

	const sendOtpHandler = async e => {
		e.preventDefault();
		setBtnLoading(true);

		const sendOtpResponse = await post('/otp/send', {
			email,
		});

		setBtnLoading(false);

		if (sendOtpResponse.success) {
			setModal(false);
			setVerifyOtpModel(true);
		} else {
			setErrorModalMessage(sendOtpResponse.message);
			setErrorModalOpen(true);
		}
	};

	const verifyOtpHandler = async e => {
		e.preventDefault();
		setBtnLoading(true);

		const verifyOtpResponse = await post('/otp/verify', {
			email,
			otp,
		});

		setBtnLoading(false);

		// if otp is valid than create new user
		if (verifyOtpResponse.success) {
			const newUserResponse = await post('/temp-users/add', {
				name,
				email,
				phone: `+91${phone}`,
			});

			// if user is created successfully than save token and hide modal
			if (newUserResponse.success) {
				setVerifyOtpModel(false);
			} else {
				// if something went wrong while creating user than show error and open modal
				setErrorModalMessage(newUserResponse.message);
				setModal(true);
				setErrorModalOpen(true);
			}
		} else {
			// if otp is invalid than show error and open modal
			setErrorVerifyModalMessage(verifyOtpResponse.message);
			setErrorVerifyModalOpen(true);
		}
	};

	return (
		<main className="property-section">
			<Modal open={modal} className="model">
				<form className="model-container" onSubmit={sendOtpHandler}>
					<h2>Login</h2>

					<AError
						title={errorModalMessage}
						open={errorModalOpen}
						setOpen={setErrorModalOpen}
					/>

					<TextField
						label="Name"
						variant="outlined"
						className="model-container__input"
						onChange={e => setName(e.target.value)}
						fullWidth
					/>

					<TextField
						label="email"
						type="email"
						variant="outlined"
						className="model-container__input"
						onChange={e => setEmail(e.target.value)}
						fullWidth
					/>

					<TextField
						label="phone Number"
						type="number"
						variant="outlined"
						className="model-container__input"
						onChange={e => setPhone(e.target.value)}
						fullWidth
					/>

					<BPrimary
						title="Submit"
						type="submit"
						loading={btnLoading}
					/>
				</form>
			</Modal>

			<Modal open={verifyOtpModel} className="model">
				<form className="model-container" onSubmit={verifyOtpHandler}>
					<h2>Verify Otp</h2>
					<SPrimary title="Please check your email" />

					<AError
						title={errorVerifyModalMessage}
						open={errorVerifyModalOpen}
						setOpen={setErrorVerifyModalOpen}
					/>

					<TextField
						label="OTP"
						type="number"
						variant="outlined"
						className="model-container__input"
						onChange={e => setOtp(e.target.value)}
						fullWidth
					/>

					<BPrimary
						title="Verify"
						type="submit"
						loading={btnLoading}
					/>
				</form>
			</Modal>

			{loading ? (
				<Loader fullScreen fullWidth />
			) : (
				<section
					// hide other content if any model is opened
					style={{
						visibility: `${
							modal || verifyOtpModel ? 'hidden' : 'visible'
						}`,
					}}
				>
					{/* /* ---------------------------- ANCHOR Image Grid --------------------------- */}
					<section className="image-grid">
						<div className="image-grid__btns">
							<BPrimary title={response.category} />
							<BPrimary title={response.status} />
						</div>

						{/* if there is no video than image will be shown */}
						{response.videos.length > 0 ? (
							<>
								<video
									controls
									autoPlay
									muted
									loop
									className="image-grid__image image-grid__image--1"
								>
									<source
										src={response.videos[0]?.url}
										type="video/mp4"
									/>
									there is no video :(
								</video>

								<img
									src={response.images[0]?.url}
									alt="property"
									className="image-grid__image image-grid__image--2"
								/>

								<img
									src={response.images[1]?.url}
									alt="property"
									className="image-grid__image image-grid__image--3"
								/>
							</>
						) : (
							<>
								<img
									src={response.images[0]?.url}
									alt="property"
									className="image-grid__image image-grid__image--1"
								/>

								<img
									src={response.images[1]?.url}
									alt="property"
									className="image-grid__image image-grid__image--2"
								/>

								<img
									src={response.images[2]?.url}
									alt="property"
									className="image-grid__image image-grid__image--3"
								/>
							</>
						)}

						<Link
							to={`/allimages/${response._id}`}
							className="allimages"
						>
							<BPrimary title="All Images" />
						</Link>
					</section>

					<div>
						<section className="heading-section">
							<div className="heading-section_sub">
								<HPrimary title={response.title} />

								<h2 className="heading-section_addr">
									{response.address}
								</h2>
							</div>

							{/* <Link
								to="/properties"
								className="heading-section_link"
							>
								<BPrimary
									title="Request a Call"
									type="submit"
								/>
							</Link> */}
						</section>

						<section className="pricing-section">
							<h1 className="pricing-section_heading">
								Pricing and Size
							</h1>

							<div className="pricing-section__prices">
								<div className="pricing-section_item space">
									<div className="sell-icon">
										<LocalOfferIcon />
									</div>
									<h3
										className={
											response.specialPrice !== '' &&
											'line-through'
										}
									>
										{response.price}
									</h3>

									<h3 className="special-price">
										{response.specialPrice}
									</h3>
								</div>
								<div className="pricing-section_item">
									<div className="sell-icon">
										<StraightenIcon />
									</div>
									<h3>
										{response.size} {response.unit}
									</h3>
								</div>
							</div>
						</section>

						{/* /* -------------------------- ANCHOR Configurations ------------------------- */}

						<section className="facilities-section">
							<h1 className="facilities-section_heading">
								Configuration
							</h1>
							<div className="facilities-section__facilities">
								<div className="facilities-section_item">
									<h3>Bedroom</h3> <h3>{response.bedroom}</h3>
								</div>

								<div className="facilities-section_item">
									<h3>Bathroom</h3>{' '}
									<h3>{response.bathroom}</h3>
								</div>

								<div className="facilities-section_item">
									<h3>Kitchen</h3> <h3>{response.kitchen}</h3>
								</div>

								<div className="facilities-section_item">
									<h3>Open Parking</h3>
									<h3>{response.openParking}</h3>
								</div>

								<div className="facilities-section_item">
									<h3>Covered Parking</h3>
									<h3>{response.closeParking}</h3>
								</div>

								<div className="facilities-section_item">
									<h3>Pooja Room</h3>
									<h3>{response.poojaRoom}</h3>
								</div>

								<div className="facilities-section_item">
									<h3>Balconies</h3>{' '}
									<h3>{response.balcony}</h3>
								</div>

								<div className="facilities-section_item">
									<h3>Dinning Room</h3>
									<h3>{response.dinningRoom}</h3>
								</div>

								<div className="facilities-section_item">
									<h3>Living Room</h3>
									<h3>{response.livingRoom}</h3>
								</div>
								<div className="facilities-section_item">
									<h3>Store Room</h3>{' '}
									<h3>{response.store}</h3>
								</div>
							</div>
						</section>

						{/* /* --------------------------- ANCHOR Furnishing Details ---------------------------  */}

						{(response.status === 'Furnished' ||
							response.status === 'Semifurnished') && (
							<>
								<h1 className="amenities-section__heading">
									Furnishing Details
								</h1>

								<section className="amenities-section">
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/AC.png"
												alt="air codition"
											/>
										</div>
										<h3 className="amenities-section__name">
											Air Conditioner
										</h3>
										<div className="amenities-section__number">
											{response.furnishingDetails.ac}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/stove.png"
												alt="Stove"
											/>
										</div>
										<h3 className="amenities-section__name">
											Stove
										</h3>
										<div className="amenities-section__number">
											{response.furnishingDetails.stove}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/modular-kitchen.png"
												alt="Modular Kitchen"
											/>
										</div>
										<h3 className="amenities-section__name">
											Modular Kitchen
										</h3>
										<div className="amenities-section__number">
											{
												response.furnishingDetails
													.modularKitchen
											}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/fan.png"
												alt="fan"
											/>
										</div>
										<h3 className="amenities-section__name">
											Fan
										</h3>
										<div className="amenities-section__number">
											{response.furnishingDetails.fans}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/fridge.png"
												alt="Fridge"
											/>
										</div>
										<h3 className="amenities-section__name">
											Fridge
										</h3>
										<div className="amenities-section__number">
											{response.furnishingDetails.fridge}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/bulb.png"
												alt="light"
											/>
										</div>
										<h3 className="amenities-section__name">
											Light
										</h3>
										<div className="amenities-section__number">
											{response.furnishingDetails.light}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/bed.png"
												alt="bed"
											/>
										</div>
										<h3 className="amenities-section__name">
											Bed
										</h3>
										<div className="amenities-section__number">
											{response.furnishingDetails.beds}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/microwave.png"
												alt="microwave"
											/>
										</div>
										<h3 className="amenities-section__name">
											Microwave
										</h3>
										<div className="amenities-section__number">
											{
												response.furnishingDetails
													.microwave
											}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/restaurant.png"
												alt="Dining table"
											/>
										</div>
										<h3 className="amenities-section__name">
											Dinning Table
										</h3>
										<div className="amenities-section__number">
											{
												response.furnishingDetails
													.dinningTable
											}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/TV.png"
												alt="tv"
											/>
										</div>
										<h3 className="amenities-section__name">
											TV
										</h3>
										<div className="amenities-section__number">
											{response.furnishingDetails.tv}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/wardrobe.png"
												alt="Wardrobe"
											/>
										</div>
										<h3 className="amenities-section__name">
											Wardrobe
										</h3>
										<div className="amenities-section__number">
											{
												response.furnishingDetails
													.wardrobe
											}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/washing-machine.png"
												alt="Washing Machine"
											/>
										</div>
										<h3 className="amenities-section__name">
											Washing Machine
										</h3>
										<div className="amenities-section__number">
											{
												response.furnishingDetails
													.washingMachine
											}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/geyser.png"
												alt="water-heater"
											/>
										</div>
										<h3 className="amenities-section__name">
											Geyser
										</h3>
										<div className="amenities-section__number">
											{response.furnishingDetails.geyser}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/curtains.png"
												alt="open-curtains"
											/>
										</div>
										<h3 className="amenities-section__name">
											Curtains
										</h3>
										<div className="amenities-section__number">
											{
												response.furnishingDetails
													.curtains
											}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/sofa.png"
												alt="three-seater-sofa"
											/>
										</div>
										<h3 className="amenities-section__name">
											Sofa
										</h3>
										<div className="amenities-section__number">
											{response.furnishingDetails.sofa}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/water-cooler.png"
												alt="Water purifier"
											/>
										</div>
										<h3 className="amenities-section__name">
											Water Purifier
										</h3>
										<div className="amenities-section__number">
											{
												response.furnishingDetails
													.waterPurifier
											}
										</div>
									</div>
									<div className="amenities-container">
										<div>
											<img
												src="/images/amenities/exhaust.png"
												alt="Exhaust"
											/>
										</div>
										<h3 className="amenities-section__name">
											Exhaust
										</h3>
										<div className="amenities-section__number">
											{response.furnishingDetails.exhaust}
										</div>
									</div>
								</section>
							</>
						)}

						{/* ------------------------------- ANCHOR Facilities ------------------------------- */}
						<h1 className="amenities-section__heading">
							Facilities
						</h1>

						<section className="amenities-section">
							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/alarm.png"
										alt="Alarm"
									/>
								</div>
								<h3 className="amenities-section__name">
									Fire/Security Alarm
								</h3>
							</div>

							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/power-backup.png"
										alt="Power Backup"
									/>
								</div>

								<h3 className="amenities-section__name">
									Power Backup
								</h3>
							</div>

							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/intercome.png"
										alt="intercome"
									/>
								</div>
								<h3 className="amenities-section__name">
									Intercome
								</h3>
							</div>

							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/lift.png"
										alt="Lift"
									/>
								</div>
								<h3 className="amenities-section__name">
									Lift
								</h3>
							</div>

							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/maintenance.png"
										alt="Maintenance"
									/>
								</div>
								<h3 className="amenities-section__name">
									Maintenance Staff
								</h3>
							</div>
							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/park.png"
										alt="Park"
									/>
								</div>
								<h3 className="amenities-section__name">
									Park
								</h3>
							</div>

							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/swimming-pool.png"
										alt="Swimming Pool"
									/>
								</div>
								<h3 className="amenities-section__name">
									Swimming Pool
								</h3>
							</div>
							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/gym.png"
										alt="Gym"
									/>
								</div>
								<h3 className="amenities-section__name">Gym</h3>
							</div>

							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/market.png"
										alt="Market"
									/>
								</div>
								<h3 className="amenities-section__name">
									Market
								</h3>
							</div>

							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/water-tank.png"
										alt="Water Tank"
									/>
								</div>

								<h3 className="amenities-section__name">
									Water Storage
								</h3>
							</div>

							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/piped-gas.png"
										alt="Pipe"
									/>
								</div>

								<h3 className="amenities-section__name">
									Piped Gas
								</h3>
							</div>
							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/parking.png"
										alt="Parking"
									/>
								</div>
								<h3 className="amenities-section__name">
									Visitor Parking
								</h3>
							</div>
							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/water.png"
										alt="water"
									/>
								</div>
								<h3 className="amenities-section__name">
									Water supply 24/7
								</h3>
							</div>

							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/security-guard.png"
										alt="Security Guard"
									/>
								</div>
								<h3 className="amenities-section__name">
									Security Guard
								</h3>
							</div>

							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/wifi.png"
										alt="wifi router"
									/>
								</div>
								<h3 className="amenities-section__name">
									Wifi
								</h3>
							</div>

							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/club-house.png"
										alt="Club House"
									/>
								</div>
								<h3 className="amenities-section__name">
									Club House
								</h3>
							</div>
							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/earthquakes.png"
										alt="Earthquake Resistance"
									/>
								</div>
								<h3 className="amenities-section__name">
									Earthquake Resistance
								</h3>
							</div>

							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/STP.png"
										alt="STP"
									/>
								</div>
								<h3 className="amenities-section__name">STP</h3>
							</div>

							<div className="amenities-container">
								<div>
									<img
										src="/images/amenities/ceiling-light.png"
										alt="Ceiling Light"
									/>
								</div>
								<h3 className="amenities-section__name">
									Ceiling Light
								</h3>
							</div>
						</section>

						{response?.otherFeatures.length > 0 && (
							<section className="other-facilities-section">
								<h1>Other Features</h1>

								<ul>
									{response.otherFeatures.map(feature => (
										<li key={feature}>{feature}</li>
									))}
								</ul>
							</section>
						)}

						<section className="description-section">
							<h1>About</h1>
							<p>{response.description}</p>
						</section>

						{response?.documents.map((doc, i) => (
							<a href={doc.url} className="link" key={doc.key}>
								Download pdf {i + 1}
							</a>
						))}
					</div>
				</section>
			)}
		</main>
	);
};

export default Property;
