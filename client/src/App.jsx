import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Users from './components/routes/admin/Users';

const App = () => {
	return (
		<>
		
			<Router>
				<Routes>
					<Route path="/admin/users" element={<Users />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
