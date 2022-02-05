import './footer.scss';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
	return (
		<footer>
			<div className="footer-content">
				<div className="footer-content__left">
					<h1>About</h1>
					<p>
						WpResidence is committed to delivering a high level of
						expertise, customer service, and attention to detail to
						the marketing and sales of luxury real estate, and
						rental properties.
					</p>
					<p className="secondChild">
						Since 2013, we have developed powerful and fast real
						estate themes for businesses who need a reliable and
						extremely versatile product.
					</p>
					<div className="footer-content__left-social">
						<a href="https://www.facebook.com/">
							<FacebookIcon />
						</a>
						<a href="https://www.facebook.com/">
							<YouTubeIcon />
						</a>
						<a href="https://www.facebook.com/">
							<InstagramIcon />
						</a>
					</div>
				</div>
				<div className="footer-content__centre">
					<h1>Contact</h1>
					<div className="addr">
						<div className="addr__icon"></div>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Laudantium dicta, quas molestias alias
							reiciendis quasi.
						</p>
					</div>
					<div className="phone">
						<div className="phone__icon"></div>
						<p className="phone__number">+91 9501478900</p>
					</div>
					<div className="email">
						<div className="email__icon"></div>
						<p>shriproperty9.com</p>
					</div>
				</div>
				<div className="footer-content__right">
					<h1>Latest Listing</h1>
					<div className="latest-news">
						<div className="latest-news__item">
							<div className="latest-news__item-img"></div>
							<div className="latest-news__item-content">
								<h2>lorem</h2>
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing
								</p>
								<h3>$5000</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
