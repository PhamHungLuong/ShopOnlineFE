import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useContext, Fragment } from 'react';
import axios from 'axios';

import CartItem from './CartItem/CartItem';
import Image from '../../../components/Image/Image';
import emptyCart from '../../../assets/emptyCart.png';
import styles from './Cart.module.scss';
import {
    notifyDisplay,
    ToastMessageContainer,
} from '../../../components/ToastMessage/ToastMessage';
import { userContext } from '../../../context/userContext';
import { cartContext } from '../../../context/cartContext';
import Button from '../../../components/Button/Button';

const cx = classNames.bind(styles);

function Cart() {
    const infoUserContext = useContext(userContext);
    const cartGlobalContext = useContext(cartContext);

    const notifyError = notifyDisplay('error', 'Vui long thu lai');

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/cart/${infoUserContext.userId}`,
                );
                cartGlobalContext.getCarts(response.data.cartProducts);
            } catch (err) {
                notifyError();
            }
        };

        if (infoUserContext.isLoggedIn) {
            fetchApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infoUserContext.isLoggedIn]);

    return (
        <div className={cx('container')}>
            <div className={cx('icon')}>
                <FontAwesomeIcon icon={faCartShopping} />
            </div>
            <div className={cx('amount')}>
                {infoUserContext.isLoggedIn &&
                    cartGlobalContext.carts &&
                    cartGlobalContext.carts.length}
            </div>
            <div className={cx('content')}>
                {infoUserContext.isLoggedIn ? (
                    <Fragment>
                        {cartGlobalContext.carts &&
                            cartGlobalContext.carts.map((cart) => {
                                return (
                                    <CartItem
                                        key={cart.id}
                                        title={cart.productId.name}
                                        price={cart.productId.price}
                                        isPaid={cart.isPayment}
                                        src="https://kenh14cdn.com/thumb_w/660/2020/5/28/0-1590653959375414280410.jpg"
                                    />
                                );
                            })}
                    </Fragment>
                ) : infoUserContext.isLoggedIn ? (
                    <Image type="product" src={emptyCart} alt="image cart" />
                ) : (
                    <div className={cx('btn-login')}>
                        <Button primary className={cx('btn')} to="/login">
                            Dang nhap
                        </Button>
                    </div>
                )}
            </div>
            <ToastMessageContainer />
        </div>
    );
}

export default Cart;
