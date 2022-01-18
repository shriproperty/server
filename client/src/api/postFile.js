/**
 * post files and data
 * @param {string} url Url to post
 * @param {object} body Body to post
 * @return {Promise<object>} response from the server
 */
const postFile = async (url, body) => {
	const res = await fetch(`/api${url}`, {
		method: 'POST',
		headers: {
			'x-api-key': process.env.REACT_APP_API_KEY,
		},
		body: body,
	});

	return res.json();
};

export default postFile;
