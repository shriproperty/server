/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import get from '../../../api/get';

import './account.scss';
const Account = ({ isLoggedIn }) => {
	const navigate = useNavigate();
	const [response, setResponse] = useState({});

	useEffect(() => {
		get('/users/decode').then(res => {
			get(
				`/users/single/${res.data.id}?listings=true&properties=false`
			).then(data => {
				setResponse(data.data);
			});
		});
	}, []);

	return (
		<section>
			<h1 className="main-heading">MyAccount</h1>
		</section>
	);
};

export default Account;
