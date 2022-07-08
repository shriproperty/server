import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import get from '../../../api/get';
import { fakeProperty } from '../../../helpers/fakeData';
import Loader from '../../../components/util/loader/Loader';
import './images.scss';

const Images: FC = () => {
	const { id } = useParams();
	const [response, setResponse] = useState<Property>(fakeProperty);
	const [loading, setLoading] = useState(true);
	const [mainImgUrl, setMainImgUrl] = useState({ type: '', url: '' });
	const navigate = useNavigate();

	useEffect(() => {
		get(`/properties/single/${id}`)
			.then((data: any) => {
				setResponse(data.data);
				data.data.videos.length > 0
					? setMainImgUrl({
							type: 'video',
							url: data.data.videos[0].url,
					  })
					: setMainImgUrl({
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
			<Helmet>
				<title>All Images | Shri Property</title>
				<link
					rel="canonical"
					href="https://shriproperty.com/allimages/"
				/>
				<meta
					name="description"
					content="See all images and videos of property"
				/>
			</Helmet>

			<section className="allImages-section">
				{loading ? (
					<Loader fullScreen />
				) : (
					<>
						<div className="allImages-section__main">
							{mainImgUrl.type === 'video' ? (
								<video controls>
									<source
										width="auto"
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
									key={video.key}
									onClick={e =>
										setMainImgUrl({
											type: 'video',
											url: video.url,
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
											url: image.url,
										})
									}
								/>
							))}
						</div>
					</>
				)}
			</section>
		</main>
	);
};

export default Images;
