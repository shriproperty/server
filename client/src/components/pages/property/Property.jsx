/* eslint-disable react-hooks/exhaustive-deps */
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BPrimary, BSecondary } from '../../../components/util/button/Button';
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
					<section className="image-grid">
						<div className="image-grid__btns">
							<BSecondary title={response.category} />
							<BSecondary title={response.status} />
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
							<BSecondary title="All Images" />
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

						<section className="facilities-section">
							<h1 className="facilities-section_heading">
								Facilities
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
