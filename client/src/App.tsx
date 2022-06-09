import { useState, useEffect, lazy, Suspense, FC } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import get from './api/get';
import Loader from './components/util/loader/Loader';
import './app.scss';

import Contacts from './components/pages/admin/contacts/Contacts';
import AddProperty from './components/pages/admin/property/form/Form';

import { UserContext, AuthFormSubmitContext } from './helpers/Context';

const Account = lazy(() => import('./components/pages/account/Account'));

const TempUsers = lazy(
	() => import('./components/pages/admin/tempUsers/TempUsers')
);
const UserUpdateProperty = lazy(
	() => import('./components/pages/updateProperty/UpdateProperty')
);
const NotFound = lazy(() => import('./components/pages/notFound/NotFound'));
const Listings = lazy(
	() => import('./components/pages/admin/listings/Listings')
);
const AdminListing = lazy(
	() => import('./components/pages/admin/listing/Listing')
);
const Signup = lazy(() => import('./components/pages/signup/Signup'));
const Login = lazy(() => import('./components/pages/login/Login'));
const Form = lazy(() => import('./components/pages/home/form/Form'));
const Users = lazy(() => import('./components/pages/admin/users/Users'));
const User = lazy(() => import('./components/pages/admin/user/User'));
const PendingListings = lazy(
	() => import('./components/pages/pendingListings/PendingListings')
);
const UpdatePendingListing = lazy(
	() =>
		import('./components/pages/updatePendingListings/UpdatePendingListing')
);

const Admin = lazy(() => import('./components/pages/admin/Admin'));
const UpdateProperty = lazy(
	() => import('./components/pages/admin/property/update/Update')
);
const Listing = lazy(() => import('./components/pages/listing/Listing'));
const Nav = lazy(() => import('./components/layout/nav/Nav'));
const Footer = lazy(() => import('./components/layout/footer/Footer'));

const Properties = lazy(
	() => import('./components/pages/properties/Properties')
);
const AllImages = lazy(() => import('./components/pages/allimages/Images'));
const Hero = lazy(() => import('./components/pages/home/hero/Hero'));
const PropertiesSection = lazy(
	() => import('./components/pages/home/properties/Properties')
);
const Category = lazy(
	() => import('./components/pages/home/category/Category')
);
const ListingSection = lazy(
	() => import('./components/pages/home/listing/Listing')
);

const Property = lazy(() => import('./components/pages/property/Property'));

const App: FC = () => {
	const [submit, setSubmit] = useState(false);

	return (
		<HelmetProvider>
			<Suspense fallback={<Loader fullScreen />}>
				<CssBaseline />
				<Router>
					<Routes>
						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}`}
							element={
								<Admin submit={submit} setSubmit={setSubmit} />
							}
						/>

						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/temp-users`}
							element={<TempUsers />}
						/>

						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/property/add`}
							element={<AddProperty />}
						/>

						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/property/update/:id`}
							element={<UpdateProperty />}
						/>

						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/users`}
							element={<Users />}
						/>
						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/users/:id`}
							element={<User />}
						/>

						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/contacts`}
							element={<Contacts />}
						/>
						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/listings`}
							element={<Listings />}
						/>
						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/listings/:id`}
							element={<AdminListing />}
						/>

						<Route path="*" element={<UserRoutes />} />
					</Routes>
				</Router>
			</Suspense>
		</HelmetProvider>
	);
};

// created a different router to hide navbar in admin routes
const UserRoutes: FC = () => {
	const [user, setUser] = useState<LoggedInUser | LoggedOutUser>({
		loaded: false,
		isLoggedIn: false,
		data: {},
	});
	const [authFormSubmit, setAuthFormSubmit] = useState(false);
	const [propertyOtpModelOpened, setPropertyOtpModelOpened] = useState(false);

	useEffect(() => {
		get('/auth/is-logged-in')
			.then((res: any) => {
				setUser({
					loaded: true,
					isLoggedIn: res.success,
					data: res.data,
				});
				setAuthFormSubmit(false);
			})
			.catch(() => {
				setUser({ loaded: true, isLoggedIn: false, data: {} });
				setAuthFormSubmit(false);
			});
	}, [authFormSubmit]);

	return (
		<AuthFormSubmitContext.Provider
			value={{ authFormSubmit, setAuthFormSubmit }}
		>
			<UserContext.Provider
				value={{
					loaded: user.loaded,
					isLoggedIn: user.isLoggedIn,
					data: user.data,
				}}
			>
				<Nav />
				<Routes>
					<Route
						path="/"
						element={
							<main>
								<Helmet>
									<title>
										Shri Property | live in your dreams
									</title>
									<link
										rel="canonical"
										href="https://shriproperty.com"
									/>
									<meta
										name="description"
										content="Shri Property is committed to delivering a high level of
								expertise, customer service, and attention to detail to
								sales of real estate, and rental
								properties."
									/>
								</Helmet>
								<Hero />
								<PropertiesSection />
								<Category />
								<ListingSection />
								<Form />
							</main>
						}
					/>
					<Route path="/properties" element={<Properties />} />
					<Route
						path="/properties/:id"
						element={
							<Property
								propertyOtpModelOpened={propertyOtpModelOpened}
								setPropertyOtpModelOpened={
									setPropertyOtpModelOpened
								}
							/>
						}
					/>
					<Route path="/listing" element={<Listing user={user} />} />
					<Route path="/allimages/:id" element={<AllImages />} />
					<Route
						path="/signup"
						element={
							<Signup setAuthFormSubmit={setAuthFormSubmit} />
						}
					/>
					<Route
						path="/login"
						element={
							<Login setAuthFormSubmit={setAuthFormSubmit} />
						}
					/>
					<Route path="/account" element={<Account />} />
					<Route
						path="/account/pending-listings"
						element={<PendingListings user={user} />}
					/>
					<Route
						path="/property/update/:id"
						element={<UserUpdateProperty />}
					/>
					<Route
						path="/account/pending-listings/:id"
						element={<UpdatePendingListing />}
					/>
					<Route path="/404" element={<NotFound />} />
					<Route path="*" element={<Navigate replace to="/404" />} />
				</Routes>
				<Footer />
			</UserContext.Provider>
		</AuthFormSubmitContext.Provider>
	);
};

export default App;
