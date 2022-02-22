import { TextField } from '@mui/material';
import { BPrimary } from '../../util/button/Button';

import './signup.scss';

const Signup = () => {
	return (
		<section className="signup-section">
			<div className="signup-section__container">
				<img
					src="/images/illustrations/signup.svg"
					alt="illustration"
					className="signup-section__image"
				/>

				<form className="signup-section__form">
					<TextField
						className="signup-section__input"
						label="Name"
						variant="outlined"
						fullWidth
					/>

					<TextField
						className="signup-section__input"
						label="Email"
						variant="outlined"
						fullWidth
					/>

					<TextField
						className="signup-section__input"
						label="Phone"
						variant="outlined"
						fullWidth
					/>

					<TextField
						className="signup-section__input"
						label="Password"
						variant="outlined"
						fullWidth
					/>

					<TextField
						className="signup-section__input"
						label="Confirm Password"
						variant="outlined"
						fullWidth
					/>

					<BPrimary title="submit" className='signup-section__btn' />
				</form>
			</div>
		</section>
	);
};

export default Signup;
