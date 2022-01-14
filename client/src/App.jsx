import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Nav from './components/layout/nav/Nav';
import Home from './components/routes/Home';
import Users from './components/routes/admin/Users';
import Contacts from './components/routes/admin/Contacts';
import Property from './components/routes/admin/Property';

import './app.scss';

const App = () => {
	return (
		<>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/admin/users" element={<Users />} />
					<Route path="/admin/contacts" element={<Contacts />} />
					<Route path="/admin/property" element={<Property />} />
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
			</Routes>
		</>
	);
};

export default App;
