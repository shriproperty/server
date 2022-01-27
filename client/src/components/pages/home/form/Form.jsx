import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
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
					<TextField
						required
						className="form-section__input"
						label="Name"
						fullWidth
						variant="outlined"
					/>

					<TextField
						required
						className="form-section__input"
						label="Email"
						fullWidth
					/>

					<TextField
						required
						className="form-section__input"
						label="Phone"
						type="number"
						fullWidth
					/>

					<TextField
						required
						className="form-section__input"
						label="Subject"
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
