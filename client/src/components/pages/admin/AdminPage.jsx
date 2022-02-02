import React from 'react';
import { BPrimary } from '../../util/button/Button';
import { Link } from 'react-router-dom';

const AdminPage = () => {
	return (
		<div>
			<h1 style={{ padding: '5rem' }}>Admin Page</h1>
			<Link to="/admin/Contacts">
				<BPrimary title="Contacts" style={{ margin: '0 5rem' }} />
			</Link>
			<Link to="/admin/Property">
				<BPrimary title="Property" />
			</Link>
		</div>
	);
};

export default AdminPage;
