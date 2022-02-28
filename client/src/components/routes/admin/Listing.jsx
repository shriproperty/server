import Form from '../../pages/admin/listing/Listing';

const Listing = ({ isLoggedIn }) => {
	return (
		<main>
			<Form isLoggedIn={isLoggedIn} />
		</main>
	);
};

export default Listing;
