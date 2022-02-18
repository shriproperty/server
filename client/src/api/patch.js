/**
 * make patch request
 * @param {string} url url from request is to be made
 * @param {object} body body to send
 * @return {Promise<object>} response from the server
 */
export const patchRequest = async (url, body) => {
	const res = await fetch(`/api${url}`, {
		method: 'PATCH',
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
 * patch files and data
 * @param {string} url Url to post
 * @param {object} body Body to post
 * @return {Promise<object>} response from the server
 */
export const patchFile = async (url, body) => {
	const res = await fetch(`/api${url}`, {
		method: 'PATCH',
		headers: {
			'x-api-key': process.env.REACT_APP_API_KEY,
		},
		body: body,
	});

	return res.json();
};
