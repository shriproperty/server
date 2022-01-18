/**
 * make delete request
 * @param {string} url url from requrest is to be made
 * @return {Promise<object>} response from the server
 */
const deleteRequest = async url => {
	const res = await fetch(`/api${url}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'x-api-key': process.env.REACT_APP_API_KEY,
		},
	});

	return res.json();
};

export default deleteRequest;
