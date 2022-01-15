import React from 'react';
import './footer.scss';

const Footer = () => {
	return (
		<div>
			<div className="footer-container">
				<div className="footer-content">
					<div className="footer-content__left">
						<h1 className="footer-content__left-head">About</h1>
						<h2 className="footer-content__left-description">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Voluptas debitis nostrum, aliquid placeat ut
							aut officia incidunt, fuga ad adipisci eum sed qui
							corporis amet, tenetur voluptatem! Doloremque quia
							quibusdam totam in illo nostrum enim nisi, tempora
							debitis, cumque laboriosam? Voluptates distinctio
							veritatis incidunt modi.
						</h2>
						<div className="footer-content__left-social">
							<a href="https://www.facebook.com/">facebook</a>
							<a href="https://www.facebook.com/">Youtube</a>
							<a href="https://www.facebook.com/">Instagram</a>
						</div>
					</div>
					<div className="footer-content__centre">
						<h1>Contact</h1>
						<div className="addr">
							<div className="addr__icon"></div>
							<p>
								Lorem ipsum dolor sit amet consectetur,
								adipisicing elit. Laudantium dicta, quas
								molestias alias reiciendis quasi.
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
                        <h1>Latest</h1>
                        <div className="latest-news"></div>
                    </div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
