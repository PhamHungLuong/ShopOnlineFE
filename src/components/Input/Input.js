import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './Input.module.scss';
import { validate } from '../../services/validators/validator';

const cx = classNames.bind(styles);

function Input({
    element,
    id,
    type,
    label,
    validators,
    errorText,
    placeholder,
    className,
    value,
    onChange,
    rows,
    disabled,
}) {
    const [isValid, setIsValid] = useState(true);

    const validatorHandler = () => {
        setIsValid(validate(value, validators));
    };

    const children =
        element === 'input' ? (
            <input
                id={id}
                className={`${cx('input')} ${className}`}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={validatorHandler}
                disabled={disabled}
            />
        ) : (
            <textarea
                id={id}
                rows={rows || 3}
                className={`${cx('textarea')} ${className}`}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={validatorHandler}
                disabled={disabled}
            />
        );

    return (
        <div className={`${cx('container')} ${className}`}>
            <label className={cx('header')}>{label}</label>
            {children}
            {!isValid && <span className={cx('error-text')}>{errorText}</span>}
        </div>
    );
}

Input.propTypes = {
    element: PropTypes.string.isRequired,
    id: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    validators: PropTypes.array,
    errorText: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    rows: PropTypes.any,
    disabled: PropTypes.any,
};

export default Input;
