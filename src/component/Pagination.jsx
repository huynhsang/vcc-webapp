import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';

const Wrapper = styled.div`
    .paginations {
        display: flex;
        justify-content: ${p => p.justifyContent || 'end'};
        margin: 15px -5px 15px 0;
        user-select:none;

        & li {
            margin: 0 5px;
            & a {
                background-color: white;
                color : ${p => p.color};
                padding: 5px 10px;
                text-align: center;
                box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
            }
        }

        & .active a {
            background-color: ${p => p.color || '#007ad9'};
            color: white;
        }

        & .break-me a {
            background-color: unset;
            box-shadow: unset;
        }

        & .next.disabled {
            opacity: 0.5;
            & a {
                cursor: default;
            }
        }

        & .previous.disabled {
            opacity: 0.5;

            & a {
                cursor: default;
            }
        }
    }
`;

const Pagination = ({ nbPages, activePage, onPageChange, justifyContent, color }) => {
    const { t } = useTranslation();
    return (
        <Wrapper justifyContent={justifyContent} color={color}>
            <ReactPaginate
                previousLabel={`<< ${t('pagination_previous')}`}
                nextLabel={`${t('pagination_next')} >>`}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={nbPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={onPageChange}
                containerClassName={'paginations'}
                subContainerClassName={'TESTT'}
                activeClassName={'active'}
                disabledClassName={'disabled'}
            />
        </Wrapper>
    );
};

export default Pagination;
