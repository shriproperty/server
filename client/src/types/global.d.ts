export {};

declare global {
	type ObjectWithAnyKeys = {
		[key: string]: string;
	};

	type ButtonTypes = 'submit' | 'reset' | 'button';

	interface ApiResponse {
		success: boolean;
		message: string;
		data: any;
	}

	interface S3File {
		url: string;
		key: string;
	}

	interface LoggedInUser {
		loaded: boolean;
		isLoggedIn: boolean;
		data: {
			_id: string;
			name: string;
			email: string;
			phone: string;
			password: string;
			properties: Property[];
			listings: Listing[];
		};
	}

	interface LoggedOutUser {
		loaded: boolean;
		isLoggedIn: boolean;
		data: {};
	}

	interface FurnishingDetails {
		ac: number;
		stove: number;
		modularKitchen: number;
		fans: number;
		fridge: number;
		light: number;
		beds: number;
		microwave: number;
		dinningTable: number;
		tv: number;
		dressingTable: number;
		tvWallPanel: number;
		wardrobe: number;
		washingMachine: number;
		geyser: number;
		curtains: number;
		sofa: number;
		waterPurifier: number;
		exhaust: number;
	}

	interface Facility {
		title: string;
		icon: string;
	}

	interface Property {
		_id: string;
		title: string;
		description: string;
		price: string;
		specialPrice: string;
		type: 'Rental' | 'Sale' | 'PG';
		category:
			| 'Residential Apartment'
			| 'Independent House/Villa'
			| 'Plot'
			| 'Commercial Office'
			| 'Serviced Apartments'
			| '1 RK/ Studio Apartment'
			| 'Independent/Builder Floor'
			| 'Other';
		security: string;
		maintenance: string;
		status: 'Unfurnished' | 'Semifurnished' | 'Furnished';
		featured: boolean;
		size: string;
		unit:
			| 'Sq. Ft.'
			| 'Acre'
			| 'Gaj'
			| 'Marla'
			| 'Bigha'
			| 'Bigha-Pucca'
			| 'Bigha-Kachha'
			| 'Biswa'
			| 'Biswa-Pucca'
			| 'Kanal'
			| 'Killa'
			| 'Kattha'
			| 'Ghumaon';
		bedroom: string;
		bathroom: string;
		kitchen: string;
		openParking: string;
		closeParking: string;
		livingRoom: string;
		store: string;
		balcony: string;
		dinningRoom: string;
		floor: string;
		poojaRoom: string;
		otherFeatured: string[];
		lobby: string;
		direction:
			| 'North'
			| 'South'
			| 'East'
			| 'West'
			| 'North-East'
			| 'North-West'
			| 'South-East'
			| 'South-West';
		purchaseType: 'New Booking' | 'Resale';
		constructionStatus: 'Ready to Move' | 'Under Construction';
		images: S3File[];
		videos: S3File[];
		documents: S3File[];
		address: string;
		location: string;
		locality: string;
		owner: string;
		ownerContact: string;
		ownerId: string | undefined;
		commission: string;
		age: string;
		possession:
			| 'Immediate'
			| 'Between 1 Month'
			| 'Between 2 Month'
			| 'Between 3 Month'
			| 'Between 6 Month'
			| '2023'
			| '2024'
			| '2025'
			| '2026'
			| '2027'
			| '2028'
			| '2029'
			| '2030';
		furnishingDetails: FurnishingDetails;
		facilities: Facility[];
		sold: boolean;
	}
	interface Listing {
		_id: string;
		title: string;
		description: string;
		price: string;
		specialPrice: string;
		type: 'Rental' | 'Sale' | 'PG';
		category:
			| 'Residential Apartment'
			| 'Independent House/Villa'
			| 'Plot'
			| 'Commercial Office'
			| 'Serviced Apartments'
			| '1 RK/ Studio Apartment'
			| 'Independent/Builder Floor'
			| 'Other';
		security: string;
		maintenance: string;
		status: 'Unfurnished' | 'Semifurnished' | 'Furnished';
		featured: boolean;
		size: string;
		unit:
			| 'Sq. Ft.'
			| 'Acre'
			| 'Gaj'
			| 'Marla'
			| 'Bigha'
			| 'Bigha-Pucca'
			| 'Bigha-Kachha'
			| 'Biswa'
			| 'Biswa-Pucca'
			| 'Kanal'
			| 'Killa'
			| 'Kattha'
			| 'Ghumaon';
		bedroom: string;
		bathroom: string;
		kitchen: string;
		openParking: string;
		closeParking: string;
		livingRoom: string;
		store: string;
		balcony: string;
		dinningRoom: string;
		floor: string;
		poojaRoom: string;
		otherFeatured: string[];
		lobby: string;
		direction:
			| 'North'
			| 'South'
			| 'East'
			| 'West'
			| 'North-East'
			| 'North-West'
			| 'South-East'
			| 'South-West';
		purchaseType: 'New Booking' | 'Resale';
		constructionStatus: 'Ready to Move' | 'Under Construction';
		images: S3File[];
		videos: S3File[];
		documents: S3File[];
		address: string;
		location: string;
		locality: string;
		owner: string;
		ownerContact: string;
		ownerId: string | undefined;
		commission: string;
		age: string;
		possession:
			| 'Immediate'
			| 'Between 1 Month'
			| 'Between 2 Month'
			| 'Between 3 Month'
			| 'Between 6 Month'
			| '2023'
			| '2024'
			| '2025'
			| '2026'
			| '2027'
			| '2028'
			| '2029'
			| '2030';
		furnishingDetails: FurnishingDetails;
		facilities: Facility[];
		sold: boolean;
	}
}
