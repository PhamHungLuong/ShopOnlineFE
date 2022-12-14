import { faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import useDebounce from '../../../Hooks/useDebounce/useDebounce';
import Button from '../../../components/Button/Button';
import styles from './Search.module.scss';
import ResultSearch from './ResultSearch/ResultSearch';
import {
    notifyDisplay,
    ToastMessageContainer,
} from '../../../components/ToastMessage/ToastMessage';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isShowResult, setIsShowResult] = useState(false);
    const inputRef = useRef();

    const debouncedValue = useDebounce(searchValue, 500);
    const notifyError = notifyDisplay('error', 'Không thể tìm kiếm, vui lòng thử lại ');

    useEffect(() => {
        const fetchApi = async () => {
            if (!debouncedValue.trim()) {
                setSearchResults([]);
                return;
            }
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/product/search/?product=${debouncedValue}`,
                );
                setSearchResults(response.data.products);
            } catch (err) {
                notifyError();
            }
        };

        fetchApi();
    }, [debouncedValue]);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        setIsShowResult(true);
        if (e.target.value === '') {
            setSearchResults([]);
        }
    };

    const clearSearch = () => {
        setSearchValue('');
        setSearchResults([]);
    };

    const searchHandle = () => {
        console.log('search');
    };

    return (
        <div className={cx('container')}>
            <label className={cx('search')}>
                <input
                    className={cx('input')}
                    ref={inputRef}
                    placeholder="Search name product ?"
                    onChange={handleChange}
                    onFocus={() => {
                        setIsShowResult(true);
                    }}
                    value={searchValue}
                />
                <div className={cx('btn')}>
                    {searchValue && (
                        <Button className={cx('btn-delete')} onClick={clearSearch}>
                            <FontAwesomeIcon icon={faX} />
                        </Button>
                    )}
                    {/* {isLoading && <LoadingSpinner className={cx('spinner')} />} */}
                    <Button className={cx('btn-search')} primary onClick={searchHandle}>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </div>
            </label>
            {searchValue && isShowResult && (
                <div className={cx('wrapper')}>
                    {searchResults.map((result, index) => {
                        return (
                            <ResultSearch
                                key={index}
                                to={result.id}
                                content={result.name}
                                onClick={() => {
                                    setIsShowResult(false);
                                }}
                            />
                        );
                    })}
                </div>
            )}
            <ToastMessageContainer />
        </div>
    );
}

export default Search;
