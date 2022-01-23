import React from 'react';
import Hero from '../pages/home/hero/Hero';
import Items from '../pages/home/product/Items';
import Category from '../pages/home/category/Category';
import AddListing from '../pages/home/Listing/List';
import Form from '../pages/home/form/Form';
import Footer from '../layout/footer/Footer';

const Home = () => {
	return (
		<main>
			<Hero />
			<Items />
			<Category />
			<AddListing />
			<Form />
		</main>
	);
};

export default Home;
