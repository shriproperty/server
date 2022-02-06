/**
 * make post request
 * @param {string} url url from requrest is to be made
 * @param {object} body body to send
 * @return {Promise<object>} response from the server
 */
export const post = async (url, body) => {
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

/**
 * post files and data
 * @param {string} url Url to post
 * @param {object} body Body to post
 * @return {Promise<object>} response from the server
 */
export const postFile = async (url, body) => {
	const res = await fetch(`/api${url}`, {
		method: 'POST',
		headers: {
			'x-api-key': process.env.REACT_APP_API_KEY,
		},
		body: body,
	});

	return res.json();
};
