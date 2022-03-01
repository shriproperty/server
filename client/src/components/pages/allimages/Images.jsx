import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import get from '../../../api/get';
import Loader from '../../util/loader/Loader';
import './images.scss';

const Images = () => {
	const { id } = useParams();
	const [response, setResponse] = useState({});
	const [loading, setLoading] = useState(true);
	const [mainImgUrl, setMainImgUrl] = useState({ type: '', url: '' });
	const navigate = useNavigate();

	useEffect(() => {
		get(`/properties/single/${id}`)
			.then(data => {
				setResponse(data.data);
				if (data.data.videos.length > 0)
					setMainImgUrl({
						type: 'video',
						url: data.data.videos[0].url,
					});
				else
					setMainImgUrl({
						type: 'image',
						url: data.data.images[0].url,
					});
				setLoading(false);
			})
			.catch(() => {
				navigate('/404');
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<main>
			<section className="allImages-section">
				{loading ? (
					<Loader fullScreen />
				) : (
					<>
						<div className="allImages-section__main">
							{mainImgUrl.type === 'video' ? (
								<video controls autoPlay muted loop>
									<source
										src={mainImgUrl.url}
										type="video/mp4"
									/>
									there is no video :(
								</video>
							) : (
								<img
									src={mainImgUrl.url}
									alt="main"
									className="image"
									id="main-image"
								/>
							)}
						</div>

						<div className="allImages-section__others">
							{response.videos.map(video => (
								<video
									autoPlay
									muted
									loop
									onClick={e =>
										setMainImgUrl({
											type: 'video',
											url: e.target.children[0].src,
										})
									}
								>
									<source src={video.url} type="video/mp4" />
									there is no video :(
								</video>
							))}

							{response.images.map(image => (
								<img
									src={image.url}
									alt="property"
									key={image.key}
									onClick={e =>
										setMainImgUrl({
											type: 'image',
											url: e.target.src,
										})
									}
								/>
							))}
						</div>

						{/* {response.videos.length > 0 && (
							<video controls autoPlay muted loop>
								<source
									src={response.videos[0]?.url}
									type="video/mp4"
								/>
								there is no video :(
							</video>
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
						))} */}
					</>
				)}
			</section>
		</main>
	);
};

export default Images;
