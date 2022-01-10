import React from 'react';
import Hero from '../pages/home/hero/Hero';
import Items from '../pages/home/product-page/Items';
import Category from '../pages/home/category/Category';
import AddListing from '../pages/home/Listing/List';

const Home = () => {
	return (
		<main>
			<Hero />
            <Items />
            <Category />
            <AddListing />
		</main>
	);
};

export default Home;
