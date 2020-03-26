import styled, { css } from 'styled-components';

import { createMediaTemplate } from '../utils/css-tools';
const media = createMediaTemplate();

export const defaultWrapperCss = css`
    max-width: 1280px;
    width: 100%;
    padding: 20px;
    margin: 0 auto;
    ${media.mobileLandscape`
        padding: 10px;
    `}
    ${media.mobile`
        padding: 5px;
    `}
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
