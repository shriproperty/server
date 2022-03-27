import propTypes from 'prop-types';
import { HPrimary } from '../../util/typography/Typography';
import { Helmet } from 'react-helmet-async';
import './notFound.scss';

/**
 * Not Found component
 * @param {boolean} comingSoon if `true` then show coming soon image
 * @return {JSX.Element} Component
 */
const NotFound = ({ comingSoon }) => {
	return (
		<section className="notFound-section">
			{comingSoon ? (
				<>
					<img
						src="/images/illustrations/coming-soon.svg"
						alt="page not found"
					/>

					<HPrimary
						title="Coming Soon"
						className="notFound-section__heading"
					/>
				</>
			) : (
				<>
					<Helmet>
						<title>404 | Shri Property</title>
						<link
							rel="canonical"
							href="https://shriproperty.com/404"
						/>
						<meta
							name="description"
							content="The Url you have visited is no longer valid"
						/>
					</Helmet>

					<img
						src="/images/illustrations/page-not-found.svg"
						alt="page not found"
					/>

					<HPrimary
						title="Page Not Found"
						className="notFound-section__heading"
					/>
				</>
			)}
		</section>
	);
};

NotFound.propTypes = {
	comingSoon: propTypes.bool,
};

export default NotFound;
