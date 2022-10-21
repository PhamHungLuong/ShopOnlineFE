import classNames from 'classnames/bind';
import PropsType from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './LoadingSpinner.module.scss';

const cx = classNames.bind(styles);

function LoadingSpinner({ className }) {
    return (
        <div className={`${cx('container')} ${className}`}>
            <FontAwesomeIcon className={cx('icon')} icon={faSpinner} />
        </div>
    );
}

LoadingSpinner.propsType = {
    classNames: PropsType.string,
};

export default LoadingSpinner;
