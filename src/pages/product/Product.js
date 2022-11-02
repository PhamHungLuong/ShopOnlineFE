/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import styles from './Product.module.scss';
import Image from '../../components/Image';
import Button from '../../components/Button';
import Comment from './Comment/Comment';
import Input from '../../components/Input';
import { userContext } from '../../context/userContext';
import { cartContext } from '../../context/cartContext';
import { VALIDATOR_REQUIRE } from '../../services/validators/validator';
import { notifyDisplay, ToastMessageContainer } from '../../components/ToastMessage/ToastMessage';
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

    const infoUserContext = useContext(userContext);
    const cartProductContext = useContext(cartContext);

    const notify = notifyDisplay('success', 'Bình luận thành công');
    const notifyInvalidAmount = notifyDisplay('error', 'Số lượng không thể bằng không');
    const notifyCardSuccess = notifyDisplay('success', 'Thêm vào giỏ hàng thành công');
    const notifyMoreProduct = notifyDisplay('error', 'Tính năng đang phát triển');
    const notifyError = notifyDisplay('error', 'Vui long thu lai');

    const changeCommentHandler = useCallback(
        (e) => {
            setCommentValue(e.target.value);
        },
        [commentValue],
    );

    const { pid } = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/${pid}`);

                setProduct(response.data.product);
                setCreator(response.data.product.creator);
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

    const postCommentApiHandler = async () => {
        const response = await axios.post('http://localhost:5000/api/comment', {
            content: commentValue,
            ofProduct: pid,
            creator: infoUserContext.userId,
        });
        setCommentValue('');
        setComments((prevComments) => {
            return [...prevComments, response.data.comment];
        });
        notify();
    };

    const deleteCommentApiHandler = (commentDeleteId) => {
        let currentComments = [];
        comments.forEach((comment) => {
            if (comment.id !== commentDeleteId) {
                currentComments.push(comment);
            }
        });

        setComments(currentComments);
    };

    const addProductToCard = async () => {
        if (amount === 0) {
            notifyInvalidAmount();
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/cart/add', {
                    amount: amount,
                    productId: pid,
                    owner: infoUserContext.userId,
                });
                notifyCardSuccess();
                cartProductContext.addCart(response.data.product);
            } catch (err) {
                notifyError();
            }
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('product')}>
                <div className={cx('image-product')}>
                    {!!product && (
                        <Image className={cx('image')} src={product.image} type="product" />
                    )}
                </div>
                <div className={cx('content')}>
                    <div>
                        <div className={cx('title')}>{product && product.name}</div>
                        <div className={cx('price')}>Giá: {product && product.price} VND</div>
                        <div className={cx('description')}>
                            Mô tả: {product && product.description}
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
                        {!infoUserContext.isAdmin && (
                            <div className={cx('amount')}>
                                <Button className={cx('btn-number')} onClick={nextAmountHandler}>
                                    +
                                </Button>
                                <span className={cx('number')}>{amount}</span>
                                <Button className={cx('btn-number')} onClick={prevAmountHandler}>
                                    -
                                </Button>
                            </div>
                        )}
                    </div>
                    {infoUserContext.isLoggedIn ? (
                        !infoUserContext.isAdmin && (
                            <Button className={cx('btn-addCart')} onClick={addProductToCard}>
                                Thêm vào giỏ hàng
                            </Button>
                        )
                    ) : (
                        <Button className={cx('btn-addCart')} to="/login">
                            Đăng nhập để thêm vào giỏ hàng
                        </Button>
                    )}
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
                <Button
                    primary
                    className={cx('btn')}
                    onClick={() => {
                        notifyMoreProduct();
                    }}
                >
                    More Products
                </Button>
            </div>
            <div className={cx('comment')}>
                <div className={cx('title')}>Đánh giá sản phẩm</div>
                {infoUserContext.isLoggedIn && (
                    <div className={cx('post-comment')}>
                        <Input
                            className={cx('input')}
                            type="text"
                            element="input"
                            placeholder="Comment here"
                            id="comment"
                            value={commentValue}
                            onChange={changeCommentHandler}
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
                )}
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
                                    deleteComment={deleteCommentApiHandler}
                                    creatorId={comment.creator.id}
                                />
                            );
                        })}
                </div>
            </div>
            <ToastMessageContainer />
        </div>
    );
}

export default Product;
