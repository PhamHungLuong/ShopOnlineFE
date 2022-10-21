import classNames from 'classnames/bind';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import Image from '../../../components/Image';
import styles from './Banner.module.scss';
import img1 from '../../../assets/BannerImage/img1.png';
import img2 from '../../../assets/BannerImage/img2.jpg';
import img3 from '../../../assets/BannerImage/img3.jpg';
import img4 from '../../../assets/BannerImage/img4.png';
import img5 from '../../../assets/BannerImage/img5.jpg';
import img6 from '../../../assets/BannerImage/img6.webp';

const cx = classNames.bind(styles);

function Banner() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplaySpeed: 3000,
        autoplay: true,
    };
    return (
        <div className={cx('container')}>
            <div className={cx('slider')}>
                <Slider {...settings}>
                    <Image type="product" alt="image banner" src={img1} />
                    <Image type="product" alt="image banner" src={img2} />
                    <Image type="product" alt="image banner" src={img3} />
                    <Image type="product" alt="image banner" src={img4} />
                    <Image type="product" alt="image banner" src={img5} />
                    <Image type="product" alt="image banner" src={img6} />
                </Slider>
            </div>
        </div>
    );
}

export default Banner;
