export const badges = [
    {
        label: 'badges_expert',
        labelColor: 'rgb(217, 163, 74, 0.99)'
    },
    {
        max: 1999,
        level: 3,
        label: 'badges_professional',
        labelColor: 'rgb(222, 43, 43, 0.99)'
    },
    {
        max: 1119,
        level: 2,
        label: 'badges_professional',
        labelColor: 'rgb(222, 43, 43, 0.99)'
    },
    {
        max: 849,
        level: 1,
        label: 'badges_professional',
        labelColor: 'rgb(222, 43, 43, 0.99)'
    },
    {
        max: 549,
        level: 3,
        label: 'badges_intermediate',
        labelColor: 'rgba(60, 153, 61, 0.99)'
    },
    {
        max: 299,
        level: 2,
        label: 'badges_intermediate',
        labelColor: 'rgba(60, 153, 61, 0.99)'
    },
    {
        max: 149,
        level: 1,
        label: 'badges_intermediate',
        labelColor: 'rgba(60, 153, 61, 0.99)'
    },
    {
        max: 49,
        label: 'badges_beginner',
        labelColor: 'rgb(13, 14, 17, 0.99)'
    }
];

export const getBadge = (points) => {
    const index = badges.findIndex((badge) => points > badge.max);

    const badgeIndex =
        index === 0 ? 0 : index !== -1 ? index - 1 : badges.length - 1;

    return badges[badgeIndex];
};
