import { CssBaseline } from '@mui/material';
import { FC, lazy, Suspense, useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';
import get from './api/get';
import './app.scss';
import Loader from './components/util/loader/Loader';

import Contacts from './components/pages/admin/contacts/Contacts';
import AddProperty from './components/pages/admin/property/form/Form';

import { AuthFormSubmitContext, UserContext } from './helpers/Context';

const Account = lazy(() => import('./components/pages/user/account/Account'));

const TempUsers = lazy(
	() => import('./components/pages/admin/tempUsers/TempUsers')
);
const UserUpdateProperty = lazy(
	() => import('./components/pages/user/updateProperty/UpdateProperty')
);
const NotFound = lazy(() => import('./components/pages/notFound/NotFound'));
const Listings = lazy(
	() => import('./components/pages/admin/listings/Listings')
);
const AdminListing = lazy(
	() => import('./components/pages/admin/listing/Listing')
);
const Signup = lazy(() => import('./components/pages/user/signup/Signup'));
const Login = lazy(() => import('./components/pages/user/login/Login'));
const Form = lazy(() => import('./components/pages/user/home/form/Form'));
const Users = lazy(() => import('./components/pages/admin/users/Users'));
const User = lazy(() => import('./components/pages/admin/user/User'));
const PendingListings = lazy(
	() => import('./components/pages/user/pendingListings/PendingListings')
);
const UpdatePendingListing = lazy(
	() =>
		import(
			'./components/pages/user/updatePendingListings/UpdatePendingListing'
		)
);

const Admin = lazy(() => import('./components/pages/admin/Admin'));
const UpdateProperty = lazy(
	() => import('./components/pages/admin/property/update/Update')
);
const Listing = lazy(() => import('./components/pages/user/listing/Listing'));
const Nav = lazy(() => import('./components/layout/nav/Nav'));
const Footer = lazy(() => import('./components/layout/footer/Footer'));

const Properties = lazy(
	() => import('./components/pages/user/properties/Properties')
);
const AllImages = lazy(
	() => import('./components/pages/user/allimages/Images')
);
const Hero = lazy(() => import('./components/pages/user/home/hero/Hero'));
const PropertiesSection = lazy(
	() => import('./components/pages/user/home/properties/Properties')
);
const Category = lazy(
	() => import('./components/pages/user/home/category/Category')
);
const ListingSection = lazy(
	() => import('./components/pages/user/home/listing/Listing')
);

const Property = lazy(
	() => import('./components/pages/user/property/Property')
);

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
	const [userUpdated, setUserUpdated] = useState(false);

	useEffect(() => {
		get('/auth/is-logged-in')
			.then((res: any) => {
				setUser({
					loaded: true,
					isLoggedIn: res.success,
					data: res.data,
				});
				setAuthFormSubmit(false);
				setUserUpdated(false);
			})
			.catch(() => {
				setUser({ loaded: true, isLoggedIn: false, data: {} });
				setAuthFormSubmit(false);
				setUserUpdated(false);
			});
	}, [authFormSubmit, userUpdated]);

	return (
		<AuthFormSubmitContext.Provider
			value={{ authFormSubmit, setAuthFormSubmit }}
		>
			<UserContext.Provider
				value={{
					update: userUpdated,
					setUpdate: setUserUpdated,
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

					<Route path="/listing" element={<Listing />} />
					<Route path="/allimages/:id" element={<AllImages />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/account" element={<Account />} />
					<Route
						path="/account/pending-listings"
						element={<PendingListings />}
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
