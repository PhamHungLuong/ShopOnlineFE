import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './CartItem.module.scss';
import Image from '../../../../components/Image/Image';

const cx = classNames.bind(styles);

function CartItem({ title, price, src, onClick, isPaid }) {

    return (
        <div className={cx('container')} onClick={onClick}>
            <div className={cx('list-cart')}>
                <div className={cx('item-cart')}>
                    <Image type="product" className={cx('image')} alt="image cart" src={src} />
                    <div className={cx('text')}>
                        <span className={cx('title')}>{title}</span>
                        <span className={cx('price')}>{price}</span>
                    </div>
                </div>
                {isPaid ? (
                    <div className={cx('isPayment')}>Đã Thanh Toán</div>
                ) : (
                    <div className={cx('isPayment')}>Chưa Thanh Toán</div>
                )}
            </div>
        </div>
    );
}

CartItem.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    isPaid: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
};

export default CartItem;
