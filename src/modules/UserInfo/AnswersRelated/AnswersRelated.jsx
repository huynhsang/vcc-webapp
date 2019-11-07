import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import QuestionRelated from './QuestionRelated';
// import Pagination from '../../../component/Pagination';

const Wrapper = styled.div``;

const QuestionsWrapper = styled.div``;

const AnswersRelated = ({questionsAnswered}) => {
    const questionsRender = Object.values(questionsAnswered).map(question => (
        <QuestionRelated key={question.id} question={question} />
    ));

    return (
        <Wrapper>
            {/* <Pagination nbPages={10} activePage={5} onPageChange={() => {}} /> */}
            <QuestionsWrapper>{questionsRender}</QuestionsWrapper>
        </Wrapper>
    );
};

const mapStateToProps = ({ userInfos: { questionsAnswered } }) => ({
    questionsAnswered
});

export default connect(mapStateToProps)(AnswersRelated);
