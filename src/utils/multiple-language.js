import i18n from 'i18next';

export const getNameByLanguage = obj => {
    return obj[i18n.language === 'vi' ? 'nameVi' : 'nameEn'];
};
