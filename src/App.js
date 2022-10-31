import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import { publicRoutes } from './routes/index';
import { DefaultLayout } from './layouts/index';
import { userContext } from './context/userContext';
import { cartContext } from './context/cartContext';
import useUser from './Hooks/useUser/useUser';
import useCart from './Hooks/useCart/useCart';

function App() {
    const { id, isLoggedIn, userId, name, email, isAdmin, logIn, logOut } = useUser();
    const { carts, getCarts, addCart, removeCart, paymentCartHandler, removeCartByUserId } =
        useCart();

    return (
        <userContext.Provider
            value={{
                id: id,
                isLoggedIn: isLoggedIn,
                userId: userId,
                name: name,
                isAdmin: isAdmin,
                email: email,
                logIn: logIn,
                logOut: logOut,
            }}
        >
            <cartContext.Provider
                value={{
                    carts: carts,
                    getCarts: getCarts,
                    removeCart: removeCart,
                    addCart: addCart,
                    paymentCartHandler: paymentCartHandler,
                    removeCartByUserId: removeCartByUserId,
                }}
            >
                <Router>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;

                                let Layout = DefaultLayout;

                                if (route.layout) {
                                    Layout = route.Layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }

                                return (
                                    <Route
                                        path={route.path}
                                        key={index}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </div>
                </Router>
            </cartContext.Provider>
        </userContext.Provider>
    );
}

export default App;
