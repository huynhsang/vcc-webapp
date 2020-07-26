import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 20px;
    line-height: 20px;
`;

const NewsTitle = styled.div`
    font-weight: 600;
    margin-bottom: 3px;
`;

const NewsDescription = styled.div`
    font-size: 0.9em;
    line-height: 18px;
`;

const BreakingNews = ({ news }) => {
    return (
        <Wrapper>
            <NewsTitle>{news.title}</NewsTitle>
            <NewsDescription>{news.description}</NewsDescription>
        </Wrapper>
    );
};

export default BreakingNews;
