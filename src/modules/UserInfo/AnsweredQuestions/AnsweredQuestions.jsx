import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import QuestionRelated from './QuestionRelated';
import Pagination from '../../../component/Pagination';

import { getAnsweredQuestionsFn } from '../../../actions/userInfos';

const Wrapper = styled.div`
    min-height: calc(100vh - 650px);
`;

const QuestionsWrapper = styled.div``;

const AnswersRelated = ({ userInfos, getAnsweredQuestions }) => {
    const userId = window.location.pathname.split('/')[2];
    const [activePage, setActivePage] = React.useState(1);

    const { answredQuestions, numberAnswredQuestions } = userInfos;

    React.useEffect(() => {
        if (userId) {
            getAnsweredQuestions(userId, activePage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, activePage]);

    const questionsRender = Object.values(answredQuestions).map((question) => (
        <QuestionRelated key={question.id} question={question} />
    ));

    const nbPages = Math.ceil(numberAnswredQuestions / 5);

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

const mapDispatchToProps = (dispatch) => ({
    getAnsweredQuestions: (userId, page) => dispatch(getAnsweredQuestionsFn(userId, page))
});
export default connect(mapStateToProps, mapDispatchToProps)(AnswersRelated);
