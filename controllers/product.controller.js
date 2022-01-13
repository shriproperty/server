/* ----------------------------- create product ----------------------------- */
export const createProduct = async (req, res) => {
	try {
	} catch (err) {
		res.status(400).json({
			success: false,
			message: err.message,
			data: {},
		});
	}
};
