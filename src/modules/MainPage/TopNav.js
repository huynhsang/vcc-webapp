import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';

const ShowFilter = [
    { value: 'recent-questions', label: 'mainpage_recent_question' },
    { value: 'most-answered', label: 'mainpage_most_answerd' },
    { value: 'most-visited', label: 'mainpage_most_visited' },
    { value: 'most-voted', label: 'mainpage_most_voted' },
    { value: 'no-answers', label: 'mainpage_no_answers' },
];

const TopNav = ({ show }) => {
    const { t } = useTranslation();

    //To do: Auto Resize
    const [limitIndex, setLimitIndex] = React.useState(3);
    const uLRef = React.useRef();

    const shownList = ShowFilter.slice(0, limitIndex).map(val => (
        <li key={val.value} className={show === val.value ? 'active-tab' : ''}>
            <Link to={`?show=${val.value}`}>{t(val.label)}</Link>
        </li>
    ));

    const hideList = ShowFilter.slice(limitIndex, 5).map(val => (
        <li key={val.value} className={show === val.value ? 'active-tab' : ''}>
            <Link to={`?show=${val.value}`}>{t(val.label)}</Link>
        </li>
    ));

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
                                position: 'absolute',
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
