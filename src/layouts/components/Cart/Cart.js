import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import CartItem from './CartItem/CartItem';
import Image from '../../../components/Image/Image';
import emptyCart from '../../../assets/emptyCart.png';
import styles from './Cart.module.scss';
import { userContext } from '../../../context/userContext';

const cx = classNames.bind(styles);

function Cart() {
    const [carts, setCarts] = useState([]);
    const infoUserContext = useContext(userContext);

    const userId = infoUserContext.userId;

    useEffect(() => {
        const fetchApi = async () => {
            try {
                // const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);

                // setCarts(response.data.cartProducts);
            } catch (err) {
                console.log(err);
            }
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('icon')}>
                <FontAwesomeIcon icon={faCartShopping} />
            </div>
            <div className={cx('amount')}>{carts.length}</div>
            <div className={cx('content')}>
                {carts.length > 0 ? (
                    <>
                        {carts.map((cart) => {
                            return (
                                <CartItem
                                    key={cart.id}
                                    title={cart.productId.name}
                                    price={cart.productId.price}
                                    src="https://kenh14cdn.com/thumb_w/660/2020/5/28/0-1590653959375414280410.jpg"
                                />
                            );
                        })}
                    </>
                ) : (
                    <Image type="product" src={emptyCart} alt="image cart" />
                )}
            </div>
        </div>
    );
}

export default Cart;
