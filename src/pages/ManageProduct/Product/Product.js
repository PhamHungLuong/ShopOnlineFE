import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Product.module.scss';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import FormProduct from '../FromProduct/FormProduct';
import { cartContext } from '../../../context/cartContext';
import {
    notifyDisplay,
    ToastMessageContainer,
} from '../../../components/ToastMessage/ToastMessage';
import axios from 'axios';
import { userContext } from '../../../context/userContext';

const cx = classNames.bind(styles);

function Product({ id, title, description, price, deleteProduct, src }) {
    const [isShowFormPost, setIsShowFormPost] = useState(false);
    const [infoProduct, setInfoProduct] = useState({
        id: id,
        name: title,
        description: description,
        price: price,
        image: src,
    });

    const cartProductContext = useContext(cartContext);
    const userInfoContext = useContext(userContext);

    const showFormHandler = () => {
        setIsShowFormPost(!isShowFormPost);
    };

    const notifyDeleteProduct = notifyDisplay('success', 'Xoa san Pham Thanh Cong');
    const notifyError = notifyDisplay('error', 'Vui long thu lai');

    const deleteProductHandler = async () => {
        try {
            axios.delete(`http://localhost:5000/api/product/${id}`);
            deleteProduct(id);
            cartProductContext.removeCartByUserId(id);
        } catch (err) {
            notifyError();
        }

        notifyDeleteProduct();
    };

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('product')}>
                    <div className={cx('info')}>
                        <Image src={infoProduct.image} className={cx('image')} type="product" />
                        <div className={cx('text')}>
                            <span className={cx('name')}>{infoProduct.name}</span>
                            <span className={cx('description')}>
                                Mo ta: {infoProduct.description}
                            </span>
                            <span className={cx('price')}>Gia: {infoProduct.price}</span>
                        </div>
                    </div>
                    <div className={cx('button')}>
                        {!userInfoContext.isAdmin && (
                            <Button className={cx('btn-edit')} onClick={showFormHandler}>
                                {!isShowFormPost ? 'Edit Product' : 'End Editing'}
                            </Button>
                        )}
                        <Button className={cx('btn-delete')} onClick={deleteProductHandler}>
                            {' '}
                            Delete Product{' '}
                        </Button>
                    </div>
                </div>
            </div>
            {isShowFormPost && (
                <FormProduct
                    id={id}
                    name={infoProduct.name}
                    description={infoProduct.description}
                    price={infoProduct.price}
                    src={infoProduct.image}
                    setIsShowFormPost={setIsShowFormPost}
                    setNewInfoProduct={setInfoProduct}
                />
            )}
            <ToastMessageContainer />
        </div>
    );
}

Product.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default Product;
