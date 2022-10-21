import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Product.module.scss';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import FormProduct from '../FromProduct/FormProduct';

const cx = classNames.bind(styles);

function Product({ title, description, price }) {
    const [isShowFormPost, setIsShowFormPost] = useState(false);
    const [showToastMessage, setShowToastMessage] = useState(false);

    const showFormHandler = () => {
        setIsShowFormPost(!isShowFormPost);
    };

    const notify = () => {
        setShowToastMessage(true);
        toast.success('Delete Success !', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('product')}>
                    <div className={cx('info')}>
                        <Image
                            src="https://media.phunutoday.vn/files/content/2020/06/29/mua-gi-o-dau-3-kieu-vay-mac-la-co-anh-dep-khi-di-du-lich-c27-5045910-1411.jpg"
                            className={cx('image')}
                            type="product"
                        />
                        <div className={cx('text')}>
                            <span className={cx('name')}>{title}</span>
                            <span className={cx('description')}>{description}</span>
                            <span className={cx('price')}>{price}</span>
                        </div>
                    </div>
                    <div className={cx('button')}>
                        <Button className={cx('btn-edit')} onClick={showFormHandler}>
                            {!isShowFormPost ? 'Edit Product' : 'End Editing'}
                        </Button>
                        <Button className={cx('btn-delete')} onClick={notify}>
                            {' '}
                            Delete Product{' '}
                        </Button>
                    </div>
                </div>
            </div>
            {isShowFormPost && <FormProduct />}
            {showToastMessage && (
                <ToastContainer
                    position="top-left"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="light"
                />
            )}
        </div>
    );
}

Product.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default Product;
