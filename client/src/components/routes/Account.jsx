import React from 'react';
import Page from '../pages/account/Account';

const Account = ({ isLoggedIn }) => {
	return (
		<main>
			<Page isLoggedIn={isLoggedIn} />
		</main>
	);
};

export default Account;
