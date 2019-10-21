import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ShowFilter = [
    { value: '', label: 'common_all' },
    { value: 'recent-questions', label: 'common_recent' },
    { value: 'most-answered', label: 'mainpage_most_answerd' },
    { value: 'most-visited', label: 'mainpage_most_visited' },
    { value: 'most-voted', label: 'mainpage_most_voted' },
    { value: 'no-answers', label: 'mainpage_no_answers' }
];

const TopNav = ({ show }) => {
    const { t } = useTranslation();
    const uLRef = React.useRef();
    const liRef = React.useRef();

    const [limitIndex, setLimitIndex] = React.useState(ShowFilter.length);
    const [toReduceLimit, setToReduceLimit] = React.useState(false);

    const verifyOffsetHeight = () => {
        if (uLRef && liRef && uLRef.current && liRef.current) {
            if (uLRef.current.offsetHeight >= liRef.current.offsetHeight * 2) {
                setToReduceLimit(true);
            }
        }
    };

    React.useEffect(() => {
        verifyOffsetHeight();
    }, [uLRef, liRef, limitIndex]);

    const resetCalcul = () => {
        setLimitIndex(ShowFilter.length);
        verifyOffsetHeight();
    };

    React.useEffect(() => {
        window.addEventListener('resize', resetCalcul);
        return () => {
            window.removeEventListener('resize', resetCalcul);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (toReduceLimit) {
            setLimitIndex(state => state - 1);
            setToReduceLimit(false);
        }
    }, [toReduceLimit]);

    const shownList = ShowFilter.slice(0, limitIndex).map((val, index) => (
        <li
            key={val.value}
            ref={index === 0 ? liRef : null}
            className={
                show === val.value || (!show && !val.value) ? 'active-tab' : ''
            }
        >
            <Link to={`?show=${val.value}`}>{t(val.label)}</Link>
        </li>
    ));

    const hideList = ShowFilter.slice(limitIndex, ShowFilter.length).map(
        val => (
            <li
                key={val.value}
                className={show === val.value ? 'active-tab' : ''}
            >
                <Link to={`?show=${val.value}`}>{t(val.label)}</Link>
            </li>
        )
    );

    return (
        <div className="menu-tabs">
            <ul className="menu flex" ref={uLRef}>
                {shownList}
                {!!hideList.length && (
                    <li className="flexMenu-viewMore">
                        <a title="">
                            <i className="icon-dot-3" />
                        </a>
                        <ul
                            className="flexMenu-popup"
                            style={{
                                display: 'none',
                                position: 'absolute'
                            }}
                        >
                            {hideList}
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default TopNav;
