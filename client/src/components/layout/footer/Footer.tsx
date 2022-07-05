import './footer.scss';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { FC } from 'react';

const Footer: FC = () => {
	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="footer-content__left">
					<h1>About</h1>
					<p>
						Shri Property is committed to delivering a high level of
						expertise, customer service, and attention to detail to
						the marketing and sales of real estate, and rental
						properties.
					</p>
					<div className="footer-content__left-social">
						<a
							href="https://www.facebook.com/ShriiProperty"
							target="_blank"
							rel="noreferrer"
						>
							<FacebookIcon />
						</a>
					</div>
				</div>

				<div className="footer-content__centre">
					<h1>Contact</h1>
					<div className="footer-content__contact addr">
						<div className="addr__icon">
							<LocationOnIcon />
						</div>
						<p>Sector 70, Mohali, Punjab</p>
					</div>
					<div className="footer-content__contact phone">
						<div className="phone__icon">
							<PhoneIcon />
						</div>
						<p className="phone__number">+91 9465663009</p>
					</div>
					<div className="footer-content__contact email">
						<div className="email__icon">
							<EmailIcon />
						</div>
						<p>shriproperty9@gmail.com</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
