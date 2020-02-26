import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import School from '@material-ui/icons/School';
import Tag from '../../component/Tag';

const Wrapper = styled.div``;

const NoteWrapper = styled.div`
    background-color: #fafafb;
    padding: 20px;
    margin: 20px;
`;

const QuestionReview = ({ title, body, tags }) => {
    const { t } = useTranslation();
    return (
        <Wrapper>
            <h3>{t('question_review_question')}</h3>
            <h5>{t('question_let_one_more_look')}</h5>
            <NoteWrapper>
                <p>{t('question_check_for_typos')}.</p>
                <p>{t('question_for_exemple')}:</p>
                <p>
                    <span>
                        <Check /> {t('question_format_text')}{' '}
                        <b>{t('common_bold')}</b> {t('common_and')}{' '}
                        <i>{t('common_italic')}</i>
                    </span>
                    <br />
                    <span>
                        <Close /> {t('question_donnot_include_slang')}
                    </span>
                </p>
            </NoteWrapper>
            <p>
                <b>
                    <School /> {t('question_want_more_help')}?{' '}
                </b>
                {t('common_check_out')}
                <Link to="/" target="_blank">
                    {' '}
                    {t('question_these_tips_for_editing')}{' '}
                </Link>
                {t('question_for_guidance')}.
            </p>
            <div>
                <p>{t('common_title')}:</p>
                <div>{title}</div>
            </div>
            <ReactMarkdown className="question-body" source={body} />
            <div>
                <p>{t('common_tags')}</p>
                <div>
                    {tags.map(tag => {
                        return <Tag key={tag.id} tag={tag} />;
                    })}
                </div>
            </div>
        </Wrapper>
    );
};

export default QuestionReview;
