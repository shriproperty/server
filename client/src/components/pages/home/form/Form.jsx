import React from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { BPrimary } from '../../../util/button/Button';
import { HPrimary } from '../../../util/typography/Typography';
import './form.scss';

const Form = () => {
	return (
		<section className="form-section">
			<HPrimary
				className="form-section__heading"
				title="Contact us today if you'd like to know more about what our real estate services"
			/>

			<form action="#" method="post" className="form-section__form">
				<div className="form-section__image">
					<img
						src="/images/illustrations/mailbox.svg"
						alt="illustration"
					/>
				</div>
				<div className="form-section__inputs">
					<div className="form-section__form-name-inputs">
						<TextField
							required
							className="form-section__input"
							label="First Name"
							variant="outlined"
						/>
						<TextField
							label="Last Name"
							variant="outlined"
							required
							className="form-section__input"
						/>
					</div>

					<TextField
						required
						className="form-section__input"
						label="Email"
						fullWidth
					/>

					<TextField
						label="Message"
						className="form-section__input"
						required
						fullWidth
						multiline
						rows={10}
					/>
					<BPrimary
						title="Submit"
						className="form-section__btn"
						type="submit"
					/>
				</div>
			</form>
		</section>
	);
};

export default Form;
