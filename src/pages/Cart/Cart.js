import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './Cart.module.scss';
import ProductCart from './ProductCart/ProductCart';
import Image from '../../components/Image';
import NO_CART from '../../assets/emptyCart.png';

const cx = classNames.bind(styles);

function Cart() {
    const userId = '635015a7f5cb72a3079e0af8';
    const [carts, setCarts] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);

                setCarts(response.data.cartProducts);
            } catch (err) {
                console.log(err);
            }
        };

        fetchApi();
    }, []);

    const cartDeleteHandler = (deleteCartId) => {
        setCarts((prevCarts) => {
            prevCarts.filter((cart) => cart.id !== deleteCartId);
        });
    };

    console.log(carts);

    return (
        <div className={cx('container')}>
            {carts ? (
                carts.map((cart) => {
                    return (
                        <ProductCart
                            key={cart.id}
                            title={cart.productId.name}
                            quantity={cart.amount}
                            price={cart.productId.price}
                            onDeleteCart={cartDeleteHandler}
                            isPayment={cart.isPayment}
                        />
                    );
                })
            ) : (
                <div className={cx('content')}>
                    <Image className={cx('image')} src={NO_CART} alt="No Product" />
                </div>
            )}
        </div>
    );
}

export default Cart;
