import classNames from 'classnames/bind';
import PropType from 'prop-types';

import styles from './Image.module.scss';
import userImage from '../../assets/userDefault.jpg';
import productImage from '../../assets/productDefault.png';

const cx = classNames.bind(styles);

function Image({ type, src, alt, className, ...props }) {
    let defaultSrc;
    if (!src) {
        if (type === 'product') {
            defaultSrc = productImage;
        } else if (type === 'user') {
            defaultSrc = userImage;
        }
    }

    const srcImage = !src ? defaultSrc : src;

    return (
        <img
            className={`${cx('container')} ${className} ${!(type = 'user') && cx('user')}`}
            src={srcImage}
            alt={alt}
            {...props}
        />
    );
}

Image.PropType = {
    type: PropType.string,
    src: PropType.string.isRequired,
    alt: PropType.string.isRequired,
    className: PropType.string.isRequired,
};

export default Image;
