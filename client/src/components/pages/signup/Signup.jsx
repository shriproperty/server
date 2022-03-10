import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { BPrimary } from '../../util/button/Button';
import { post } from '../../../api/post';
import { SPrimary } from '../../util/typography/Typography';
import { AError } from '../../../components/util/alert/Alert';
import Modal from '../../util/modal/Modal';

import './signup.scss';
import { Helmet } from 'react-helmet-async';

const Signup = ({ setAuthFormSubmit }) => {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [cpassword, setCpassword] = useState('');

	const [errorOpen, setErrorOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [verifyOtpModel, setVerifyOtpModel] = useState(false);
	const [errorVerifyModalOpen, setErrorVerifyModalOpen] = useState(false);
	const [errorVerifyModalMessage, setErrorVerifyModalMessage] = useState('');
	const [otp, setOtp] = useState('');
	const [btnLoading, setBtnLoading] = useState(false);

	const sendOtpHandler = async e => {
		e.preventDefault();

		if (password !== cpassword) {
			setErrorMessage('Password and Confirm Password does not match');
			return setErrorOpen(true);
		}

		setBtnLoading(true);

		const res = await post('/otp/send', {
			email,
		});

		setBtnLoading(false);

		if (res.success) setVerifyOtpModel(true);
		else {
			setErrorMessage(res.message);
			setErrorOpen(true);
		}
	};

	const verifyOtpHandler = async e => {
		e.preventDefault();

		const res = await post('/otp/verify', {
			email,
			otp,
		});

		if (res.success) {
			const signupRes = await post('/auth/signup', {
				name,
				email,
				phone,
				password,
				cpassword,
			});
			setAuthFormSubmit(true);

			if (signupRes.success) navigate('/');
			else {
				setErrorMessage(signupRes.message);
				setVerifyOtpModel(false);
				setErrorOpen(true);
			}
		} else {
			setErrorVerifyModalOpen(true);
			setErrorVerifyModalMessage(res.message);
		}
	};

	return (
		<section className="signup-section">
			<Helmet>
				<title>Signup | Shri Property</title>
				<link rel="canonical" href="https://shriproperty.com/signup" />
				<meta
					name="description"
					content="Signup on Shri Property to get exclusive feature of listing your own properties"
				/>
			</Helmet>

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

					<span onClick={sendOtpHandler}>Resend OTP</span>

					<BPrimary
						title="Verify"
						type="submit"
						loading={btnLoading}
					/>
				</form>
			</Modal>

			<div className="signup-section__container">
				<img
					src="/images/illustrations/signup.svg"
					alt="illustration"
					className="signup-section__image"
				/>

				<form
					className="signup-section__form"
					onSubmit={sendOtpHandler}
				>
					<AError
						title={errorMessage}
						open={errorOpen}
						setOpen={setErrorOpen}
					/>

					<TextField
						className="signup-section__input"
						label="Name"
						variant="outlined"
						onChange={e => setName(e.target.value)}
						fullWidth
						required
					/>

					<TextField
						className="signup-section__input"
						label="Email"
						variant="outlined"
						type="email"
						onChange={e => setEmail(e.target.value)}
						fullWidth
						required
					/>

					<TextField
						className="signup-section__input"
						label="Phone"
						variant="outlined"
						type="number"
						onChange={e => setPhone(e.target.value)}
						fullWidth
						required
					/>

					<TextField
						className="signup-section__input"
						label="Password"
						variant="outlined"
						type="password"
						onChange={e => setPassword(e.target.value)}
						fullWidth
						required
					/>

					<TextField
						className="signup-section__input"
						label="Confirm Password"
						variant="outlined"
						type="password"
						onChange={e => setCpassword(e.target.value)}
						fullWidth
						required
					/>

					<p className="login-section__link">
						Already have account <Link to="/login">Login</Link>
					</p>

					<BPrimary
						title="Sign up"
						className="signup-section__btn"
						type="submit"
						loading={btnLoading}
					/>
				</form>
			</div>
		</section>
	);
};

export default Signup;
