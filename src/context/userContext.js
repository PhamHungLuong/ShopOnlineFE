import { createContext } from 'react';

export const userContext = createContext({
    isLoggedIn: false,
    isAdmin: false,
    userId: null,
    name: null,
    email: null,
    logIn: () => {},
    logOut: () => {},
});
