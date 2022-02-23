import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import get from '../../../api/get';
import Loader from '../../util/loader/Loader';
import './images.scss';

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<section>
			{loading ? (
				<Loader fullScreen />
			) : (
				<div className="container">
					{response.videos.length > 0 ? (
						<video controls autoPlay muted loop>
							<source
								src={response.videos[0]?.url}
								type="video/mp4"
							/>
							there is no video :(
						</video>
					) : (
						console.log('hi')
					)}

					{response.images.map(img => (
						<div className="image-container">
							<img
								key={img.key}
								src={img.url}
								className="image"
								alt="property"
							/>
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export default Images;
