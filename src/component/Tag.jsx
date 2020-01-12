import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

import { getNameByLanguage } from '../utils/multiple-language';

const Wrapper = styled.div`
    transition: border 0.2s linear, color 0.2s linear,
        background-color 0.2s linear;
    border-radius: 2px;
    font-size: 11px;
    font-weight: 400;
    margin-bottom: 6px;
    margin-right: 6px;
    display: block;
    float: left;
    padding: 0 6px;
    cursor: pointer;

    border: 1px solid;
    border-color: ${p => (p.isActive ? '#6a758c' : '#e1e3e3')};
    color: ${p => (p.isActive ? '#fff' : '#7c7f85')};
    background-color: ${p => p.isActive && '#6a758c'};

    &:hover {
        border-color: ${p => !p.isActive && '#2d6ff7'};
        background-color: ${p => !p.isActive && '#2d6ff7'};
        color: #fff;
    }
`;

const Tag = ({ tag, history, location }) => {
    const { pathname, search } = location;
    const { show, text, tags } = qs.parse(search.substr(1));

    const ids = tags ? tags.split(',') : [];

    const onClick = () => {
        const params = { page: 1 };
        if (/homes\/questions/.test(pathname)) {
            Object.assign(params, { show, text });
            const index = ids.findIndex(id => id === tag.id);
            if (index !== -1) {
                ids.splice(index, 1);
            } else {
                ids.push(tag.id);
            }
        }
        params.tags = ids.join(',');
        const url = `/questions?${qs.stringify(params)}`;
        history.push(url);
    };

    return (
        <Wrapper isActive={ids.includes(tag.id)} onClick={onClick}>
            {getNameByLanguage(tag)}
        </Wrapper>
    );
};

export default withRouter(Tag);
