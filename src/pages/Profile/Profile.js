import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './Profile.module.scss';
import Button from '../../components/Button';
import Input from '../../components/Input/Input';
import ImagePreview from '../../components/ImagePreview/ImagePreview';
import { VALIDATOR_REQUIRE } from '../../services/validators/validator';

const cx = classNames.bind(styles);

function Profile() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [fileImage, setFileImage] = useState();
    const [isSaveProfile, setIsSaveProfile] = useState(true);

    const userId = '635015a7f5cb72a3079e0af8';

    const getFileImage = (value) => {
        setFileImage(value);
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${userId}`);

                setName(response.data.user.name);
                setEmail(response.data.user.email);
                setPassword(response.data.user.password);
                setImageUrl(response.data.user.image);
            } catch (err) {
                console.log(err);
            }
        };

        fetchApi();
    }, []);

    const nameDefault = name;

    const emailChangeHandler = (e) => {
        if (nameDefault === e.target.value) {
            setIsSaveProfile(true);
        } else {
            setIsSaveProfile(false);
        }
        setName(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setName(e.target.value);
    };

    const changeProfileHandler = async (e) => {
        e.preventDefault();
        const fileReader = new FileReader();
        fileReader.readAsDataURL(fileImage);

        const formData = new FormData();

        formData.append('image', fileImage);
        formData.append('name', name);
        formData.append('password', password);
        try {
            const response = await axios.post(`http://localhost:5000/api/user/${userId}`, formData);

            setName(response.data.user.name);
            setEmail(response.data.user.email);
            setPassword(response.data.user.password);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <span className={cx('text')}>Ho so cua toi</span>
                <span className={cx('sub-text')}>Quan ly thong tin ho so de bao mat tai khoan</span>
            </div>
            <div className={cx('content')}>
                <form className={cx('form')}>
                    <Input
                        element="input"
                        type="text"
                        label="Ten Tai Khoan"
                        errorText="Valid Account"
                        value={name}
                        onChange={emailChangeHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                    />
                    <Input
                        element="input"
                        type="email"
                        label="Email"
                        errorText="Valid Account"
                        value={email}
                        // onChange={console.log(1)}
                        disabled
                        validators={[VALIDATOR_REQUIRE()]}
                    />
                    <Input
                        element="input"
                        type="password"
                        label="Password"
                        errorText="Valid Account"
                        value={password}
                        onChange={passwordChangeHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                    />
                    <Button
                        className={cx('btn')}
                        disable={isSaveProfile}
                        onClick={changeProfileHandler}
                    >
                        Save
                    </Button>
                </form>

                {/* Image Preview */}
                <ImagePreview getFileImage={getFileImage} src={imageUrl} />
            </div>
        </div>
    );
}

export default Profile;
