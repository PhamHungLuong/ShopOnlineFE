import classNames from 'classnames/bind';
import PropsType from 'prop-types';
import { useState, useContext } from 'react';
import axios from 'axios';

import styles from './FormProduct.module.scss';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { VALIDATOR_MINLENGTH } from '../../../services/validators/validator';
import ImagePreview from '../../../components/ImagePreview';
import { userContext } from '../../../context/userContext';

const cx = classNames.bind(styles);

const DUMMY_SIZE = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

function FormProduct({ name, description, price, src }) {
    const [nameValue, setNameValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [priceValue, setPriceValue] = useState();
    const [fileImage, setFileImage] = useState();
    const [activeSizeArray, setActiveSizeArray] = useState([]);

    const infoUserContext = useContext(userContext);

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

    const nameChangeHandler = (e) => {
        setNameValue(e.target.value);
    };

    const descriptionChangeHandler = (e) => {
        setDescriptionValue(e.target.value);
    };

    const priceChangeHandler = (e) => {
        setPriceValue(e.target.value);
    };

    const postProductHandler = async (e) => {
        e.preventDefault();

        const fromDataProduct = new FormData();
        fromDataProduct.append('name', nameValue);
        fromDataProduct.append('description', descriptionValue);
        fromDataProduct.append('price', priceValue);
        fromDataProduct.append('size', activeSizeArray);
        fromDataProduct.append('image', fileImage);
        fromDataProduct.append('creator', infoUserContext.id);
        console.log(fileImage);
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/api/product',
                data: fromDataProduct,
                headers: { 'Content-Type': 'form-data' },
            });

            console.log(response.data.product);
        } catch (err) {
            console.log(err);
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
                        errorText="Valid input"
                        validators={[VALIDATOR_MINLENGTH(1)]}
                        value={nameValue}
                        onChange={nameChangeHandler}
                    />
                    <Input
                        element="textarea"
                        type="password"
                        rows="5"
                        label="Description"
                        errorText="Valid input"
                        validators={[VALIDATOR_MINLENGTH(1)]}
                        onChange={descriptionChangeHandler}
                        value={descriptionValue}
                    />
                    <Input
                        element="input"
                        type="text"
                        label="Price"
                        errorText="Valid input"
                        validators={[VALIDATOR_MINLENGTH(1)]}
                        onChange={priceChangeHandler}
                        value={priceValue}
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
                    <ImagePreview getFileImage={setFileImage} />
                </div>
            </div>
            <Button className={cx('post-product')} primary onClick={postProductHandler}>
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
