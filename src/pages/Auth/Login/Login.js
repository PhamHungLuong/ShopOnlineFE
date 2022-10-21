import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from '../Auth.module.scss';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import Footer from '../../../layouts/components/Footer';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MAXLENGTH,
    VALIDATOR_MINLENGTH,
} from '../../../services/validators/validator';

const cx = classNames.bind(styles);

function Login() {
    const [valueEmail, setValueEmail] = useState('');
    const [valuePassword, setValuePassword] = useState('');

    const handleChangeEmail = (e) => {
        setValueEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setValuePassword(e.target.value);
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
                            label="Account"
                            errorText="Valid Account"
                            onChange={handleChangeEmail}
                            value={valueEmail}
                            validators={[VALIDATOR_EMAIL(), VALIDATOR_MAXLENGTH(20)]}
                        />

                        <Input
                            element="input"
                            type="password"
                            label="PassWord"
                            errorText="At lease 6 characters"
                            onChange={handleChangePassword}
                            value={valuePassword}
                            validators={[VALIDATOR_MINLENGTH(6)]}
                        />

                        <Button primary className={cx('btn-login')}>
                            LOGIN
                        </Button>
                        <div className={cx('footer')}></div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
