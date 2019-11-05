import React from 'react';
import { useTranslation } from 'react-i18next';

import { badges } from './badge.constant';

const Badge = ({ points = 0 }) => {
    const { t } = useTranslation();
    const index = badges.findIndex(badge => points > badge.max);

    const badgeIndex =
        index === 0 ? 0 : index !== -1 ? index - 1 : badges.length - 1;

    const badge = badges[badgeIndex];

    return (
        <span
            className="badge-span"
            style={{ backgroundColor: badge.labelColor }}
        >
            {t(badge.label)}
        </span>
    );
};

export default Badge;
