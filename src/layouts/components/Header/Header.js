import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarth, faGear, faQuestion, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import Button from '../../../components/Button/Button';
import routes from '../../../configs/index';
import Search from '../Search/Search';
import Cart from '../Cart';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('sub-header')}>
                    <ul className={cx('list-social')}>
                        <li>
                            <Button className={cx('item-social')} href="/">
                                Kênh người bán
                            </Button>
                        </li>
                        <li>
                            <Button className={cx('item-social')} href="/">
                                Trở thành người bán
                            </Button>
                        </li>
                        <li>
                            <Button className={cx('item-social')} href="/">
                                <FontAwesomeIcon className={cx('icon')} icon={faEarth} />
                                Facebook
                            </Button>
                        </li>
                        <li>
                            <Button className={cx('item-social')} href="/">
                                <FontAwesomeIcon className={cx('icon')} icon={faEarth} />
                                Instagram
                            </Button>
                        </li>
                    </ul>
                    <div className={cx('function')}>
                        <ul className={cx('list-function')}>
                            <li>
                                <Button className={cx('item-function')} href="/">
                                    <FontAwesomeIcon className={cx('icon')} icon={faQuestion} />
                                    Thông báo
                                </Button>
                            </li>
                            <li>
                                <Button className={cx('item-function')} href="/">
                                    <FontAwesomeIcon className={cx('icon')} icon={faGear} />
                                    Hỗ trợ
                                </Button>
                            </li>
                            {false ? (
                                <>
                                    <li>
                                        <Button
                                            className={cx('item-function')}
                                            to={routes.routes.login}
                                        >
                                            Đăng nhập
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            className={cx('item-function')}
                                            to={routes.routes.signup}
                                        >
                                            Đăng ký
                                        </Button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className={cx('func-account')}>
                                        <Button className={cx('item-function')} to="/">
                                            Pham Hung Luong
                                        </Button>
                                        <div className={cx('list-func')}>
                                            <Button className={cx('item-func')} to="/profile">
                                                Thong tin Tai Khoan
                                            </Button>
                                            {false ? (
                                                <>
                                                    <Button className={cx('item-func')} to="/">
                                                        Quan ly nguoi dung
                                                    </Button>
                                                    <Button className={cx('item-func')} to="/">
                                                        Quan ly san pham
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button className={cx('item-func')} to="/">
                                                    Quan ly san pham
                                                </Button>
                                            )}
                                            <Button className={cx('item-func')}>Dang xuat</Button>
                                        </div>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                <div className={cx('main-header')}>
                    {/* logo */}
                    <Button className={cx('logo')} to={routes.routes.home}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faShoppingBag} />
                        </div>
                        <div className={cx('text')}>SHOPEE</div>
                    </Button>
                    {/* Search */}
                    <div className={cx('search')}>
                        <Search />
                    </div>

                    {/* Carts */}
                    <div className={cx('cart')}>
                        <Cart />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
