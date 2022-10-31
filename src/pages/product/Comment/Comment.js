import classNames from 'classnames/bind';
import PropsType from 'prop-types';
import { Fragment, useState, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import styles from './Comment.module.scss';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { userContext } from '../../../context/userContext';
import { VALIDATOR_REQUIRE } from '../../../services/validators/validator';
import {
    notifyDisplay,
    ToastMessageContainer,
} from '../../../components/ToastMessage/ToastMessage';

const cx = classNames.bind(styles);

function Comment({ id, src, name, content, deleteComment, creatorId }) {
    const [valueComment, setValueComment] = useState(content);
    const [isShowFunc, setIsShowFunc] = useState(false);
    const [isShowEditComment, setIsShowEditComment] = useState(false);
    const [newValueComment, setNewValueComment] = useState(content);

    const infoUser = useContext(userContext);

    const notifySuccess = notifyDisplay('success', 'Chỉnh sửa bình luận thành công');
    const notifyDelete = notifyDisplay('success', 'Xóa bình luận thành công ');
    const notifyError = notifyDisplay('error', 'Vui long thu lai')

    const showFuncHandler = () => {
        setIsShowFunc(!isShowFunc);
    };

    const changeCommentHandler = (e) => {
        setNewValueComment(e.target.value);
    };

    const showEditCommentHandler = () => {
        showFuncHandler();
        setIsShowEditComment(true);
    };

    const closeEditCommentHandler = () => {
        setIsShowEditComment(false);
    };

    const editCommentHandler = async () => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/comment/${id}`, {
                content: newValueComment,
            });

            setValueComment((preValue) => {
                return (preValue = response.data.comment.content);
            });

            notifySuccess();
            closeEditCommentHandler();
        } catch (err) {
            notifyError()
        }
    };

    const deleteCommentApi = async () => {
        try {
            deleteComment(id);
            axios.delete(`http://localhost:5000/api/comment/${id}`);
            notifyDelete();
            showFuncHandler();
        } catch (err) {
            notifyError()
        }
    };

    return (
        <Fragment>
            <div className={cx('container')}>
                <div className={cx('comment')}>
                    <Image className={cx('image')} type="user" src={src} />
                    <div className={cx('info')}>
                        <div className={cx('name')}>{name}</div>
                        <div className={cx('content')}>{valueComment}</div>
                    </div>
                </div>
                {creatorId === infoUser.userId && (
                    <div className={cx('func')}>
                        <div className={cx('icon')} onClick={showFuncHandler}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                        {isShowFunc && (
                            <div className={cx('btn-comment')}>
                                <Button className={cx('btn')} onClick={showEditCommentHandler}>
                                    Chỉnh Sửa Bình Luận
                                </Button>
                                <Button className={cx('btn')} onClick={deleteCommentApi}>
                                    Xóa Bình Luận
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                {isShowEditComment && (
                    <div className={cx('input-editor')}>
                        <Input
                            element="input"
                            type="text"
                            id="comment"
                            onChange={changeCommentHandler}
                            value={newValueComment}
                            errorText="At lease 1 characters"
                            validators={[VALIDATOR_REQUIRE()]}
                        />
                        <Button primary className={cx('btn')} onClick={closeEditCommentHandler}>
                            Huy
                        </Button>
                        <Button
                            primary
                            className={cx('btn')}
                            disable={
                                newValueComment === content || valueComment === '' ? true : false
                            }
                            onClick={editCommentHandler}
                        >
                            Xac Nhan
                        </Button>
                    </div>
                )}
            </div>
            <ToastMessageContainer />
        </Fragment>
    );
}

Comment.propsType = {
    id: PropsType.string.isRequired,
    src: PropsType.string.isRequired,
    name: PropsType.string.isRequired,
    content: PropsType.string.isRequired,
};

export default Comment;
