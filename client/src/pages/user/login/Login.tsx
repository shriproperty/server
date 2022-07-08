import { TextField } from '@mui/material';
import { FC, FormEvent, useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { patchRequest } from '../../../api/patch';
import postRequest from '../../../api/post';
import { AuthFormSubmitContext } from '../../../helpers/Context';
import { AError } from '../../../components/util/alert/Alert';
import { BPrimary } from '../../../components/util/button/Button';
import Modal from '../../../components/util/modal/Modal';
import { SPrimary } from '../../../components/util/typography/Typography';

import './login.scss';

const Login: FC = () => {
	const navigate = useNavigate();
	const { setAuthFormSubmit } = useContext(AuthFormSubmitContext);

	const [email, setEmail] = useState('youremail@example.com');
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [errorOpen, setErrorOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [btnLoading, setBtnLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [verifyOtpModel, setVerifyOtpModel] = useState(false);
	const [errorModalOpen, setErrorModalOpen] = useState(false);
	const [errorModalMessage, setErrorModalMessage] = useState('');
	const [errorVerifyModalOpen, setErrorVerifyModalOpen] = useState(false);
	const [errorVerifyModalMessage, setErrorVerifyModalMessage] = useState('');
	const [otp, setOtp] = useState('');

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();

		setBtnLoading(true);

		const res = (await postRequest(
			'/auth/login',
			{
				email,
				password,
			},
			false
		)) as ApiResponse;

		setBtnLoading(false);

		if (res.success) {
			navigate('/');
			setAuthFormSubmit(true);
		} else {
			setErrorMessage(res.message);
			setErrorOpen(true);
		}
	};

	const sendOtpHandler = async (e: FormEvent) => {
		e.preventDefault();
		setBtnLoading(true);

		const sendOtpResponse = (await postRequest(
			'/otp/send',
			{
				email,
			},
			false
		)) as ApiResponse;

		setBtnLoading(false);

		if (sendOtpResponse.success) {
			setModal(false);
			setVerifyOtpModel(true);
		} else {
			setErrorModalMessage(sendOtpResponse.message);
			setErrorModalOpen(true);
		}
	};

	const verifyOtpHandler = async (e: FormEvent) => {
		e.preventDefault();
		setBtnLoading(true);

		const verifyOtpResponse = (await postRequest(
			'/otp/verify',
			{
				email,
				otp,
			},
			false
		)) as ApiResponse;

		setBtnLoading(false);
		// if otp is valid than create new user
		if (verifyOtpResponse.success) {
			const updatedUserPassword = (await patchRequest(
				'/users/reset-password',
				{
					email,
					newPassword,
				}
			)) as ApiResponse;

			// if user is created successfully than save token and hide modal
			if (updatedUserPassword.success) {
				setVerifyOtpModel(false);
			} else {
				// if something went wrong while creating user than show error and open modal
				setErrorModalMessage(updatedUserPassword.message);
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
		<section className="login-section">
			<Helmet>
				<title>Login | Shri Property</title>
				<link rel="canonical" href="https://shriproperty.com/login" />
				<meta name="description" content="Login on Shri Property" />
			</Helmet>

			<Modal open={modal} onClose={() => setModal(false)}>
				<form
					className="login-section__modal"
					onSubmit={sendOtpHandler}
				>
					<h2>Forget Password</h2>

					<AError
						title={errorModalMessage}
						open={errorModalOpen}
						setOpen={setErrorModalOpen}
					/>

					<TextField
						label="email"
						type="email"
						variant="outlined"
						className="login-section__modal-input"
						onChange={e => setEmail(e.target.value)}
						fullWidth
					/>

					<TextField
						label="New Password"
						variant="outlined"
						type="password"
						className="login-section__modal-input"
						onChange={e => setNewPassword(e.target.value)}
						fullWidth
					/>

					<BPrimary
						title="Submit"
						type="submit"
						loading={btnLoading}
					/>
				</form>
			</Modal>

			<Modal open={verifyOtpModel}>
				<form
					className="login-section__modal"
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
						className="login-section__modal-input"
						onChange={e => setOtp(e.target.value)}
						fullWidth
					/>

					<BPrimary
						title="Verify"
						type="submit"
						loading={btnLoading}
						className="model-btn"
					/>
				</form>
			</Modal>

			<div className="login-section__container">
				<img
					src="/images/illustrations/login.svg"
					alt="illustration"
					className="login-section__image"
				/>

				<form className="login-section__form" onSubmit={submitHandler}>
					<AError
						title={errorMessage}
						open={errorOpen}
						setOpen={setErrorOpen}
					/>

					<TextField
						className="login-section__input"
						label="Email"
						variant="outlined"
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						fullWidth
						required
					/>

					<TextField
						className="login-section__input"
						label="Password"
						variant="outlined"
						type="password"
						onChange={e => setPassword(e.target.value)}
						fullWidth
						required
					/>

					<p className="login-section__link">
						Don't have account <Link to="/signup">Signup</Link>
					</p>

					<p
						className="login-section__link"
						onClick={() => setModal(true)}
					>
						<span>Forgot Password?</span>
					</p>

					<BPrimary
						title="Login"
						className="login-section__btn"
						type="submit"
						loading={btnLoading}
					/>
				</form>
			</div>
		</section>
	);
};

export default Login;
