import PropTypes from 'prop-types';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './User.module.scss';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import {
    notifyDisplay,
    ToastMessageContainer,
} from '../../../components/ToastMessage/ToastMessage';

const cx = classNames.bind(styles);

function User({ id, name, src, deleteUser }) {
    const notifyError = notifyDisplay('error', 'Vui long thu lai');
    const notifySuccessDelete = notifyDisplay('success', 'Xoa nguoi dung thanh cong');

    const deleteUserHandler = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/user/${id}`);

            deleteUser(id);
            notifySuccessDelete();
        } catch (err) {
            notifyError();
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('user')}>
                <Image type="user" className={cx('image')} src={src} />
                <div className={cx('name')}>{name}</div>
                <Button className={cx('btn')} onClick={deleteUserHandler}>
                    Xóa Người Dùng
                </Button>
            </div>
            <ToastMessageContainer />
        </div>
    );
}

PropTypes.User = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string,
    deleteUser: PropTypes.func,
};

export default User;
