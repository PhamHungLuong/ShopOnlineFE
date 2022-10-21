import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Product.module.scss';
import Image from '../../components/Image';
import Button from '../../components/Button';
import Comment from './Comment/Comment';
import Input from '../../components/Input';
import { VALIDATOR_REQUIRE } from '../../services/validators/validator';

const cx = classNames.bind(styles);

const DUMMY_SIZE = ['M', 'L', 'XL', 'XLL'];

function Product() {
    const [activeSize, setActiveSize] = useState();
    const [amount, setAmount] = useState(0);

    const activeSizeHandler = (index) => {
        setActiveSize(index);
    };

    const prevAmountHandler = () => {
        setAmount((prev) => {
            if (prev === 0) {
                return prev;
            } else {
                return prev - 1;
            }
        });
    };

    const nextAmountHandler = () => {
        setAmount((prev) => prev + 1);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('product')}>
                <div className={cx('image-product')}>
                    <Image
                        className={cx('image')}
                        src="https://www.lamdieu.com/wp-content/uploads/2021/01/dang-yeu-voi-mau-vay-hoa-nhi.jpg"
                        type="product"
                    />
                </div>
                <div className={cx('content')}>
                    <div>
                        <div className={cx('title')}>Ao dep thi oi doi oi</div>
                        <div className={cx('price')}>500000 VND</div>
                        <div className={cx('description')}>
                            Mô tả : Ao dai dep thi oi doi oi luon
                        </div>
                        <div className={cx('list-size')}>
                            {DUMMY_SIZE.map((size, index) => {
                                return (
                                    <Button
                                        key={index}
                                        onClick={() => {
                                            activeSizeHandler(index);
                                        }}
                                        className={`${cx('item-size')} ${
                                            activeSize === index && cx('item-size--active')
                                        } `}
                                    >
                                        {size}
                                    </Button>
                                );
                            })}
                        </div>
                        <div className={cx('amount')}>
                            <Button className={cx('btn-number')} onClick={nextAmountHandler}>
                                +
                            </Button>
                            <span className={cx('number')}>{amount}</span>
                            <Button className={cx('btn-number')} onClick={prevAmountHandler}>
                                -
                            </Button>
                        </div>
                    </div>
                    <Button className={cx('btn-addCart')}>Thêm vào giỏ hàng</Button>
                </div>
            </div>
            <div className={cx('creator')}>
                <div className={cx('info')}>
                    <Image
                        type="user"
                        className={cx('avatar')}
                        src="https://anhdephd.vn/wp-content/uploads/2022/05/anh-gai-xinh-de-thuong.jpg"
                    />
                    <div className={cx('name')}>Pham Hung Luong</div>
                </div>
                <Button primary className={cx('btn')}>
                    More Products
                </Button>
            </div>
            <div className={cx('comment')}>
                <div className={cx('title')}>Đánh giá sản phẩm</div>
                <div className={cx('post-comment')}>
                    <Input className={cx('input')} element="input" placeholder="Comment here" />
                    <Button className={cx('btn-post')} primary>
                        Dang binh luan
                    </Button>
                </div>
                <div className={cx('list-comment')}>
                    <Comment />
                    <Comment />
                    <Comment />
                </div>
            </div>
        </div>
    );
}

export default Product;
