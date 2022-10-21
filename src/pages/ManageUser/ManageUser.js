import classNames from 'classnames/bind';

import styles from './ManageUser.module.scss';
import Image from '../../components/Image';
import Button from '../../components/Button';

const cx = classNames.bind(styles);

function ManageUser() {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>Danh sách người dùng</div>
            <div className={cx('content')}>
                <div className={cx('user')}>
                    <Image
                        type="user"
                        className={cx('image')}
                        src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                    />
                    <Button className={cx('btn')}>Xóa Người Dùng</Button>
                </div>
                <div className={cx('user')}>
                    <Image
                        type="user"
                        className={cx('image')}
                        src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                    />
                    <Button className={cx('btn')}>Xóa Người Dùng</Button>
                </div>
                <div className={cx('user')}>
                    <Image
                        type="user"
                        className={cx('image')}
                        src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                    />
                    <Button className={cx('btn')}>Xóa Người Dùng</Button>
                </div>
                <div className={cx('user')}>
                    <Image
                        type="user"
                        className={cx('image')}
                        src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                    />
                    <Button className={cx('btn')}>Xóa Người Dùng</Button>
                </div>
                <div className={cx('user')}>
                    <Image
                        type="user"
                        className={cx('image')}
                        src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                    />
                    <Button className={cx('btn')}>Xóa Người Dùng</Button>
                </div>
                <div className={cx('user')}>
                    <Image
                        type="user"
                        className={cx('image')}
                        src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                    />
                    <Button className={cx('btn')}>Xóa Người Dùng</Button>
                </div>
                <div className={cx('user')}>
                    <Image
                        type="user"
                        className={cx('image')}
                        src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                    />
                    <Button className={cx('btn')}>Xóa Người Dùng</Button>
                </div>
                <div className={cx('user')}>
                    <Image
                        type="user"
                        className={cx('image')}
                        src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                    />
                    <Button className={cx('btn')}>Xóa Người Dùng</Button>
                </div>
                <div className={cx('user')}>
                    <Image
                        type="user"
                        className={cx('image')}
                        src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                    />
                    <Button className={cx('btn')}>Xóa Người Dùng</Button>
                </div>
            </div>
        </div>
    );
}

export default ManageUser;
