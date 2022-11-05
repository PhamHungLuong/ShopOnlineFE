import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { userContext } from '../../context/userContext';
import styles from './ManageProduct.module.scss';
import noProductImage from '../../assets/no_product.jpg';
import Button from '../../components/Button';
import Image from '../../components/Image';
import Product from './Product';
import FormProduct from './FromProduct/FormProduct';
import { notifyDisplay, ToastMessageContainer } from '../../components/ToastMessage/ToastMessage';

const cx = classNames.bind(styles);

function ManageProduct() {
    const [isShowFormPost, setIsShowFormPost] = useState(false);
    const [products, setProducts] = useState([]);

    const userInfoContext = useContext(userContext);
    const notifyError = notifyDisplay('error', 'Không thể tải, Vui lòng thử lại');

    const showFormHandler = () => {
        setIsShowFormPost(!isShowFormPost);
    };

    useEffect(() => {
        if (userInfoContext.isAdmin) {
            const fetchApi = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/product');
                    setProducts(response.data.products);
                } catch (err) {
                    notifyError();
                }
            };

            fetchApi();
        } else {
            const fetchApi = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:5000/api/product/user/${userInfoContext.userId}`,
                    );
                    setProducts(response.data.products);
                } catch (err) {
                    notifyError();
                }
            };

            fetchApi();
        }
    }, []);

    const productDeleteHandler = (productId) => {
        let currentProduct = [];
        products.forEach((product) => {
            if (product.id !== productId) {
                currentProduct.push(product);
            }
        });

        setProducts(currentProduct);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>Danh sách sản phẩm</div>
            <div className={cx('add-product')}>
                {!userInfoContext.isAdmin && (
                    <Button className={cx('btn')} primary onClick={showFormHandler}>
                        {!isShowFormPost ? 'Add product' : 'Close Form'}
                    </Button>
                )}
            </div>

            {isShowFormPost && (
                <div className={cx('formProduct')}>
                    <FormProduct
                        addProductHandler={setProducts}
                        setIsShowFormPost={setIsShowFormPost}
                    />
                </div>
            )}

            <div className={cx('list-product')}>
                {products && products.length !== 0 ? (
                    products.map((product) => {
                        return (
                            <Product
                                id={product.id}
                                key={product.id}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                deleteProduct={productDeleteHandler}
                                src={product.image}
                            />
                        );
                    })
                ) : (
                    <div className={cx('no-product')}>
                        <Image
                            src={noProductImage}
                            className={cx('image')}
                            alt="Không có sản phẩm"
                        />
                    </div>
                )}
            </div>
            <ToastMessageContainer />
        </div>
    );
}

export default ManageProduct;
