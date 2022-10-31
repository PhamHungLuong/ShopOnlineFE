import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './ManageUser.module.scss';
import User from './User/User';
import { notifyDisplay, ToastMessageContainer } from '../../components/ToastMessage/ToastMessage';

const cx = classNames.bind(styles);

function ManageUser() {
    const [users, setUsers] = useState();

    const notifyError = notifyDisplay('error', 'Vui long thu lai');

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin');

                setUsers(response.data.users);
            } catch (err) {
                notifyError();
            }
        };

        fetchApi();
    }, []);

    const deleteUserHandler = (userId) => {
        let currentUser = [];
        users.forEach((user) => {
            if (user.id !== userId) {
                currentUser.push(user);
            }
        });

        setUsers(currentUser);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>Danh sách người dùng</div>
            <div className={cx('content')}>
                {users &&
                    users.map((user) => {
                        return (
                            <User
                                id={user.id}
                                key={user.id}
                                name={user.name}
                                src={user.image}
                                deleteUser={deleteUserHandler}
                            />
                        );
                    })}
            </div>
            <ToastMessageContainer />
        </div>
    );
}

export default ManageUser;
