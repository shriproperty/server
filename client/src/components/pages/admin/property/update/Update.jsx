import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../../../util/loader/Loader';
import get from '../../../../../api/get';
import { TextField } from '@mui/material';

const Update = () => {
	const { id } = useParams();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [specialPrice, setSpecialPrice] = useState('');
	const [status, setStatus] = useState('');
	const [featured, setFeatured] = useState(false);
	const [otherFeatures, setOtherFeatures] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		get(`/properties/single/${id}`).then(res => {
			const data = res.data;

			setTitle(data.title);
			setDescription(data.description);
			setPrice(data.price);
			setSpecialPrice(data.specialPrice);
			setStatus(data.status);
			setFeatured(data.featured);
			setOtherFeatures(data.otherFeatures);
			setLoading(false);
		});
	}, [id]);

	return (
		<section>
			{loading ? (
				<Loader fullScreen />
			) : (
				<form className="property-update-from">
					<TextField
						label="Title"
						variant="outlined"
						className="property-update-form__input"
						value={title}
						onChange={e => setTitle(e.target.value)}
						fullWidth
					/>

					<TextField
						label="Description"
						variant="outlined"
						className="property-update-form__input"
						value={description}
						onChange={e => setDescription(e.target.value)}
						fullWidth
					/>

					<TextField
						label="Price"
						variant="outlined"
						className="property-update-form__input"
						value={price}
						onChange={e => setPrice(e.target.value)}
					/>

					<TextField
						label="Special Price"
						variant="outlined"
						className="property-update-form__input"
						value={specialPrice}
						onChange={e => setSpecialPrice(e.target.value)}
					/>
				</form>
			)}
		</section>
	);
};

export default Update;
