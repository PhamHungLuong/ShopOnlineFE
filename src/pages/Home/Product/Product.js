import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './product.module.scss';
import Image from '../../../components/Image';
import Button from '../../../components/Button';

const cx = classNames.bind(styles);

function Product({ title, price, src }) {
    const addProductToCart = () => {
        console.log('Added');
    };

    return (
        <div className={cx('container')}>
            <div className={cx('view')}>
                <Image className={cx('image')} type="product" alt="image product" src={src} />
            </div>
            <div className={cx('content')}>
                <div className={cx('title')}>{title}</div>
                <div className={cx('sub-content')}>
                    <span className={cx('price')}>{price ? price : 0}</span>
                    <Button className={cx('btn')} primary onClick={addProductToCart}>
                        Add to cart
                    </Button>
                </div>
            </div>
        </div>
    );
}

Product.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
};

export default Product;
