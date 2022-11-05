import classNames from 'classnames/bind';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from '../Auth.module.scss';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import Footer from '../../../layouts/components/Footer';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import { userContext } from '../../../context/userContext';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from '../../../services/validators/validator';
import {
    notifyDisplay,
    ToastMessageContainer,
} from '../../../components/ToastMessage/ToastMessage';

const cx = classNames.bind(styles);

function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidName, setIsValidName] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);

    const infoUserContext = useContext(userContext);
    const notifyError = notifyDisplay('error', 'Không thể đăng ký tài khoản, Vui lòng thử lại');
    let navigate = useNavigate();

    const changeNameHandler = (e) => {
        setName(e.target.value);
    };

    const changeEmailHandler = (e) => {
        setEmail(e.target.value);
    };

    const changePasswordHandler = (e) => {
        setPassword(e.target.value);
    };

    const signupSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/signup', {
                name: name,
                email: email,
                password: password,
            });
            infoUserContext.logIn(
                response.data.name,
                response.data.userId,
                response.data.isAdmin,
                response.data.email,
            );
        } catch (err) {
            notifyError();
        }
        navigate('/');
    };

    return (
        <div className={cx('container')}>
            <HeaderAuth title="SIGN UP" />
            <div className={cx('content')}>
                <div className={cx('background')}>
                    <form className={cx('form')}>
                        <div className={cx('header')}>SIGN UP</div>
                        <Input
                            element="input"
                            type="text"
                            id="name"
                            label="Name"
                            value={name}
                            onChange={changeNameHandler}
                            getIsValid={setIsValidName}
                            errorText="Invalid Input, please try again!"
                            validators={[VALIDATOR_REQUIRE()]}
                        />
                        <Input
                            element="input"
                            type="input"
                            id="account"
                            label="Account"
                            value={email}
                            getIsValid={setIsValidEmail}
                            onChange={changeEmailHandler}
                            errorText="Invalid Input, please try again!"
                            validators={[VALIDATOR_EMAIL()]}
                        />
                        <Input
                            element="input"
                            type="password"
                            id="password"
                            label="Password"
                            value={password}
                            getIsValid={setIsValidPassword}
                            onChange={changePasswordHandler}
                            errorText="At lease 6 characters"
                            validators={[VALIDATOR_MINLENGTH(5)]}
                        />
                        <Button className={cx('btn-changePage')} to="/login">
                            LOG IN
                            <span className={cx('icon')}>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </span>
                        </Button>
                        <Button
                            disable={!isValidEmail && !isValidName && !isValidPassword}
                            onClick={signupSubmitHandler}
                            primary
                            className={cx('btn')}
                        >
                            SIGN UP
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastMessageContainer />
        </div>
    );
}

export default Login;
