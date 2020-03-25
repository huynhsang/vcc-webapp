import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { badges } from './badge.constant';

const Wrapper = styled.div`
    color: white;
    border-radius: 3px;
    padding: 0 5px;
    font-size: 0.8rem;
    text-align: center;
    display: inline-block;
    line-height:22px;
`;

const Badge = ({ points = 0 }) => {
    const { t } = useTranslation();
    const index = badges.findIndex(badge => points > badge.max);

    const badgeIndex =
        index === 0 ? 0 : index !== -1 ? index - 1 : badges.length - 1;

    const badge = badges[badgeIndex];

    const { labelColor, label, level } = badge;

    return (
        <Wrapper style={{ backgroundColor: labelColor }}>
            {t(label, level ? { level } : {})}
        </Wrapper>
    );
};

export default Badge;
