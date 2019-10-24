import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';

const Wrapper = styled.div`
    .paginations {
        display: flex;
        justify-content: end;
        margin: 15px -5px 15px 0;

        & li {
            margin: 0 5px;
            & a {
                background-color: white;
                padding: 5px 10px;
                text-align: center;
                box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
            }
        }

        & .active a{
            background-color: #007ad9;
            color: white;
        }

        & .break-me a {
            background-color: unset;
            box-shadow: unset;
        }
    }
`;

const Pagination = ({ nbPages, activePage, onPageChange }) => {
    const { t } = useTranslation();
    return (
        <Wrapper>
            <ReactPaginate
                previousLabel={`<< ${t('pagination_previous')}`}
                nextLabel={`${t('pagination_next')} >>`}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={nbPages}
                marginPagesDisplayed={activePage}
                pageRangeDisplayed={5}
                onPageChange={onPageChange}
                containerClassName={'paginations'}
                subContainerClassName={'TESTT'}
                activeClassName={'active'}
            />
        </Wrapper>
    );
};

export default Pagination;
