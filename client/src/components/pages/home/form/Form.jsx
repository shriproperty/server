import React from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { BPrimary } from '../../../util/button/Button';
import './form.scss';

const Form = () => {
	return (
		<div className="form-container">
			<h1 className="main-head">
				Contact us today if you'd like to know more about what our real
				estate services
			</h1>

			<form action="#" method="post" className="form">
				<div className="form-elem-div">
					<div className="form__name">
						<div className="form__elem">
							<TextField
								required
								id="outlined-required"
								label="First Name"
								margin="normal"
								fullWidth
								variant="outlined"
							/>
						</div>
						<div className="form__elem">
							<TextField
								label="Last Name"
								margin="normal"
								fullWidth
							/>
						</div>
					</div>
					<div className="form__elem">
						<TextField
							required
							id="outlined-required"
							label="Email"
							margin="normal"
							fullWidth
						/>
					</div>
					<div className="form__elem">
						<TextField
							id="outlined-multiline-flexible"
							label="Message"
							fullWidth
							multiline
							margin="normal"
							rows={10}
						/>
					</div>
					<Link to="#" className="form__elem">
						<BPrimary
							title="Submit"
							className="btn"
							type="submit"
						/>
					</Link>
				</div>
				<div className="illustration"></div>
			</form>
		</div>
	);
};

export default Form;
