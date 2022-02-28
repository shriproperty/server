import propTypes from 'prop-types';
import { HPrimary } from '../../util/typography/Typography';
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
