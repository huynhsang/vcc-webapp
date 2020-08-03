import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { getBadge } from './badge.constant';

const Wrapper = styled.div`
    color: white;
    border-radius: 0.2rem;
    padding: 0 0.3rem;
    line-height: 1.3rem;
    font-size: 0.8rem;
    text-align: center;
    display: inline-block;
`;

const Badge = ({ points = 0 }) => {
    const { t } = useTranslation();

    const badge = getBadge(points);

    const { labelColor, label, level } = badge;

    return (
        <Wrapper style={{ backgroundColor: labelColor }}>
            {t(label, level ? { level } : {})}
        </Wrapper>
    );
};

export default Badge;
