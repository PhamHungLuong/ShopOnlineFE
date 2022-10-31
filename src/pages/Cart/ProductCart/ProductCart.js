import classNames from 'classnames/bind';
import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { cartContext } from '../../../context/cartContext';
import styles from './ProductCart.module.scss';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import {
    notifyDisplay,
    ToastMessageContainer,
} from '../../../components/ToastMessage/ToastMessage';

const cx = classNames.bind(styles);

function ProductCart({ title, quantity, price, isPayment, onDeleteCart, id }) {
    const [amount, setAmount] = useState(quantity);
    const [newAmount, setNewAmount] = useState(quantity);
    const [isPaid, setIsPaid] = useState(isPayment);
    const [isShowEdit, setIsShowEdit] = useState(false);

    const cartProductContext = useContext(cartContext);

    const notifyPayment = notifyDisplay('success', 'Thanh Toán Thành Công');
    const notifyDelete = notifyDisplay('success', 'Xoa san pham thanh cong');
    const notifyEditSuccess = notifyDisplay('success', 'Sủa giỏ hàng thành công');
    const notifyError = notifyDisplay('error', 'Vui lòng thử lại');

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
            const response = await axios.patch(`http://localhost:5000/api/cart/payment/${id}`);
            setIsPaid(response.data.cartProduct.isPayment);
            cartProductContext.paymentCartHandler(id);
            notifyPayment();
        } catch (err) {
            notifyError();
        }
    };

    const acceptEditApi = async () => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/cart/${id}`, {
                amount: amount,
                headers: { 'Content-Type': 'application/json' },
            });
            setNewAmount(response.data.cartProduct.amount);
            showEditHandler();
            notifyEditSuccess();
        } catch (err) {
            notifyError();
        }
    };

    const deleteHandlerApi = async () => {
        try {
            onDeleteCart(id);
            await axios.delete(`http://localhost:5000/api/cart/${id}`);
            notifyDelete();
        } catch (err) {
            notifyError();
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
                        <div className={cx('amount')}>So luong ban dau : {newAmount}</div>
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
                                disable={amount === newAmount || amount === 0 ? true : false}
                                onClick={acceptEditApi}
                            >
                                Accept Edit
                            </Button>
                        )}
                    </div>
                )}
                <div className={cx('price')}>{!isPaid && `Gia: ${newAmount * price}`}</div>
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
                        <ToastMessageContainer />
                        <div className={cx('payment-success')}>Paid Success</div>
                    </div>
                )}
            </div>
        </div>
    );
}

ProductCart.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
};

export default ProductCart;
