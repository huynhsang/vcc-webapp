import i18n from 'i18next';

export const getUserName = (user) => {
    if (!user) {
        return '';
    }

    const {
        username = '',
        lastName = '',
        firstName = '',
        showRealName = ''
    } = user;

    if (showRealName) {
        if (i18n.language === 'vi') {
            return `${lastName} ${firstName}`;
        }

        return `${firstName} ${lastName}`;
    }

    return username;
};
