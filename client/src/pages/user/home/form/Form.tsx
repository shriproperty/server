import { FC, FormEvent, FormEventHandler, useState } from 'react';
import TextField from '@mui/material/TextField';
import { BPrimary } from '../../../../components/util/button/Button';
import { HPrimary } from '../../../../components/util/typography/Typography';
import { ASuccess, AError } from '../../../../components/util/alert/Alert';
import postRequest from '../../../../api/post';

import './form.scss';

const Form: FC = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
	});
	const [successMessage, setSuccessMessage] = useState('');
	const [openSuccess, setOpenSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [openError, setOpenError] = useState(false);
	const [loading, setLoading] = useState(false);

	const submitHandler: FormEventHandler = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);

		if (formData.phone.length !== 10) {
			setErrorMessage('Phone number must be 10 digits');
			setOpenError(true);
			setLoading(false);
			return;
		}

		if (formData.name.length < 3 || formData.name.length > 30) {
			setErrorMessage('Name must be between 3 and 30 characters');
			setOpenError(true);
			setLoading(false);
			return;
		}

		if (formData.subject.length > 200) {
			setErrorMessage('Subject must be less than 200 characters');
			setOpenError(true);
			setLoading(false);
			return;
		}

		if (formData.message.length > 1000) {
			setErrorMessage('Message must be less than 1000 characters');
			setOpenError(true);
			setLoading(false);
			return;
		}

		const res = (await postRequest(
			'/contacts/add',
			formData,
			false
		)) as ApiResponse;

		setLoading(false);

		if (res.success === true) {
			setSuccessMessage(res.message);
			setOpenSuccess(true);

			setFormData({
				name: '',
				email: '',
				phone: '',
				subject: '',
				message: '',
			});
		} else {
			setErrorMessage(res.message);
			setOpenError(true);
		}
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
						onChange={e =>
							setFormData({ ...formData, name: e.target.value })
						}
						value={formData.name}
						required
						fullWidth
					/>

					<TextField
						className="form-section__input"
						label="Email"
						onChange={e =>
							setFormData({ ...formData, email: e.target.value })
						}
						value={formData.email}
						required
						fullWidth
					/>

					<TextField
						className="form-section__input"
						label="Phone"
						type="number"
						onChange={e =>
							setFormData({ ...formData, phone: e.target.value })
						}
						value={formData.phone}
						required
						fullWidth
					/>

					<TextField
						className="form-section__input"
						label="Subject"
						onChange={e =>
							setFormData({
								...formData,
								subject: e.target.value,
							})
						}
						value={formData.subject}
						required
						fullWidth
					/>

					<TextField
						label="Message"
						className="form-section__input"
						rows={10}
						onChange={e =>
							setFormData({
								...formData,
								message: e.target.value,
							})
						}
						value={formData.message}
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
