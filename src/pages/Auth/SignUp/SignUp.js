import classNames from 'classnames/bind';

import styles from '../Auth.module.scss';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import Footer from '../../../layouts/components/Footer';
import Button from '../../../components/Button';
import Input from '../../../components/Input/Input';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from '../../../services/validators/validator';

const cx = classNames.bind(styles);

function Login() {
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
                            errorText="Invalid Input, please try again!"
                            validators={[VALIDATOR_MINLENGTH(5)]}
                        />
                        <Input
                            element="input"
                            type="input"
                            id="account"
                            label="Account"
                            errorText="Invalid Input, please try again!"
                            validators={[VALIDATOR_EMAIL()]}
                        />
                        <Input
                            element="input"
                            type="password"
                            id="password"
                            label="Password"
                            errorText="Invalid Input, please try again!"
                            validators={[VALIDATOR_MINLENGTH(6)]}
                        />
                        <Button primary className={cx('btn-login')}>
                            SIGN UP
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
