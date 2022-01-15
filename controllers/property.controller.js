import Property from '../models/property.model.js';

/* ----------------------------- create product ----------------------------- */
export const createProduct = async (req, res) => {
	try {
		const {
			title,
			description,
			price,
			specialPrice,
			type,
			catagory,
			status,
			size,
			unit,
			featured,
			bedroom,
			bathroom,
			parking,
			kitchen,
			otherFeatures,
			address,
		} = req.body;

		// validate user input
		if (
			!title ||
			!description ||
			!price ||
			!type ||
			!catagory ||
			!size ||
			!unit ||
			!address
		) {
			return res.status(400).json({
				success: false,
				message:
					'Title, Description, Price, Type, Catagory, Size, Unit, Address are required',
			});
		}

		// validate type
		if (type !== 'Rental' && type !== 'Sale') {
			return res.status(400).json({
				success: false,
				message: 'Type must be either Rental or Sale',
				data: {},
			});
		}

		// validate catagory
		if (
			catagory !== 'Residential Apartment' &&
			catagory !== 'Independent House/Villa' &&
			catagory !== 'Plot' &&
			catagory !== 'Commercial Office' &&
			catagory !== 'Serviced Apartments' &&
			catagory !== '1 RK/ Studio Apartment' &&
			catagory !== 'Independent/Builder Floor' &&
			catagory !== 'Other'
		) {
			return res.status(400).json({
				success: false,
				message:
					'Catagory can only be one of the following: Residential Apartment, Independent House/Villa, Plot, Commercial Office, Serviced Apartments, 1 RK/ Studio Apartment, Independent/Builder Floor, Other',
				data: {},
			});
		}

		// validate status
		if (
			status !== 'Unfurnished' &&
			status !== 'Semifurnished' &&
			status !== 'Furnished' &&
			status !== null
		) {
			return res.status(400).json({
				success: false,
				message:
					'Status can only be one of the following: Unfurnished, Semifurnished, Furnished, null',
				data: {},
			});
		}
	} catch (err) {
		//TODO: update these error messages

		res.status(400).json({
			success: false,
			message: err.message,
			data: {},
		});
	}
};
