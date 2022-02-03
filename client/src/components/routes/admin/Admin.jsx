import React, { useState } from 'react';
import AdminPage from '../../pages/admin/Admin';

const Admin = () => {
	const [submit, setSubmit] = useState(false);

	return (
		<main>
			<AdminPage submit={submit} setSubmit={setSubmit} />
		</main>
	);
};

export default Admin;
