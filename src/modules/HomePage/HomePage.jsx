import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getTopUsersFn, getPopularQuestionsFn } from '../../actions/home';
import { PageCover } from '../Header';
import Question from './Question';
import TopUser from './TopUser';
import WorkSpace from './WorkSpace';
import AskButton from '../../component/AskButton';
import { DefaultWrapper } from '../../component/Wrappers';

import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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

const SmallWrapper = styled.div`
    width: calc(100% + 20px);
    margin: 0 -10px;
    display: flex;
    flex-wrap: wrap;
`;

const WhiteBackground = styled.div`
    background-color: white;
`;

const ToAskWrapper = styled(DefaultWrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Ask = styled.div`
    font-size: 18px;
    margin-bottom: 10px;
`;

const useStyles = makeStyles(() => ({
    linkButton: {
        color: 'rgba(0, 0, 0, 0.58)'
    }
}));

const Home = ({ home, getTopUsers, getPopularQuestions, history }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    React.useEffect(() => {
        getTopUsers();
        getPopularQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { topUsers, popularQuestions } = home;

    const renderQuestions = Object.values(popularQuestions).map(q => (
        <Question key={q.id} question={q} />
    ));

    const renderUsers = Object.values(topUsers).map(u => (
        <TopUser key={u.id} user={u} />
    ));

    return (
        <>
            <PageCover />
            <DefaultWrapper>
                <FlexWrapper>
                    <Title>{t('common_popular_question')}</Title>
                    <Button
                        onClick={() => history.push('/questions')}
                        className={classes.linkButton}
                    >
                        {t('common_see_all')}
                    </Button>
                </FlexWrapper>
                <SmallWrapper>{renderQuestions}</SmallWrapper>
            </DefaultWrapper>
            <WorkSpace />
            <DefaultWrapper>
                <Title>{t('common_top_members')}</Title>
                <SmallWrapper>{renderUsers}</SmallWrapper>
            </DefaultWrapper>
            <WhiteBackground>
                <ToAskWrapper>
                    <Ask>{t('common_ask_now')}</Ask>
                    <AskButton label={t('common_ask')} />
                </ToAskWrapper>
            </WhiteBackground>
        </>
    );
};

const mapStateToProps = ({ home }) => ({
    home
});

const mapDispatchToProps = dispatch => ({
    getTopUsers: () => dispatch(getTopUsersFn()),
    getPopularQuestions: () => dispatch(getPopularQuestionsFn())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
