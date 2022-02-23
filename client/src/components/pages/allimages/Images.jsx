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
	}, [id]);
	console.log(response);
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
						<img
							src={response.images[0]?.url}
							alt="property"
							className="image"
						/>
					)}

					{response.images.map(img => (
						<img
							key={img.key}
							src={img.url}
							className="image"
							alt="property"
						/>
					))}
				</div>
			)}
		</section>
	);
};

export default Images;
