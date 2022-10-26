import classNames from 'classnames/bind';
import { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import styles from '../Auth.module.scss';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import Footer from '../../../layouts/components/Footer';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import { userContext } from '../../../context/userContext';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../services/validators/validator';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [errorText, setErrorText] = useState('wrong password');

    const navigate = useNavigate();

    const notify = () => {
        setShowMessage(true);
        toast.error(errorText, {
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
                setErrorText(() => 'wrong password 3');
                notify();
            } else {
                infoUserContext.logIn(
                    response.data.name,
                    response.data.userId,
                    response.data.isAdmin,
                    response.data.email,
                );
                navigate('/');
            }
        } catch (err) {
            console.log(err);
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

                        <Button
                            disable={!isValidEmail && !isValidPassword}
                            primary
                            className={cx('btn-login')}
                            onClick={logInHandler}
                        >
                            LOGIN
                        </Button>
                        <div className={cx('footer')}></div>
                    </form>
                </div>
            </div>
            <Footer />
            {showMessage && (
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

export default Login;
