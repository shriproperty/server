/**
 * make get request
 * @param {string} url url from requrest is to be made
 * @return {Promise<object>} response from the server
 */
const getRequest = async url => {
	const res = await fetch(`/api${url}`, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'x-api-key': process.env.REACT_APP_API_KEY,
		},
	});

	if (res.ok === false) throw new Error(res.statusText);

	return res.json();
};

export default getRequest;
