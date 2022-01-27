import React from 'react';
import Hero from '../pages/home/hero/Hero';
import Properties from '../pages/home/properties/Properties';
import Category from '../pages/home/category/Category';
import Listing from '../pages/home/listing/Listing';
import Form from '../pages/home/form/Form';

const Home = () => {
	return (
		<main>
			<Hero />
			<Properties />
			<Category />
			<Listing />
			<Form />
		</main>
	);
};

export default Home;
