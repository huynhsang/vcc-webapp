import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { DefaultWrapper } from '../../component/Wrappers';
import { PageCover } from '../Header';
import QuestionFilter from './QuestionFilter';
import { getQuestionsFn } from '../../actions/questions';

import { setUpQuestionFilter, DEFAULT_LIMIT } from '../../utils/question';
import CircularProgress from '@material-ui/core/CircularProgress';

import qs from 'qs';

import Question from './Question';
import Pagination from '../../component/Pagination';
import { voteQuestionFn } from '../../actions/questions';
import { showLoginConfirmFn } from '../../actions/alertConfirm';

const QuestionPageWrapper = styled.div`
    min-height: calc(100vh - 100px);
`;

const QuestionsWrapper = styled(DefaultWrapper)`
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
`;

const LoaderWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
`;

const QuestionPage = ({
    questionsReducer,
    getQuestions,
    location,
    history,
    isAuthenticated,
    showLoginConfirm,
    voteQuestion
}) => {
    const { t } = useTranslation();
    const {
        questions,
        numberQuestions,
        isFetching,
        votingQuestionId
    } = questionsReducer;

    const filterParse = qs.parse(location.search.substr(1));
    const {
        category,
        show,
        page,
        text,
        tags,
        askme,
        mime,
        noanswer
    } = filterParse;

    //Set Filter when change route
    React.useEffect(() => {
        const { filterFixed, filter } = setUpQuestionFilter({
            show,
            page,
            text,
            tags,
            category,
            askme,
            mime,
            noanswer
        });

        if (filterFixed) {
            const url = `/questions?${qs.stringify(filterFixed)}`;
            history.replace(url);
        } else {
            getQuestions({ filter, totalCount: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        show,
        page,
        text,
        tags,
        category,
        isAuthenticated,
        askme,
        mime,
        noanswer
    ]);

    const onChangeFilter = obj => {
        const url = `/questions?${qs.stringify({
            show,
            page: 1,
            text,
            tags,
            category,
            askme,
            mime,
            noanswer,
            ...obj
        })}`;
        history.push(url);
    };

    const questionElements = Object.values(questions).map((question, index) => (
        <Question
            key={index}
            question={question}
            history={history}
            isVoting={votingQuestionId === question.id}
            isAuthenticated={isAuthenticated}
            showLoginConfirm={showLoginConfirm}
            voteQuestion={voteQuestion}
        />
    ));

    return (
        <QuestionPageWrapper>
            <PageCover />
            <QuestionFilter
                isAuthenticated={isAuthenticated}
                category={category}
                show={show}
                page={page}
                text={text}
                tags={tags}
                askme={askme}
                mime={mime}
                noanswer={noanswer}
                onChangeFilter={onChangeFilter}
            />
            {isFetching ? (
                <LoaderWrapper>
                    <CircularProgress />
                </LoaderWrapper>
            ) : (
                <>
                    <QuestionsWrapper>{questionElements}</QuestionsWrapper>
                    <DefaultWrapper>
                        {numberQuestions > 0 ? (
                            <Pagination
                                nbPages={Math.ceil(
                                    numberQuestions / DEFAULT_LIMIT
                                )}
                                activePage={page}
                                changePage={newPage =>
                                    onChangeFilter({ page: newPage })
                                }
                                justifyContent="center"
                                color="#37424a"
                            />
                        ) : (
                            <div>
                                {`${t('common_no_result')} `}
                                <Link to={`/questions?page=1`}>
                                    {t('common_come_back')}
                                </Link>
                            </div>
                        )}
                    </DefaultWrapper>
                </>
            )}
        </QuestionPageWrapper>
    );
};

const mapStateToProps = ({ questionsReducer, App: { isAuthenticated } }) => ({
    questionsReducer,
    isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    getQuestions: params => dispatch(getQuestionsFn(params)),
    showLoginConfirm: () => dispatch(showLoginConfirmFn()),
    voteQuestion: (questionId, action) =>
        dispatch(voteQuestionFn(questionId, action))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(QuestionPage));
