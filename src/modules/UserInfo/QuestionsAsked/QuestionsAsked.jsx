import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import QuestionAsked from './QuestionAsked';
import Pagination from '../../../component/Pagination';

import { getQuestionsAskedFn } from '../../../actions/userInfos';

const Wrapper = styled.div`
    min-height: calc(100% - 650px);
`;

const QuestionsWrapper = styled.div``;

const QuestionsAsked = ({ userInfos, getQuestionsAsked }) => {
    const [activePage, setActivePage] = React.useState(1);

    const { questionsAsked, numberQuestionsAsked } = userInfos;
    const userId = window.location.pathname.split('/')[2];

    React.useEffect(() => {
        if (userId) {
            getQuestionsAsked(userId, activePage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, activePage]);

    const questionsRender = Object.values(questionsAsked).map(question => (
        <QuestionAsked key={question.id} question={question} />
    ));

    const nbPages = Math.ceil(numberQuestionsAsked / 5);

    return (
        <Wrapper>
            <QuestionsWrapper>{questionsRender}</QuestionsWrapper>
            {nbPages > 1 && (
                <Pagination
                    nbPages={nbPages}
                    activePage={activePage}
                    changePage={setActivePage}
                />
            )}
        </Wrapper>
    );
};

const mapStateToProps = ({ userInfos }) => ({
    userInfos
});

const mapDispatchToProps = dispatch => ({
    getQuestionsAsked: (userId, page) =>
        dispatch(getQuestionsAskedFn(userId, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsAsked);
