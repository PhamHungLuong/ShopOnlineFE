import classNames from 'classnames/bind';
import PropsType from 'prop-types';
import { useState } from 'react';

import styles from './FormProduct.module.scss';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Image from '../../../components/Image';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../services/validators/validator';

const cx = classNames.bind(styles);

const DUMMY_SIZE = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

function FormProduct({ name, description, price }) {
    const [activeSizeArray, setActiveSizeArray] = useState([]);

    const activeHandler = (e, value) => {
        e.preventDefault();
        if (
            activeSizeArray.find((activeSize) => {
                return activeSize === value;
            })
        ) {
            const filteredItems = activeSizeArray.filter((item) => item !== value);
            setActiveSizeArray(() => {
                return filteredItems;
            });
        } else {
            setActiveSizeArray(() => {
                return [...activeSizeArray, value];
            });
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('form')}>
                <form className={cx('content')}>
                    <Input
                        element="input"
                        type="text"
                        label="Name"
                        errorText="Valid Account"
                        validators={[VALIDATOR_MINLENGTH(1)]}
                        onChange={() => {}}
                        value="a"
                    />
                    <Input
                        element="textarea"
                        type="password"
                        rows="5"
                        label="Description"
                        errorText="cannot be left in"
                        validators={[VALIDATOR_REQUIRE()]}
                        onChange={() => {}}
                        value="a"
                    />
                    <Input
                        element="input"
                        type="text"
                        label="Price"
                        errorText="cannot be left in"
                        validators={[VALIDATOR_REQUIRE()]}
                        onChange={() => {}}
                        value="a"
                    />
                    {DUMMY_SIZE.map((size, index) => {
                        return (
                            <Button
                                key={index}
                                onClick={(e) => {
                                    activeHandler(e, size);
                                }}
                                className={`${cx('btn-size')} ${
                                    activeSizeArray.find((sizeActive) => sizeActive === size) &&
                                    cx('btn-size--active')
                                } `}
                            >
                                {size}
                            </Button>
                        );
                    })}
                </form>
                <div className={cx('image')}>
                    <Image
                        className={cx('img')}
                        type="product"
                        src="https://anhdephd.vn/wp-content/uploads/2022/04/anh-gai-xinh-hot-girl-viet-nam.jpg"
                    />
                    <Button className={cx('btn')} primary>
                        Tai anh len
                    </Button>
                </div>
            </div>
            <Button className={cx('post-product')} primary>
                Post Product
            </Button>
        </div>
    );
}

FormProduct.propsType = {
    name: PropsType.string,
    description: PropsType.string,
    price: PropsType.number,
};

export default FormProduct;
