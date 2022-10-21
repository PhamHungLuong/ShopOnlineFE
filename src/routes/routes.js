import routes from '../configs/routes';

import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import Product from '../pages/product/Product';
import Cart from '../pages/Cart/Cart';
import Profile from '../pages/Profile/Profile';
import ManageUser from '../pages/ManageUser';
import ManageProduct from '../pages/ManageProduct/ManageProduct';

const publicRoutes = [
    { path: routes.home, component: Home },
    { path: routes.product, component: Product },
    { path: routes.cart, component: Cart },
    { path: routes.profile, component: Profile },
    { path: routes.login, component: Login, layout: null },
    { path: routes.signup, component: SignUp, layout: null },
    { path: routes.adminUser, component: ManageUser },
    { path: routes.adminProduct, component: ManageProduct },
    { path: routes.userProduct, component: ManageProduct },
];

const privateRoute = [];

export { privateRoute, publicRoutes };
