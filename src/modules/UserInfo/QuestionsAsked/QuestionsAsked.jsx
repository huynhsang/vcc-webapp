import React from 'react';
import styled from 'styled-components';
import QuestionAsked from '../Components/QuestionAsked';
import Pagination from '../../../component/Pagination';

import { mock } from './Mock';

const Wrapper = styled.div``;

const QuestionsWrapper = styled.div``;

const QuestionsAsked = () => {
    const questionsRender = mock.map(question => (
        <QuestionAsked key={question.id} question={question} />
    ));

    return (
        <Wrapper>
            <Pagination nbPages={10} activePage={5} onPageChange={() => {}} />
            <QuestionsWrapper>{questionsRender}</QuestionsWrapper>
        </Wrapper>
    );
};

export default QuestionsAsked;
