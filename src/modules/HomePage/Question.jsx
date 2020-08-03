import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import UserLogo from '../../component/UserLogo';

import isEmpty from 'lodash/isEmpty';

import { getNameByLanguage } from '../../utils/multiple-language';

import Tag from '../../component/Tag';
import TruncateMarkup from 'react-truncate-markup';
import { QuillText } from '../../component/QuillText';
import DoneAll from '@material-ui/icons/DoneAll';

import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import ModeComment from '@material-ui/icons/ModeComment';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    width: 100%;
    overflow: hidden;
    background-color: white;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 15px;
    user-select: none;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    position: relative;
`;

const InfosWrapper = styled.div`
    margin-right: 10px;
    ${media.mobile`
        margin-right: 3px;
    `}
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: ${p=> p.alignItem || 'center'};
`;

const Title = styled.div`
    font-weight: 600;
    margin-bottom: 5px;
    line-height: 18px;
`;

const InfosSup = styled.div`
    font-size: 0.9rem;
    line-height: 0.9rem;

    & span {
        color: #7f7f7f;
    }

    & time {
        color: #5a5a5a;
    }
`;

const UserName = styled.div`
    color: #053d68;
    font-size: 0.9rem;
    text-align: right;
    margin-bottom: 3px;

    &:hover {
        transform: scale(1.1) translateZ(0);
    }
`;

const BottomWrapper = styled(FlexWrapper)`
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    color: #7f7f7f;
    font-size: 0.9rem;
`;

const DescriptionWrapper = styled.div`
    margin-bottom: 10px;
    overflow: hidden;
`;

const TopWrapper = styled(FlexWrapper)`
    justify-content: space-between;
    margin-bottom: 10px;
`;

const ResolveLabel = styled.div`
    background-color: #1ea01e;
    color: white;
    display: flex;
    align-items: center;
    padding: 3px 5px;
    white-space: nowrap;
    border-radius: 6px;
    & svg {
        margin-right: 5px;
    }
`;

const CategoryWrapper = styled.div`
    border: 1px solid #b5b5b5;
    border-radius: 6px;
    padding: 0 5px;
`;

const TagsWrapper = styled.div`
    margin-bottom: 5px;
`;

const ModeCommentIcon = styled(ModeComment)`
    margin-right: 5px;
    font-size: 15px !important;
    ${media.mobile`
        margin-right: 2px;
    `}
`;

const RemoveRedEyeIcon = styled(RemoveRedEye)`
    margin-right: 5px;
    margin-left: 15px;
    font-size: 15px !important;
    ${media.mobile`
        margin-left: 8px;
        margin-right: 2px;
    `}
`;

const Question = ({ question, history }) => {
    const { t } = useTranslation();

    const {
        askedBy = {},
        body,
        categoryItem,
        bestAnswerItem,
        created,
        answerCount,
        viewCount,
        slug,
        tagList
    } = question;

    const tagsRender = (tagList || []).map((tag) => (
        <Tag key={tag.id} tag={tag} />
    ));

    const redirect = (url) => (ev) => {
        ev.stopPropagation();
        history.push(url);
    };

    return (
        <Wrapper onClick={redirect(`/questions/${slug}`)}>
            <TopWrapper>
                <CategoryWrapper>
                    {getNameByLanguage(categoryItem)}
                </CategoryWrapper>
                {!!bestAnswerItem && (
                    <ResolveLabel>
                        <DoneAll />
                        {t('question_resolved')}
                    </ResolveLabel>
                )}
            </TopWrapper>
            <TruncateMarkup lines={2}>
                <Title>{question.title}</Title>
            </TruncateMarkup>
            <DescriptionWrapper>
                <QuillText lines={2} content={body} />
            </DescriptionWrapper>
            {!isEmpty(tagsRender) && <TagsWrapper>{tagsRender}</TagsWrapper>}
            <BottomWrapper>
                <FlexWrapper>
                    <FlexWrapper>
                        <ModeCommentIcon />
                        <div>{`${answerCount} ${t('common_answer')}`}</div>
                    </FlexWrapper>
                    <FlexWrapper>
                        <RemoveRedEyeIcon />
                        <div>{`${viewCount} ${t('common_views')}`}</div>
                    </FlexWrapper>
                </FlexWrapper>
                <FlexWrapper alignItem='flex-end'>
                    <InfosWrapper>
                        <UserName onClick={redirect(`/users/${askedBy.id}`)}>
                            {askedBy.username}
                        </UserName>
                        <InfosSup>
                            <span>{`${t('common_asked')}: `}</span>
                            <time dateTime={created}>
                                {` ${new Date(created).toDateString()}`}
                            </time>
                        </InfosSup>
                    </InfosWrapper>
                    <UserLogo user={askedBy} />
                </FlexWrapper>
            </BottomWrapper>
        </Wrapper>
    );
};

export default Question;
