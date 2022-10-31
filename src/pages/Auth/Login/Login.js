import classNames from 'classnames/bind';
import { useState, useContext } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import styles from '../Auth.module.scss';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import Footer from '../../../layouts/components/Footer';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import { userContext } from '../../../context/userContext';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../services/validators/validator';
import {
    ToastMessageContainer,
    notifyDisplay,
} from '../../../components/ToastMessage/ToastMessage';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const navigate = useNavigate();

    const notifyWarning = notifyDisplay('error', 'wrong password');
    const notifyErrorLogin = notifyDisplay('error', 'Khong the dang nhap');

    const infoUserContext = useContext(userContext);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const logInHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email: email,
                password: password,
            });

            if (response.data.message) {
                setShowMessage(true);
                notifyWarning();
            } else {
                infoUserContext.logIn(
                    response.data.name,
                    response.data.userId,
                    response.data.isAdmin,
                    response.data.email,
                );
                setShowMessage(false);
                navigate('/');
            }
        } catch (err) {
            notifyErrorLogin();
        }
    };

    return (
        <div className={cx('container')}>
            <HeaderAuth title="LOG IN" />
            <div className={cx('content')}>
                <div className={cx('background')}>
                    <form className={cx('form')}>
                        <div className={cx('header')}>LOGIN</div>
                        <Input
                            element="input"
                            type="email"
                            id="email"
                            label="Account"
                            errorText="Valid Account"
                            onChange={handleChangeEmail}
                            getIsValid={setIsValidEmail}
                            value={email}
                            validators={[VALIDATOR_EMAIL()]}
                        />

                        <Input
                            element="input"
                            type="password"
                            label="PassWord"
                            id="password"
                            getIsValid={setIsValidPassword}
                            errorText="At lease 6 characters"
                            onChange={handleChangePassword}
                            value={password}
                            validators={[VALIDATOR_MINLENGTH(5)]}
                        />
                        <Button className={cx('btn-changePage')} to="/signup">
                            SIGN UP
                            <span className={cx('icon')}>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </span>
                        </Button>
                        <Button
                            disable={!isValidEmail && !isValidPassword}
                            primary
                            className={cx('btn')}
                            onClick={logInHandler}
                        >
                            LOGIN
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
            {showMessage && <ToastMessageContainer />}
        </div>
    );
}

export default Login;
