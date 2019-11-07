import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import QuestionAsked from './QuestionAsked';
// import Pagination from '../../../component/Pagination';

const Wrapper = styled.div``;

const QuestionsWrapper = styled.div``;

const QuestionsAsked = ({ questionsAsked }) => {
    const questionsRender = Object.values(questionsAsked).map(question => (
        <QuestionAsked key={question.id} question={question} />
    ));

    return (
        <Wrapper>
            {/* <Pagination nbPages={10} activePage={5} onPageChange={() => {}} /> */}
            <QuestionsWrapper>{questionsRender}</QuestionsWrapper>
        </Wrapper>
    );
};

const mapStateToProps = ({ userInfos: { questionsAsked } }) => ({
    questionsAsked
});

export default connect(mapStateToProps)(QuestionsAsked);
