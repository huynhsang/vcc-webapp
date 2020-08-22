import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageCover } from '../Header';
import Question from './Question';
import TopUser from './TopUser';
import WorkSpace from './WorkSpace';
import AskButton from '../../component/AskButton';
import { DefaultWrapper } from '../../component/Wrappers';

import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { toggleContactUsFn } from '../../actions/app';

import BreakingNews from './BreakingNews';

import { getUsers } from '../../services/user.service';
import { getQuestions } from '../../services/question.service';
import { getNews } from '../../services/news.service';

import { getIdAndToken } from '../../utils/cookie-tools';
import { ROLES } from '../../constants/constants';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircleOutline';

import FlareIcon from '@material-ui/icons/Flare';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import { zoomInOut } from '../../utils/animation-keyframes';

import TrendingTags from './TrendingTags';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Background = styled.div`
    background-color: #f7f7f7;
`;

const Wrapper = styled(DefaultWrapper)`
    display: flex;
    padding-bottom: 0;
    padding-top: 10px;
    flex-wrap: wrap;
`;

const FlexWrapper = styled.div`
    display: flex;
`;

const TopWrapper = styled(FlexWrapper)`
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 1.2rem;
    line-height: 35px;
`;

const TitleWrapper = styled(FlexWrapper)`
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 1.2rem;
    line-height: 35px;
    border-left: 4px solid rgba(0, 0, 0, 0.8);
    padding: 0 5px 0px 15px;
`;

const RightWrapper = styled.div`
    width: 70%;
    padding-left: 12px;
    ${media.mobileLandscape`
        width: 100%;
        padding: 0;
    `}
`;

const LeftWrapper = styled.div`
    width: calc(30% - 10px);
    margin-right: 10px;

    display: flex;
    flex-direction: column;
    padding-bottom: 15px;

    justify-content: space-between;

    ${media.mobileLandscape`
        width: 100%;
        margin: 0;
        padding: 0;
    `}
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 600;

    display: flex;
    align-items: center;
    & svg {
        font-size: 15px;
        margin-right: 5px;
    }
`;

const NewsTitle = styled(Title)`
    & svg {
        margin-top: -2px;
        animation: ${zoomInOut} 2s infinite linear;
    }
`;

const TopUsersWrapper = styled.div`
    padding: 10px 0 1px 15px;
    border-left: 4px solid rgba(0, 0, 0, 0.8);
    background-color: white;
    border-radius: 0 6px 6px 0;
`;

const ToAskWrapper = styled(DefaultWrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Ask = styled.div`
    font-size: 1.2rem;
    margin-bottom: 10px;
`;

const TopLeftWrapper = styled.div`
    background-color: white;
    border-radius: 0 6px 6px 0;

    flex-grow: 1;
    flex-basis: 0;

    min-height: 400px;
    max-height: 790px;

    margin-bottom: 15px;

    ${media.mobileLandscape`
        min-height: unset;
        flex-grow: unset;
        flex-basis: unset;
        max-height: unset;
    `}
`;

const BreakingNewsWrapper = styled.div`
    height: calc(100% - 60px);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 5px 10px 0 15px;

    scrollbar-width: thin;
    &::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 15px;
        background-color: rgba(0, 0, 0, 0.2);
    }

    ${media.mobileLandscape`
        overflow-y: unset;
    `}
`;

const useStyles = makeStyles(() => ({
    linkButton: {
        color: 'rgba(0, 0, 0, 0.58)'
    }
}));

const Home = ({ toggleContactUs, history }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const { role: userRole } = getIdAndToken();
    const isAdmin = ROLES.ADMIN === userRole;

    const [users, setUsers] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);
    const [newses, setNewses] = React.useState([]);

    React.useEffect(() => {
        //GET Top users
        getUsers({
            filter: {
                sort: 'point',
                skip: 0,
                limit: 10
            }
        })
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => console.log(err.message));

        //GET Popular questions
        getQuestions({
            filter: {
                order: 'viewCount DESC',
                limit: 8
            }
        })
            .then((data) => {
                setQuestions(data.entities.questions);
            })
            .catch((err) => console.log(err.message));

        getNews()
            .then((data) => setNewses(data))
            .catch((err) => console.log(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderQuestions = Object.values(questions || {}).map((q) => (
        <Question key={q.id} question={q} history={history} />
    ));

    const renderUsers = Object.values(users).map((u) => (
        <TopUser key={u.id} user={u} />
    ));

    const breakingNewsRender = newses.map((val) => (
        <BreakingNews key={val.id} news={val} />
    ));

    return (
        <>
            <PageCover />
            <Background>
                <Wrapper>
                    <LeftWrapper>
                        <TopLeftWrapper>
                            <TitleWrapper>
                                <NewsTitle>
                                    <FlareIcon />
                                    {t('common_breaking_news')}
                                </NewsTitle>
                                {isAdmin && (
                                    <IconButton>
                                        <AddIcon
                                            onClick={() =>
                                                history.push('/news/add')
                                            }
                                        />
                                    </IconButton>
                                )}
                            </TitleWrapper>
                            <BreakingNewsWrapper>
                                {breakingNewsRender}
                            </BreakingNewsWrapper>
                        </TopLeftWrapper>
                        <TopUsersWrapper>
                            <TopWrapper>
                                <Title>
                                    <LabelImportantIcon />
                                    {t('common_top_members')}
                                </Title>
                            </TopWrapper>
                            {renderUsers}
                        </TopUsersWrapper>
                    </LeftWrapper>
                    <RightWrapper>
                        <TrendingTags history={history} />
                        <TopWrapper>
                            <Title>{t('common_popular_question')}</Title>
                            <Button
                                onClick={() => history.push('/topics')}
                                className={classes.linkButton}
                                endIcon={<ChevronRightIcon />}
                            >
                                {t('common_see_all')}
                            </Button>
                        </TopWrapper>
                        <div>{renderQuestions}</div>
                    </RightWrapper>
                </Wrapper>
            </Background>
            <ToAskWrapper>
                <Ask>{t('common_ask_now')}</Ask>
                <AskButton label={t('common_ask')} />
            </ToAskWrapper>
            <WorkSpace history={history} toggleContactUs={toggleContactUs} />
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    toggleContactUs: (val) => dispatch(toggleContactUsFn(val))
});

export default connect(null, mapDispatchToProps)(Home);
