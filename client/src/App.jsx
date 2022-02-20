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
import Listing from './components/routes/Listing';
import NotFound from './components/routes/NotFound';
import Admin from './components/routes/admin/Admin';
import Listings from './components/routes/admin/Listings';
import AdminListing from './components/routes/admin/Listing';

import './app.scss';

const App = () => {
	return (
		<>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/admin/" element={<Admin />} />

					<Route path="/admin/temp-users" element={<TempUsers />} />

					<Route
						path="/admin/property/add"
						element={<AddProperty />}
					/>

					<Route
						path="/admin/property/update/:id"
						element={<UpdateProperty />}
					/>

					<Route path="/admin/contacts" element={<Contacts />} />
					<Route path="/admin/listings" element={<Listings />} />
					<Route
						path="/admin/listings/:id"
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
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/properties" element={<Properties />} />
				<Route path="/properties/:id" element={<Property />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="/listing" element={<Listing />} />
				<Route path="*" element={<Navigate replace to="/404" />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
