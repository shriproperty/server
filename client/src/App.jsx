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
import Users from './components/routes/admin/Users';
import Property from './components/routes/Property';
import Contacts from './components/routes/admin/Contacts';
import AddProperty from './components/routes/admin/AddProperty';
import UpdateProperty from './components/routes/admin/UpdateProperty';
import NotFound from './components/routes/NotFound';
import Admin from './components/routes/admin/Admin';
import './app.scss';

const App = () => {
	return (
		<>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/admin/" element={<Admin />} />

					<Route path="/admin/users" element={<Users />} />

					<Route
						path="/admin/property/add"
						element={<AddProperty />}
					/>

					<Route
						path="/admin/property/update/:id"
						element={<UpdateProperty />}
					/>

					<Route path="/admin/contacts" element={<Contacts />} />

					<Route path="*" element={<UserRoutes />} />
				</Routes>
			</Router>
		</>
	);
};

// created a diffreent router to hide navbar in admin routes
const UserRoutes = () => {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/properties" element={<Properties />} />
				<Route path="/properties/:id" element={<Property />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate replace to="/404" />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
