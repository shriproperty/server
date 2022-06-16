/**
 * make get request
 * @param {string} url url from request is to be made
 */
const getRequest = async (url: string) => {
	const apiKey = process.env.REACT_APP_API_KEY as string;

	const res = await fetch(`/api${url}`, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'x-api-key': apiKey,
		},
	});

	if (!res.ok) throw new Error(res.statusText);

	return res.json();
};

export default getRequest;
