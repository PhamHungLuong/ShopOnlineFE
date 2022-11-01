import classNames from 'classnames/bind';
import styles from './ImagePreview.module.scss';
import { useState, useEffect, useRef } from 'react';

import Button from '../Button';

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
        };

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div>
                <img
                    className={cx('image')}
                    onChange={getFileImage(fileUpload)}
                    src={preview}
                    alt="Chưa có ảnh"
                />
            </div>
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
