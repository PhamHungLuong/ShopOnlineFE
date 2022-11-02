import axios from 'axios';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

import styles from './Home.module.scss';
import Banner from './Banner/Banner';
import Product from './Product/Product';

const cx = classNames.bind(styles);

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/product');

                setProducts(response.data.products);
            } catch (err) {
                console.log(err);
            }
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('banner')}>
                <Banner />
            </div>
            <div className={cx('content')}>
                <div className={cx('title')}>Sản phẩm</div>
                {!products ? (
                    <div className={cx('empty-page')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faExclamation} />
                        <div className={cx('text')}>Khong co san pham</div>
                    </div>
                ) : (
                    <div className={cx('list-product')}>
                        {products.map((product) => {
                            return (
                                <Product
                                    key={product.id}
                                    id={product.id}
                                    title={product.name}
                                    price={product.price}
                                    src={product.image}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
