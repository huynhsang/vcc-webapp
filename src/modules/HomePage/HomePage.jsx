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
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { toggleContactUsFn } from '../../actions/app';

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
    flex-direction: row-reverse;
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

    ${media.mobileLandscape`
        width: 100%;
        margin: 0;
    `}
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
`;

const TopUsersWrapper = styled.div`
    padding: 10px 0 1px 20px;
    border-left: 4px solid rgba(0, 0, 0, 0.8);
    background-color: white;
    border-radius: 0 6px 6px 0;
    ${media.mobileLandscape`
        padding-left: 15px;
    `}
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

const useStyles = makeStyles(() => ({
    linkButton: {
        color: 'rgba(0, 0, 0, 0.58)'
    }
}));

const Home = ({
    home,
    getTopUsers,
    getPopularQuestions,
    toggleContactUs,
    history
}) => {
    const { t } = useTranslation();
    const classes = useStyles();

    React.useEffect(() => {
        getTopUsers();
        getPopularQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { topUsers, popularQuestions } = home;

    const renderQuestions = Object.values(popularQuestions || {}).map(q => (
        <Question key={q.id} question={q} history={history} />
    ));

    const renderUsers = Object.values(topUsers).map(u => (
        <TopUser key={u.id} user={u} />
    ));

    return (
        <>
            <PageCover />
            <Background>
                <Wrapper>
                    <RightWrapper>
                        <TopWrapper>
                            <Title>{t('common_popular_question')}</Title>
                            <Button
                                onClick={() => history.push('/questions')}
                                className={classes.linkButton}
                                endIcon={<ChevronRightIcon />}
                            >
                                {t('common_see_all')}
                            </Button>
                        </TopWrapper>
                        <div>{renderQuestions}</div>
                    </RightWrapper>
                    <LeftWrapper>
                        <TopWrapper>
                            <Title>{t('common_top_members')}</Title>
                        </TopWrapper>
                        <TopUsersWrapper>{renderUsers}</TopUsersWrapper>
                    </LeftWrapper>
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

const mapStateToProps = ({ home }) => ({
    home,
});

const mapDispatchToProps = dispatch => ({
    getTopUsers: () => dispatch(getTopUsersFn()),
    getPopularQuestions: () => dispatch(getPopularQuestionsFn()),
    toggleContactUs: val => dispatch(toggleContactUsFn(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
