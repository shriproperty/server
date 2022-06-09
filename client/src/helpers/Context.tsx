import { createContext } from 'react';

export const UserContext = createContext<LoggedInUser | LoggedOutUser>({
	loaded: false,
	isLoggedIn: false,
	data: {},
});

export const AuthFormSubmitContext = createContext<{
	authFormSubmit: boolean;
	setAuthFormSubmit: (newValue: boolean) => void;
}>({ authFormSubmit: false, setAuthFormSubmit: () => undefined });
