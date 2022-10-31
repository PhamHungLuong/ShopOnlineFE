import { useState } from 'react';

const useCart = () => {
    const [carts, setCarts] = useState();

    const getCarts = (carts) => {
        setCarts(carts);
    };

    const addCart = (newCart) => {
        setCarts((prevCarts) => {
            return [...prevCarts, newCart];
        });
    };

    const removeCart = (cartRemoveId) => {
        let currentCart = [];
        carts.forEach((cart) => {
            if (cart.id !== cartRemoveId) {
                currentCart.push(cart);
            }
        });

        setCarts(currentCart);
    };

    const removeCartByUserId = (userId) => {
        let currentCart = [];
        carts.forEach((cart) => {
            if (cart.productId._id !== userId) {
                currentCart.push(cart);
            }
        });

        setCarts(currentCart);
    };

    const paymentCartHandler = (cartPaymentId) => {
        let currentCart = [];
        carts.forEach((cart) => {
            if (cart.id === cartPaymentId) {
                cart.isPayment = true;
                currentCart.push(cart);
            } else {
                currentCart.push(cart);
            }
        });

        setCarts(currentCart);
    };

    return { carts, getCarts, addCart, removeCart, paymentCartHandler, removeCartByUserId };
};

export default useCart;
