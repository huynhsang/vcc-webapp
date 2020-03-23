import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import UserLogo from '../../component/UserLogo';

import isEmpty from 'lodash/isEmpty';

import { getNameByLanguage } from '../../utils/multiple-language';

import { Badge } from '../Badges';

import Tag from '../../component/Tag';
import TruncateMarkup from 'react-truncate-markup';
import { QuillText } from '../../component/QuillText';
import DoneAll from '@material-ui/icons/DoneAll';

import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import ModeComment from '@material-ui/icons/ModeComment';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    width: calc(33.33% - 20px);
    background-color: white;
    padding: 10px 10px 40px 10px;
    border-radius: 6px;
    margin: 10px;
    user-select: none;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    position: relative;

    ${media.tabletLandscape`
        width: calc(50% - 20px);
    `}
    ${media.mobileLandscape`
        width: calc(100% - 20px);
    `}
`;

const InfosWrapper = styled.div`
    margin-left: 10px;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 10px;
    min-height: 45px;
`;

const InfosSup = styled.div`
    margin: 5px 0;
    font-size: 0.9rem;

    & span {
        color: #7f7f7f;
    }

    & time {
        margin-right: 10px;
    }
`;

const UserName = styled.span`
    color: #009fff;
    margin-right: 10px;

    &:hover {
        color: #0570b1;
    }
`;

const BottomWrapper = styled(FlexWrapper)`
    position: absolute;
    bottom: 10px;
    width: calc(100% - 20px);
    justify-content: flex-end;
    color: #7f7f7f;

    & svg {
        margin-right: 5px;
        margin-left: 15px;
        font-size: 15px;
    }
`;

const DescriptionWrapper = styled.div`
    margin-top: 5px;
    font-size: 1.1rem;
    min-height: 50px;
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
    padding: 3px 5px;
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

    const tagsRender = (tagList || []).map(tag => (
        <Tag key={tag.id} tag={tag} />
    ));

    const redirect = url => ev => {
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
            <FlexWrapper>
                <UserLogo user={askedBy} />
                <InfosWrapper>
                    <div>
                        <UserName onClick={redirect(`/users/${askedBy.id}`)}>
                            {`${askedBy.firstName} ${askedBy.lastName}`}
                        </UserName>
                        <Badge points={askedBy.points} />
                    </div>
                    <InfosSup>
                        <span>{`${t('common_asked')}: `}</span>
                        <time dateTime={created}>
                            {` ${new Date(created).toDateString()}`}
                        </time>
                    </InfosSup>
                </InfosWrapper>
            </FlexWrapper>
            <DescriptionWrapper>
                <QuillText lines={2} content={body} />
            </DescriptionWrapper>
            {!isEmpty(tagsRender) && <div className="row">{tagsRender}</div>}
            <BottomWrapper>
                <FlexWrapper>
                    <ModeComment />
                    <div>{`${answerCount} ${t('common_answer')}`}</div>
                </FlexWrapper>
                <FlexWrapper>
                    <RemoveRedEye />
                    <div>{`${viewCount} ${t('common_views')}`}</div>
                </FlexWrapper>
            </BottomWrapper>
        </Wrapper>
    );
};

export default Question;
