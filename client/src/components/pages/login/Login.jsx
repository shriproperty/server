import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { post } from '../../../api/post';
import { BPrimary } from '../../util/button/Button';
import { AError } from '../../../components/util/alert/Alert';

import './login.scss';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorOpen, setErrorOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [btnLoading, setBtnLoading] = useState(false);

	return (
		<section className="login-section">
			<div className="login-section__container">
				<img
					src="/images/illustrations/login.svg"
					alt="illustration"
					className="login-section__image"
				/>

				<form className="login-section__form">
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