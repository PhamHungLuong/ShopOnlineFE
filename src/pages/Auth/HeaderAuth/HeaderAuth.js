import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import styles from './HeaderAuth.module.scss';

const cx = classNames.bind(styles);

function HeaderAuth({ title }) {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('title')}>{title}</div>
                <a href="/" className={cx('help')}>
                    <p>back</p>
                    <FontAwesomeIcon icon={faRightToBracket} />
                </a>
            </div>
        </div>
    );
}

HeaderAuth.propTypes = {
    title: PropTypes.string.isRequired,
};

export default HeaderAuth;
