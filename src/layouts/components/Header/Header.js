import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarth, faGear, faQuestion, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { userContext } from '../../../context/userContext';
import styles from './Header.module.scss';
import Button from '../../../components/Button/Button';
import routes from '../../../configs';
import Search from '../Search/Search';
import Cart from '../Cart';

const cx = classNames.bind(styles);

function Header() {
    const infoUserContext = useContext(userContext);

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
                            {infoUserContext.isLoggedIn ? (
                                <>
                                    <li className={cx('func-account')}>
                                        <Button className={cx('item-function')} to="/">
                                            {infoUserContext.name}
                                        </Button>
                                        <div className={cx('list-func')}>
                                            {!infoUserContext.isAdmin && (
                                                <Button className={cx('item-func')} to="/profile">
                                                    Thong tin Tai Khoan
                                                </Button>
                                            )}
                                            {infoUserContext.isAdmin ? (
                                                <>
                                                    <Button
                                                        className={cx('item-func')}
                                                        to={routes.routes.adminUser}
                                                    >
                                                        Quản lý người dùng
                                                    </Button>
                                                    <Button
                                                        className={cx('item-func')}
                                                        to={routes.routes.adminProduct}
                                                    >
                                                        Quản lý sản phẩm
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    className={cx('item-func')}
                                                    to={routes.routes.userProduct}
                                                >
                                                    Quản lý sản phẩm
                                                </Button>
                                            )}
                                            <Button
                                                to="/"
                                                className={cx('item-func')}
                                                onClick={infoUserContext.logOut}
                                            >
                                                Đăng xuất
                                            </Button>
                                        </div>
                                    </li>
                                </>
                            ) : (
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
                        <div className={cx('text')}>ShopHL</div>
                    </Button>
                    {/* Search */}
                    <div className={cx('search')}>
                        <Search />
                    </div>

                    {/* Carts */}
                    {infoUserContext.isLoggedIn ? (
                        !infoUserContext.isAdmin && (
                            <Link className={cx('cart')} to="/cart">
                                <Cart />
                            </Link>
                        )
                    ) : (
                        <Link className={cx('cart')} to="/login">
                            <Cart />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
