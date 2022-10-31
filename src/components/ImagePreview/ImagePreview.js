import classNames from 'classnames/bind';
import styles from './ImagePreview.module.scss';
import { useState, useEffect, useRef } from 'react';

import Button from '../Button';
import ImageDefault from '../../assets/userDefault.jpg';

const cx = classNames.bind(styles);

function ImagePreview({ getFileImage, src }) {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState(src);
    const [fileUpload, setFileUpload] = useState();
    const InputImageRef = useRef();

    useEffect(() => {
        if (!selectedFile) {
            setSelectedFile(undefined);
            return;
        }

        let fileReader = new FileReader();
        fileReader.readAsDataURL(selectedFile);

        fileReader.onload = () => {
            setFileUpload(fileReader.result);
            getFileImage(fileUpload);
        };

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        //  leak memory
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    const previewHandler = () => {
        InputImageRef.current.click();
    };

    return (
        <div className={cx('container')}>
            {!preview && src ? (
                <img className={cx('image')} src={ImageDefault} alt="user default" />
            ) : (
                <img className={cx('image')} src={src} alt="user default" />
            )}
            <Button className={cx('btn')} onClick={previewHandler}>
                Tai Anh Len
            </Button>
            <input
                ref={InputImageRef}
                className={cx('input')}
                type="file"
                accept=".jpg, .png, .jpeg"
                onChange={onSelectFile}
            />
        </div>
    );
}

export default ImagePreview;
