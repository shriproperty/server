import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { BPrimary } from '../../../util/button/Button';
import { HPrimary } from '../../../util/typography/Typography';
import { ASuccess, AError } from '../../../util/alert/Alert';
import { post } from '../../../../api/post';

import './form.scss';

const Form = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [openSuccess, setOpenSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [openError, setOpenError] = useState(false);
	const [loading, setLoading] = useState(false);

	const submitHandler = e => {
		e.preventDefault();
		setLoading(true);

		post('/contacts/add', {
			name,
			email,
			phone,
			subject,
			message,
		}).then(res => {
			setLoading(false);

			if (res.success === true) {
				setSuccessMessage(res.message);
				setOpenSuccess(true);
			} else {
				setErrorMessage(res.message);
				setOpenError(true);
			}
		});
	};

	return (
		<section className="form-section" id="form-section">
			<HPrimary
				className="form-section__heading"
				title="Contact us today if you'd like to know more about what our real estate services"
			/>

			<form className="form-section__form" onSubmit={submitHandler}>
				<div className="form-section__image">
					<img
						src="/images/illustrations/mailbox.svg"
						alt="illustration"
					/>
				</div>
				<div className="form-section__inputs">
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
						className="form-section__input"
						label="Name"
						variant="outlined"
						onChange={e => setName(e.target.value)}
						required
						fullWidth
					/>

					<TextField
						className="form-section__input"
						label="Email"
						onChange={e => setEmail(e.target.value)}
						required
						fullWidth
					/>

					<TextField
						className="form-section__input"
						label="Phone"
						type="number"
						onChange={e => setPhone(e.target.value)}
						required
						fullWidth
					/>

					<TextField
						className="form-section__input"
						label="Subject"
						onChange={e => setSubject(e.target.value)}
						required
						fullWidth
					/>

					<TextField
						label="Message"
						className="form-section__input"
						rows={10}
						onChange={e => setMessage(e.target.value)}
						required
						fullWidth
						multiline
					/>

					<BPrimary
						title="Submit"
						className="form-section__btn"
						type="submit"
						loading={loading}
					/>
				</div>
			</form>
		</section>
	);
};

export default Form;
