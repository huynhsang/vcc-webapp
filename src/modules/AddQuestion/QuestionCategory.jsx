import React from 'react';
import styled from 'styled-components';
import questionMark from '../../images/QuestionIcon.png';

import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

const Image = styled.img`
    width: 30%;
    max-width: 190px;
`;

const RightWrapper = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    min-height: 0;
    padding-left: 20px;
`;

const QuestionCategory = ({ categories, categoryId, setCategoryId }) => {
    const { t } = useTranslation();

    if (!categories) {
        return null;
    }

    const categoryOptions = categories.map(category => (
        <FormControlLabel
            key={category.id}
            value={category.id}
            control={<Radio />}
            label={category[i18n.language === 'vi' ? 'nameVi' : 'nameEn']}
        />
    ));

    return (
        <Wrapper>
            <Image src={questionMark} alt="" />
            <RightWrapper>
                <h3>{t('question_what_category_of_questions')}</h3>
                <RadioGroup
                    value={categoryId}
                    onChange={ev => setCategoryId(ev.target.value)}
                >
                    {categoryOptions}
                </RadioGroup>
            </RightWrapper>
        </Wrapper>
    );
};

export default QuestionCategory;
