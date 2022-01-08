import React from 'react';
import Hero from '../pages/home/hero/Hero';
import Items from '../pages/home/product-page/Items';
import Category from '../pages/home/category/Category';
const Home = () => {
	return (
		<main>
			<Hero />
            <Items />
            <Category/>
		</main>
	);
};

export default Home;
