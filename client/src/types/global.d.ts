export {};

declare global {
	type ObjectWithAnyKeys = {
		[key: string]: string;
	};

	type ButtonTypes = 'submit' | 'reset' | 'button';

	type ApiResponse =
		| ObjectWithAnyKeys
		| {
				success: boolean;
				message: string;
				data: any;
				maxPrice?: any;
				minPrice?: any;
		  };

	interface S3File {
		url: string;
		key: string;
	}

	interface Filters {
		title?: string;
		type?: string;
		category?: string;
		featured?: string;
		price?: number;
	}

	interface LoggedInUser {
		update: boolean;
		setUpdate(updateState: boolean): any;
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
		type: string;
		category: string;
		security: string;
		maintenance: string;
		status: string;
		featured: boolean;
		size: string;
		unit: string;
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
		otherFeatures: string[];
		lobby: string;
		direction: string;
		purchaseType: string;
		constructionStatus: string;
		images: S3File[];
		videos: S3File[];
		documents: S3File[];
		address: string;
		location: string;
		locality: string;
		owner: string;
		ownerContact: string;
		ownerId?: string;
		commission: string;
		age: string;
		possession: string;
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
		type: string;
		category: string;
		security: string;
		maintenance: string;
		status: string;
		featured: boolean;
		size: string;
		unit: string;
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
		otherFeatures: string[];
		lobby: string;
		direction: string;
		purchaseType: string;
		constructionStatus: string;
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
		possession: string;
		furnishingDetails: FurnishingDetails;
		facilities: Facility[];
		sold: boolean;
	}

	interface Contact {
		_id: string;
		name: string;
		email: string;
		phone: string;
		status: 'Pending' | 'In Progress' | 'Completed';
		subject: string;
		message: string;
	}
}
