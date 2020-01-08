import styled, { css } from 'styled-components';

export const defaultWrapperCss = css`
    max-width: 1280px;
    width: 100%;
    padding: 20px;
    margin: 0 auto;
`;

export const DefaultWrapper = styled.div`
    ${defaultWrapperCss}
`;


export const rowCss = css`
    &:after {
        content: '';
        clear: both;
        display: table;
    }
`;

export const RowWrapper = styled.div`
    ${rowCss}
`;

export const WidthWrapper = styled.div`
    width: ${p => p.width};
`;
