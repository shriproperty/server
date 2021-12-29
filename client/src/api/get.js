/**
 * make get request
 * @param {string} url url from requrest is to be made
 * @return {Promise<object>} response from the server
 */
const get = async url => {
	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'x-api-key': process.env.REACT_APP_API_KEY,
		},
	});

	if (res.status === 200) {
		return res.json();
	}

	return res;
};

export default get;
