import React from 'react';
import './Hero.scss';
import { Link } from 'react-router-dom';
import {BPrimary} from '../../../util/button/Button';

const Hero = () => {
	return (
		<section className="hero-img">
			<div className="hero">
				<div className="hero__main">
					Live in your <span className="underline">Dreams</span>
				</div>
				<div className="hero__sub">
					<h3>
						We are recognized for exceeding client expectations and
						delivering great results through dedication, ease of
						process, and extraordinary services.
					</h3>
				</div>
				<Link to="#">
					<BPrimary
						title="Explore"
						className="hero__explore-btn"
						type="submit"
					/>
				</Link>
			</div>
		</section>
	);
};

export default Hero;
