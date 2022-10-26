import classNames from 'classnames/bind';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ProductCart.module.scss';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import axios from 'axios';

const cx = classNames.bind(styles);

function ProductCart({ title, quantity, price, isPayment, onDeleteCart }) {
    const [amount, setAmount] = useState(quantity);
    const [isPaid, setIsPaid] = useState(isPayment);
    const [isShowEdit, setIsShowEdit] = useState(false);

    const cartId = '63516c9003348ecb2ed5d020';

    const notify = () => {
        toast.success('Paid Success', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    };

    const prevAmountHandler = () => {
        setAmount((prev) => {
            if (prev === 0) {
                return prev;
            } else {
                return prev - 1;
            }
        });
    };

    const showEditHandler = () => {
        setIsShowEdit(!isShowEdit);
    };

    const nextAmountHandler = () => {
        setAmount((prev) => prev + 1);
    };

    const paidCartHandlerApi = async () => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/cart/${cartId}`);
            setIsPaid(response.data.cartProduct.isPayment);
            notify();
        } catch (err) {
            console.log(err);
        }
    };

    const acceptEditApi = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/cart/${cartId}`, {
                amount: amount,
            });
            quantity = response.data.cartProduct.amount;
            setAmount(response.data.cartProduct.amount);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteHandlerApi = () => {
        try {
            onDeleteCart(cartId);
            axios.delete(`http://localhost:5000/api/cart/${cartId}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <Image
                        className={cx('image')}
                        type="product"
                        src="https://image-us.eva.vn/upload/4-2021/images/2021-10-04/de-giu-hinh-anh-sanh-dieu-nang-can-biet-nhung-mau-vay-nen-va-khong-nen-sam-thu-nay-a6b24c1c4b0904822ec2b8ae45344ee8-1633343524-692-width600height600.jpg"
                    />
                    <div className={cx('text')}>
                        <div className={cx('name')}>{title}</div>
                        <div className={cx('amount')}>So luong ban dau : {quantity}</div>
                    </div>
                </div>
                {isShowEdit && !isPaid && (
                    <div className={cx('amount')}>
                        <Button className={cx('btn-number')} onClick={nextAmountHandler}>
                            +
                        </Button>
                        <span className={cx('number')}>{amount}</span>
                        <Button className={cx('btn-number')} onClick={prevAmountHandler}>
                            -
                        </Button>
                        {!isPaid && (
                            <Button
                                primary
                                className={cx('accept-edit-btn')}
                                disable={amount === quantity ? true : false}
                                onClick={acceptEditApi}
                            >
                                Accept Edit
                            </Button>
                        )}
                    </div>
                )}
                <div className={cx('price')}>Gia: {price * amount}</div>
                <div className={cx('button')}>
                    {!isPaid && (
                        <Button className={cx('edit')} onClick={showEditHandler}>
                            {isShowEdit ? 'Hoan tat' : 'Chinh sua'}
                        </Button>
                    )}
                    <Button className={cx('delete')} onClick={deleteHandlerApi}>
                        Xoa
                    </Button>
                </div>
            </div>
            <div className={cx('payment')}>
                {!isPaid ? (
                    <Button primary className={cx('btn')} onClick={paidCartHandlerApi}>
                        Thanh Toan San Pham
                    </Button>
                ) : (
                    <div>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                        <div className={cx('payment-success')}>Paid Success</div>
                    </div>
                )}
            </div>
        </div>
    );
}

ProductCart.propTypes = {
    title: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
};

export default ProductCart;
