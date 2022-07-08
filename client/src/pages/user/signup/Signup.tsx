import { useState, useContext, FC, FormEvent, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { BPrimary } from '../../../components/util/button/Button';
import postRequest from '../../../api/post';
import { SPrimary } from '../../../components/util/typography/Typography';
import { AError } from '../../../components/util/alert/Alert';
import Modal from '../../../components/util/modal/Modal';
import { AuthFormSubmitContext } from '../../../helpers/Context';

import './signup.scss';
import { Helmet } from 'react-helmet-async';

const Signup: FC = () => {
	const navigate = useNavigate();
	const { setAuthFormSubmit } = useContext(AuthFormSubmitContext);

	const [user, setUser] = useState({
		name: 'Your Name',
		email: 'example@gmail.com',
		phone: '123456789',
		password: '',
		cpassword: '',
	});

	const [errorOpen, setErrorOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [verifyOtpModel, setVerifyOtpModel] = useState(false);
	const [errorVerifyModalOpen, setErrorVerifyModalOpen] = useState(false);
	const [errorVerifyModalMessage, setErrorVerifyModalMessage] = useState('');
	const [otp, setOtp] = useState('');
	const [btnLoading, setBtnLoading] = useState(false);

	const sendOtpHandler = async (e: FormEvent) => {
		e.preventDefault();

		if (user.password !== user.cpassword) {
			setErrorMessage('Password and Confirm Password does not match');
			return setErrorOpen(true);
		}

		setBtnLoading(true);

		const res = (await postRequest(
			'/otp/send',
			{
				email: user.email,
			},
			false
		)) as ApiResponse;

		setBtnLoading(false);

		if (res.success) setVerifyOtpModel(true);
		else {
			setErrorMessage(res.message);
			setErrorOpen(true);
		}
	};

	const verifyOtpHandler = async (e: FormEvent) => {
		e.preventDefault();

		const res = (await postRequest(
			'/otp/verify',
			{
				email: user.email,
				otp,
			},
			false
		)) as ApiResponse;

		if (res.success) {
			const signupRes = (await postRequest(
				'/auth/signup',
				user,
				false
			)) as ApiResponse;
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
				<form
					className="signup-section__modal"
					onSubmit={verifyOtpHandler}
				>
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
						className="model-form__input"
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
						value={user.name}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setUser({ ...user, name: e.target.value })
						}
						fullWidth
						required
					/>

					<TextField
						className="signup-section__input"
						label="Email"
						variant="outlined"
						type="email"
						value={user.email}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setUser({ ...user, email: e.target.value })
						}
						fullWidth
						required
					/>

					<TextField
						className="signup-section__input"
						label="Phone"
						variant="outlined"
						type="number"
						value={user.phone}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setUser({ ...user, phone: e.target.value })
						}
						fullWidth
						required
					/>

					<TextField
						className="signup-section__input"
						label="Password"
						variant="outlined"
						type="password"
						value={user.password}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setUser({ ...user, password: e.target.value })
						}
						fullWidth
						required
					/>

					<TextField
						className="signup-section__input"
						label="Confirm Password"
						variant="outlined"
						type="password"
						value={user.cpassword}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setUser({ ...user, cpassword: e.target.value })
						}
						fullWidth
						required
					/>

					<p className="signup-section__link">
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
