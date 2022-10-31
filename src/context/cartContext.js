import { createContext } from 'react';

export const cartContext = createContext({
    carts: null,
    getCarts: () => {},
    addCart: () => {},
    removeCart: () => {},
});
