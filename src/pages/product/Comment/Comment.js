import classNames from 'classnames/bind';
import PropsType from 'prop-types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import styles from './Comment.module.scss';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

const cx = classNames.bind(styles);

function Comment({ src, name, content }) {
    const [isShowFunc, setIsShowFunc] = useState(false);
    const [isShowEditComment, setIsShowEditComment] = useState(false);

    const showFuncHandler = () => {
        setIsShowFunc(!isShowFunc);
    };

    const showEditCommentHandler = () => {
        showFuncHandler();
        setIsShowEditComment(true);
    };

    const closeEditCommentHander = () => {
        setIsShowEditComment(false);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('comment')}>
                <Image
                    className={cx('image')}
                    type="user"
                    src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                />
                <div className={cx('info')}>
                    <div className={cx('name')}>Pham Hung Luong</div>
                    <div className={cx('content')}>Ao dep qua!!!</div>
                </div>
            </div>
            {true && (
                <div className={cx('func')}>
                    <div className={cx('icon')} onClick={showFuncHandler}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                    {isShowFunc && (
                        <div className={cx('btn-comment')}>
                            <Button className={cx('btn')} onClick={showEditCommentHandler}>
                                Chỉnh Sửa Bình Luận
                            </Button>
                            <Button className={cx('btn')}>Xóa Bình Luận</Button>
                        </div>
                    )}
                </div>
            )}
            {isShowEditComment && (
                <div className={cx('input-editor')}>
                    <Input element="input" />
                    <Button primary className={cx('btn')} onClick={closeEditCommentHander}>
                        Huy
                    </Button>
                    <Button primary className={cx('btn')}>
                        Xac Nhan
                    </Button>
                </div>
            )}
        </div>
    );
}

Comment.propsType = {
    src: PropsType.string.isRequired,
    name: PropsType.string.isRequired,
    content: PropsType.string.isRequired,
};

export default Comment;
