import React from 'react';
import Hero from '../pages/home/hero/Hero';
import Items from '../pages/home/product-page/Items';
import Category from '../pages/home/category/Category';
import Form from '../pages/home/sellerForm/Form';

const Home = () => {
	return (
		<main>
			<Hero />
            <Items />
            <Category />
            <Form />
		</main>
	);
};

export default Home;
