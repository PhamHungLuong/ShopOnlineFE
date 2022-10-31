import { createContext } from 'react';

export const userContext = createContext({
    id: null,
    isLoggedIn: false,
    isAdmin: false,
    userId: null,
    name: null,
    email: null,
    logIn: () => {},
    logOut: () => {},
});
