import { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Nav from './components/layout/nav/Nav';
import Footer from './components/layout/footer/Footer';
import Properties from './components/pages/properties/Properties';
import TempUsers from './components/pages/admin/tempUsers/TempUsers';
import Property from './components/pages/property/Property';
import Contacts from './components/pages/admin/contacts/Contacts';
import AddProperty from './components/pages/admin/property/form/Form';
import UpdateProperty from './components/pages/admin/property/update/Update';
import UserUpdateProperty from './components/pages/updateProperty/UpdateProperty';
import Listing from './components/pages/listing/Listing';
import NotFound from './components/pages/notFound/NotFound';
import Admin from './components/pages/admin/Admin';
import Listings from './components/pages/admin/listings/Listings';
import AdminListing from './components/pages/admin/listing/Listing';
import Signup from './components/pages/signup/Signup';
import Login from './components/pages/login/Login';
import AllImages from './components/pages/allimages/Images';
import Account from './components/pages/account/Account';
import get from './api/get';
import Hero from './components/pages/home/hero/Hero';
import PropertiesSection from './components/pages/home/properties/Properties';
import Category from './components/pages/home/category/Category';
import ListingSection from './components/pages/home/listing/Listing';
import Form from './components/pages/home/form/Form';

import './app.scss';

const App = () => {
	const [submit, setSubmit] = useState(false);

	return (
		<>
			<CssBaseline />
			<Router>
				<Routes>
					<Route
						path="/thisissomethingrandomwhichnoonecanthinkabout/"
						element={
							<Admin submit={submit} setSubmit={setSubmit} />
						}
					/>

					<Route
						path="/thisissomethingrandomwhichnoonecanthinkabout/temp-users"
						element={<TempUsers />}
					/>

					<Route
						path="/thisissomethingrandomwhichnoonecanthinkabout/property/add"
						element={<AddProperty />}
					/>

					<Route
						path="/thisissomethingrandomwhichnoonecanthinkabout/property/update/:id"
						element={<UpdateProperty />}
					/>

					<Route
						path="/thisissomethingrandomwhichnoonecanthinkabout/contacts"
						element={<Contacts />}
					/>
					<Route
						path="/thisissomethingrandomwhichnoonecanthinkabout/listings"
						element={<Listings />}
					/>
					<Route
						path="/thisissomethingrandomwhichnoonecanthinkabout/listings/:id"
						element={<AdminListing />}
					/>
					<Route path="*" element={<UserRoutes />} />
				</Routes>
			</Router>
		</>
	);
};

// created a different router to hide navbar in admin routes
const UserRoutes = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [authFormSubmit, setAuthFormSubmit] = useState(false);

	useEffect(() => {
		get('/auth/is-logged-in').then(res => {
			setIsLoggedIn(res.success);
			setAuthFormSubmit(false);
		});
	}, [authFormSubmit]);

	return (
		<>
			<Nav isLoggedIn={isLoggedIn} />
			<Routes>
				<Route
					path="/"
					element={
						<main>
							<Hero />
							<PropertiesSection />
							<Category />
							<ListingSection />
							<Form />
						</main>
					}
				/>
				<Route path="/properties" element={<Properties />} />
				<Route path="/properties/:id" element={<Property />} />
				<Route
					path="/listing"
					element={<Listing isLoggedIn={isLoggedIn} />}
				/>
				<Route path="/allimages/:id" element={<AllImages />} />

				<Route
					path="/signup"
					element={<Signup setAuthFormSubmit={setAuthFormSubmit} />}
				/>

				<Route
					path="/login"
					element={<Login setAuthFormSubmit={setAuthFormSubmit} />}
				/>

				<Route
					path="/account"
					element={<Account isLoggedIn={isLoggedIn} />}
				/>
				<Route path="/allimages" element={<AllImages />} />
				<Route
					path="/property/update/:id"
					element={<UserUpdateProperty />}
				/>
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate replace to="/404" />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
