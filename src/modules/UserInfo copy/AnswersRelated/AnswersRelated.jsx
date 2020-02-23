import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import QuestionRelated from './QuestionRelated';
// import Pagination from '../../../component/Pagination';

import { getAnswersRelatedFn } from '../../../actions/userInfos';

import groupBy from 'lodash/groupBy';

const Wrapper = styled.div``;

const QuestionsWrapper = styled.div``;

const AnswersRelated = ({ answersRelated, getAnswersRelated }) => {
    const userId = window.location.pathname.split('/')[2];

    const answersGrouped = groupBy(answersRelated, 'question.id')

    React.useEffect(() => {
        if (userId) {
            getAnswersRelated(userId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const questionsRender = Object.values(answersGrouped).map(answers => (
        <QuestionRelated key={answers[0].question.id} answers={answers} />
    ));

    return (
        <Wrapper>
            {/* <Pagination nbPages={10} activePage={5} onPageChange={() => {}} /> */}
            <QuestionsWrapper>{questionsRender}</QuestionsWrapper>
        </Wrapper>
    );
};

const mapStateToProps = ({ userInfos: { answersRelated } }) => ({
    answersRelated
});

const mapDispatchToProps = dispatch => ({
    getAnswersRelated: userId => dispatch(getAnswersRelatedFn(userId))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnswersRelated);
