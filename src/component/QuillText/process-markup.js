import convert from 'htmr';
import styled from 'styled-components';
import React from 'react';

const QuillParagraphNormalizer = styled.p`
    &[style] {
        overflow-wrap: normal;
    }
`;

const QuillSpanNormalizer = styled.span`
    &[style] {
        display: inline !important;
    }
`;

export const processMarkup = (content, removeBr = false) =>
    convert(content, {
        transform: {
            span: QuillSpanNormalizer,
            p: QuillParagraphNormalizer,
            br: removeBr ? React.Fragment : 'br'
        },
        preserveAttributes: ['br']
    });
