import React from 'react';
import Form from '../pages/login/Login';

const Login = ({ setAuthFormSubmit }) => {
	return (
		<main>
			<Form setAuthFormSubmit={setAuthFormSubmit} />
		</main>
	);
};

export default Login;
