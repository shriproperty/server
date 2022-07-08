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

import Contacts from './pages/admin/contacts/Contacts';
import AddProperty from './pages/admin/property/form/Form';

import { AuthFormSubmitContext, UserContext } from './helpers/Context';

const Account = lazy(() => import('./pages/user/account/Account'));

const TempUsers = lazy(
	() => import('./pages/admin/tempUsers/TempUsers')
);
const UserUpdateProperty = lazy(
	() => import('./pages/user/updateProperty/UpdateProperty')
);
const NotFound = lazy(() => import('./pages/notFound/NotFound'));
const Listings = lazy(
	() => import('./pages/admin/listings/Listings')
);
const AdminListing = lazy(
	() => import('./pages/admin/listing/Listing')
);
const Signup = lazy(() => import('./pages/user/signup/Signup'));
const Login = lazy(() => import('./pages/user/login/Login'));
const Form = lazy(() => import('./pages/user/home/form/Form'));
const Users = lazy(() => import('./pages/admin/users/Users'));
const User = lazy(() => import('./pages/admin/user/User'));
const PendingListings = lazy(
	() => import('./pages/user/pendingListings/PendingListings')
);
const UpdatePendingListing = lazy(
	() =>
		import(
			'./pages/user/updatePendingListings/UpdatePendingListing'
		)
);

const Admin = lazy(() => import('./pages/admin/Admin'));
const UpdateProperty = lazy(
	() => import('./pages/admin/property/update/Update')
);
const Listing = lazy(() => import('./pages/user/listing/Listing'));

const UserNav = lazy(() => import('./components/layout/userNav/UserNav'));

const AdminNav = lazy(() => import('./components/layout/adminNav/AdminNav'));

const Footer = lazy(() => import('./components/layout/footer/Footer'));

const Properties = lazy(
	() => import('./pages/user/properties/Properties')
);
const AllImages = lazy(
	() => import('./pages/user/allimages/Images')
);
const Hero = lazy(() => import('./pages/user/home/hero/Hero'));
const PropertiesSection = lazy(
	() => import('./pages/user/home/properties/Properties')
);
const Category = lazy(
	() => import('./pages/user/home/category/Category')
);
const ListingSection = lazy(
	() => import('./pages/user/home/listing/Listing')
);

const Property = lazy(
	() => import('./pages/user/property/Property')
);

const App: FC = () => {
	return (
		<HelmetProvider>
			<Suspense fallback={<Loader fullScreen />}>
				<CssBaseline />
				<Router>
					<Routes>
						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/*`}
							element={<AdminRoutes />}
						/>
						<Route path="*" element={<UserRoutes />} />
					</Routes>
				</Router>
			</Suspense>
		</HelmetProvider>
	);
};

const AdminRoutes: FC = () => {
	return (
		<>
			<AdminNav />
			<Routes>
				<Route path={`/`} element={<Admin />} />

				<Route path={`temp-users`} element={<TempUsers />} />

				<Route path={`property/add`} element={<AddProperty />} />

				<Route
					path={`property/update/:id`}
					element={<UpdateProperty />}
				/>

				<Route path={`users`} element={<Users />} />
				<Route path={`users/:id`} element={<User />} />

				<Route path={`contacts`} element={<Contacts />} />

				<Route path={`listings`} element={<Listings />} />

				<Route path={`listings/:id`} element={<AdminListing />} />
			</Routes>
		</>
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
				<UserNav />
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
