import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './ManageProduct.module.scss';
import Button from '../../components/Button';
import Product from './Product';
import FormProduct from './FromProduct/FormProduct';

const cx = classNames.bind(styles);

function ManageProduct() {
    const [isShowFormPost, setIsShowFormPost] = useState(false);
    const [products, setProducts] = useState([]);

    const showFormHandler = () => {
        setIsShowFormPost(!isShowFormPost);
    };

    const userId = '633d2f3e655a73ee515398ea';

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/${userId}`);

                setProducts(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>Danh sách sản phẩm</div>
            <div className={cx('add-product')}>
                <Button className={cx('btn')} primary onClick={showFormHandler}>
                    {!isShowFormPost ? 'Add product' : 'Close Form'}
                </Button>
            </div>

            {isShowFormPost && (
                <div className={cx('formProduct')}>
                    <FormProduct />
                </div>
            )}

            <div className={cx('list-product')}>
                <Product title="ao dai" description="dep qua" price={300} />
                <Product title="ao dai" description="dep qua" price={300} />
                <Product title="ao dai" description="dep qua" price={300} />
                <Product title="ao dai" description="dep qua" price={300} />
            </div>
        </div>
    );
}

export default ManageProduct;
