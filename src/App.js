import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import { publicRoutes } from './routes/index';
import { DefaultLayout } from './layouts/index';
import { userContext } from './context/userContext';
import useUser from './Hooks/useUser/useUser';

function App() {
    const { isLoggedIn, userId, name, email, isAdmin, logIn, logOut } = useUser();

    return (
        <userContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                userId: userId,
                name: name,
                isAdmin: isAdmin,
                email: email,
                logIn: logIn,
                logOut: logOut,
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
        </userContext.Provider>
    );
}

export default App;
