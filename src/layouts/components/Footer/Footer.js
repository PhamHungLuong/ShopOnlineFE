import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('list-policy')}>
                    <div className={cx('item-policy')}>CHÍNH SÁCH BẢO MẬT</div>
                    <div className={cx('item-policy')}>QUY CHẾ HOẠT ĐỘNG</div>
                    <div className={cx('item-policy')}>CHÍNH SÁCH VẬN CHUYỂN</div>
                    <div className={cx('item-policy')}>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</div>
                </div>
                <div className={cx('name')}>Công ty TNHH Shopee</div>
                <div className={cx('address')}>
                    Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc
                    Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 -
                    Email: cskh@hotro.shopee.vn Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí -
                    Điện thoại liên hệ: 024 73081221 (ext 4678) Mã số doanh nghiệp: 0106773786 do Sở
                    Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015 © 2015 - Bản quyền thuộc
                    về Công ty TNHH Shopee
                </div>
            </div>
        </div>
    );
}

export default Footer;
