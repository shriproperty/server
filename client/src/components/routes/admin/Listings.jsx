import { useState } from 'react';
import List from '../../pages/admin/listings/Listings';

const Listings = () => {
	const [submit, setSubmit] = useState(false);

	return (
		<main>
			<List submit={submit} setSubmit={setSubmit} />
		</main>
	);
};

export default Listings;
