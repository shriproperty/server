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
import Home from './components/routes/Home';
import Properties from './components/routes/Properties';
import TempUsers from './components/routes/admin/TempUsers';
import Property from './components/routes/Property';
import Contacts from './components/routes/admin/Contacts';
import AddProperty from './components/routes/admin/AddProperty';
import UpdateProperty from './components/routes/admin/UpdateProperty';
import UserUpdateProperty from './components/routes/UpdateProperty';
import Listing from './components/routes/Listing';
import NotFound from './components/routes/NotFound';
import Admin from './components/routes/admin/Admin';
import Listings from './components/routes/admin/Listings';
import AdminListing from './components/routes/admin/Listing';
import Signup from './components/pages/signup/Signup';
import Login from './components/routes/Login';
import AllImages from './components/pages/allimages/Images';
import Account from './components/routes/Account';
import get from './api/get';
import './app.scss';

const App = () => {
	return (
		<>
			<CssBaseline />
			<Router>
				<Routes>
					<Route
						path="/thisissomethingrandomwhichnoonecanthinkabout/"
						element={<Admin />}
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
				<Route path="/" element={<Home />} />
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
