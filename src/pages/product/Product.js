/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import styles from './Product.module.scss';
import Image from '../../components/Image';
import Button from '../../components/Button';
import Comment from './Comment/Comment';
import Input from '../../components/Input';
import { userContext } from '../../context/userContext';
import { VALIDATOR_REQUIRE } from '../../services/validators/validator';
import { notifyDisplay } from '../../components/ToastMessage/ToastMessage';

const cx = classNames.bind(styles);

const DUMMY_SIZE = ['M', 'L', 'XL', 'XLL'];

function Product() {
    // const [listSize, setListSize] = useState([]);
    const [activeSize, setActiveSize] = useState();
    const [amount, setAmount] = useState(0);

    const [product, setProduct] = useState();
    const [creator, setCreator] = useState();

    const [comments, setComments] = useState();

    const [commentValue, setCommentValue] = useState('');
    const [isValidComment, setIsValidComment] = useState(false);

    const infoUserContext = useContext(userContext);

    const changeCommentHandler = (e) => {
        setCommentValue(e.target.value);
    };

    const { pid } = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/${pid}`);

                setProduct(response.data.product);
                setCreator(response.data.product.creator);

                //bug
                let tempSize = '';
                for (let i in response.data.product.size) {
                    if (response.data.product.size[i] !== ' ') {
                        tempSize = tempSize + response.data.product.size[i];
                        if (i === response.data.product.size.length - 1) {
                            console.log(tempSize);
                        }
                    } else {
                        tempSize = '';
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/comment/product/${pid}`,
                );

                setComments(response.data.comments);
            } catch (err) {
                console.log(err);
            }
        };

        fetchApi();
    }, []);

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

    const postCommentApiHandler = () => {
        const fetchApi = async () => {
            const response = await axios.post('http://localhost:5000/api/comment', {
                content: commentValue,
                ofProduct: pid,
                creator: '63564694a7f22abbf314299b',
            });

            setComments((prevComments) => {
                return [...prevComments, response.data.comment];
            });
        };

        fetchApi();
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
                        <div className={cx('title')}>{product && product.name}</div>
                        <div className={cx('price')}>{product && product.price}</div>
                        <div className={cx('description')}>{product && product.description}</div>
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
                    <div className={cx('name')}>{creator && creator.name}</div>
                </div>
                <Button primary className={cx('btn')}>
                    More Products
                </Button>
            </div>
            <div className={cx('comment')}>
                <div className={cx('title')}>Đánh giá sản phẩm</div>
                <div className={cx('post-comment')}>
                    <Input
                        className={cx('input')}
                        type="text"
                        element="input"
                        placeholder="Comment here"
                        id="comment"
                        value={commentValue}
                        onChange={changeCommentHandler}
                        getIsValid={setIsValidComment}
                        errorText="Invalid Input, please try again!"
                        validators={[VALIDATOR_REQUIRE()]}
                    />
                    <Button
                        disable={commentValue === '' ? true : false}
                        className={cx('btn-post')}
                        primary
                        onClick={postCommentApiHandler}
                    >
                        Dang binh luan
                    </Button>
                </div>
                <div className={cx('list-comment')}>
                    {comments &&
                        comments.map((comment) => {
                            return (
                                <Comment
                                    key={comment.id}
                                    id={comment.id}
                                    src={comment.creator.image}
                                    name={comment.creator.name}
                                    content={comment.content}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default Product;
