import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    children,
    href,
    to,
    onClick,
    className,
    text,
    primary = false,
    disable = false,
    ...passprops
}) {
    let Component = 'button';

    const props = {
        onClick,
        passprops,
    };

    if (to) {
        Component = Link;
        props.to = to;
    }

    if (href) {
        Component = 'a';
        props.href = href;
    }

    return (
        <Component
            className={`${className} ${cx('container')} ${primary && cx('primary')} ${
                disable && cx('disable')
            }`}
            {...props}
            {...props.passprops}
        >
            {children}
        </Component>
    );
}

Button.propTypes = {
    children: PropTypes.any.isRequired,
    onClick: PropTypes.func,
    href: PropTypes.string,
    to: PropTypes.string,
    className: PropTypes.string,
    text: PropTypes.string,
    primary: PropTypes.bool,
    disable: PropTypes.bool,
};

export default Button;
