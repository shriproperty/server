/**
 * make post request
 * @param {string} url url from requrest is to be made
 * @param {object} body body to send
 * @return {Promise<object>} response from the server
 */
const patchRequest = async (url, body) => {
	const res = await fetch(`/api${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'x-api-key': process.env.REACT_APP_API_KEY,
		},
		body: JSON.stringify(body),
	});

	return res.json();
};

export default patchRequest;
