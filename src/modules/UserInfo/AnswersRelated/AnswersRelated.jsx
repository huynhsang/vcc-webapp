import React from 'react';
import styled from 'styled-components';
import QuestionRelated from './QuestionRelated';
import Pagination from '../../../component/Pagination';

import { mock } from './mock';

const Wrapper = styled.div``;

const QuestionsWrapper = styled.div``;

const AnswersRelated = () => {
    const questionsRender = mock.map(question => (
        <QuestionRelated key={question.id} question={question} />
    ));

    return (
        <Wrapper>
            <Pagination nbPages={10} activePage={5} onPageChange={() => {}} />
            <QuestionsWrapper>{questionsRender}</QuestionsWrapper>
        </Wrapper>
    );
};

export default AnswersRelated;
