import { createContext } from 'react';

export const UserContext = createContext<User>({
	isLoggedIn: false,
	data: {},
});
