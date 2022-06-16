/**
 * make post request
 * @param {string} url url from request is to be made
 * @param {boolean} file if you are uploading file with this function than set `file` to `true`
 * @param {object} body body to send
 */
const postRequest = async (url: string, body: any, file: boolean) => {
	const apiKey = process.env.REACT_APP_API_KEY as string;

	const res = await fetch(`/api${url}`, {
		method: 'POST',
		headers: file
			? {
					'x-api-key': apiKey,
			  }
			: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'x-api-key': apiKey,
			  },
		body: JSON.stringify(body),
	});

	return res.json();
};

export default postRequest;
