import classNames from 'classnames/bind';
import { useContext } from 'react';

import styles from './Cart.module.scss';
import ProductCart from './ProductCart/ProductCart';
import Image from '../../components/Image';
import NO_CART from '../../assets/emptyCart.png';
import { cartContext } from '../../context/cartContext';
import { ToastMessageContainer } from '../../components/ToastMessage/ToastMessage';

const cx = classNames.bind(styles);

function Cart() {
    const cartProductsContext = useContext(cartContext);

    const cartDeleteHandler = (deleteCartId) => {
        cartProductsContext.removeCart(deleteCartId);
    };

    return (
        <div className={cx('container')}>
            {cartProductsContext.carts ? (
                cartProductsContext.carts.map((cart) => {
                    return (
                        <ProductCart
                            key={cart.id}
                            id={cart.id}
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
            <ToastMessageContainer />
        </div>
    );
}

export default Cart;
