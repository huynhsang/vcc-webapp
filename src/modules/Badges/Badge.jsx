import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { badges } from './badge.constant';

const Wrapper = styled.span`
    color: white;
    border-radius: 2px;
    padding: 2px 5px;
    font-size: 11px;
    text-align: center;
`;

const Badge = ({ points = 0 }) => {
    const { t } = useTranslation();
    const index = badges.findIndex(badge => points > badge.max);

    const badgeIndex =
        index === 0 ? 0 : index !== -1 ? index - 1 : badges.length - 1;

    const badge = badges[badgeIndex];

    return (
        <Wrapper style={{ backgroundColor: badge.labelColor }}>
            {t(badge.label)}
        </Wrapper>
    );
};

export default Badge;
