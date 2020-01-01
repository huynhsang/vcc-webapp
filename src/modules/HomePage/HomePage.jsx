import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { setToRegistreFn } from '../../actions/app';

import {
    getTopUsersFn,
    getPopularQuestionsFn,
    getQuestionsTopAnsweredFn,
    getTrendingTagsFn
} from '../../actions/home';

import { PageCover } from '../Header';
import Question from './Question';
import TopUser from './TopUser';

import WorkSpace from './WorkSpace';

const Wrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px;
`;

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    font-size: 16px;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
`;

const QuestionsWrapper = styled.div`
    width: calc(100% + 20px);
    margin: 0 -10px;
`;

const WhiteBackground = styled.div`
    
`;

const Home = ({
    App,
    home,
    setToRegistre,
    getTopUsers,
    getPopularQuestions,
    getQuestionsTopAnswered,
    getTrendingTags
}) => {
    const { t } = useTranslation();

    React.useEffect(() => {
        getTopUsers();
        getPopularQuestions();
        getQuestionsTopAnswered();
        // getTrendingTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { isAuthenticated } = App;
    const {
        topUsers,
        popularQuestions,
        questionsTopAnswered,
        trendingTags
    } = home;

    const renderQuestions = Object.values(popularQuestions).map(q => (
        <Question key={q.id} question={q} />
    ));

    const renderUsers = Object.values(topUsers).map(u => (
        <TopUser key={u.id} user={u} />
    ));

    return (
        <>
            <PageCover />
            <Wrapper>
                <FlexWrapper>
                    <Title>{t('common_popular_question')}</Title>
                    <div>{`${t('common_see_all')} >`}</div>
                </FlexWrapper>
                <QuestionsWrapper className="row">
                    {renderQuestions}
                </QuestionsWrapper>
            </Wrapper>
            <WorkSpace />
            <Wrapper>
                <Title>{t('common_top_members')}</Title>
                <QuestionsWrapper className="row">
                    {renderUsers}
                </QuestionsWrapper>
            </Wrapper>
            
        </>
    );
};

const mapStateToProps = ({ App, home }) => ({
    App,
    home
});

const mapDispatchToProps = dispatch => ({
    setToRegistre: () => dispatch(setToRegistreFn()),
    getTopUsers: () => dispatch(getTopUsersFn()),
    getPopularQuestions: () => dispatch(getPopularQuestionsFn()),
    getQuestionsTopAnswered: () => dispatch(getQuestionsTopAnsweredFn()),
    getTrendingTags: () => dispatch(getTrendingTagsFn())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
