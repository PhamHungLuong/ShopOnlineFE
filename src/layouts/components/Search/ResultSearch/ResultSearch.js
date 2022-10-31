import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './ResultSearch.module.scss';

const cx = classNames.bind(styles);

function ResultSearch({ content, to, onClick }) {
    return (
        <Link className={cx('container')} to={`/product/${to}`} onClick={onClick}>
            {content}
        </Link>
    );
}

ResultSearch.propTypes = {
    content: PropTypes.string.isRequired,
    to: PropTypes.string,
};

export default ResultSearch;
