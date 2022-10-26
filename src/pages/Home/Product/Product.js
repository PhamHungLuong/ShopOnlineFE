import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './product.module.scss';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Product({ id, title, price, src }) {
    const addProductToCart = () => {
        console.log('add');
    };

    return (
        <Link className={cx('container')} to={`product/${id}`}>
            <div className={cx('view')}>
                <Image className={cx('image')} type="product" alt="image product" src={src} />
            </div>
            <div className={cx('content')}>
                <div className={cx('title')}>{title}</div>
                <div className={cx('sub-content')}>
                    <span className={cx('price')}>{price ? price : 0}</span>
                    <Button className={cx('btn')} primary onClick={addProductToCart}>
                        Xem sản phẩm
                    </Button>
                </div>
            </div>
        </Link>
    );
}

Product.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
};

export default Product;
