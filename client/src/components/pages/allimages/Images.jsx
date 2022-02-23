import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import get from '../../../api/get';
import post from '../../../api/post';

const Images = () => {
	const { id } = useParams();
	const [response, setResponse] = useState({});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		get(`/properties/single/${id}`)
			.then(data => {
				setResponse(data.data);
				setLoading(false);
			})
			.catch(() => {
				navigate('/404');
			});
	}, [id]);
	return (
		<div>hello
			<img
				src={response.images[0]}
				alt="property"
			/>
            hello
		</div>
	);
};

export default Images;
