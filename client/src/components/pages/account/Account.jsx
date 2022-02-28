/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './account.scss';
const Account = ({ isLoggedIn }) => {
	const navigate = useNavigate();

	useEffect(() => {
		!isLoggedIn && navigate('/login');
	}, [isLoggedIn]);

	return <section>Account</section>;
};

export default Account;
