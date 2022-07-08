import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BPrimary } from '../../../../components/util/button/Button';

import './hero.scss';

const Hero: FC = () => {
	return (
		<section className="hero-section">
			<div className="hero-section__heading">
				Live in your <span>Dreams</span>
			</div>

			<p className="hero-section__para">
				We are recognized for exceeding client expectations and
				delivering great results through dedication, ease of process,
				and extraordinary services.
			</p>

			<Link to="/properties" className="hero-section__link">
				<BPrimary title="Explore more" type="submit" />
			</Link>
		</section>
	);
};

export default Hero;
