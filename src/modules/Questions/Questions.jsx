import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

import TopNav from './TopNav';

import QuestionComponent from './Question';

import { getQuestionsFn } from '../../actions/questions';

import { setUpQuestionFilter, DEFAULT_LIMIT } from '../../utils/question';
import { ProgressSpinner } from 'primereact/progressspinner';

import Pagination from '../../component/Pagination';

const LoaderWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
`;

const Questions = ({ questionsReducer, getQuestions, location, history }) => {
    const { t } = useTranslation();
    const { questions, numberQuestions, isFetching } = questionsReducer;

    const { show, page, text, tags } = qs.parse(location.search.substr(1));

    //Set Filter when change route
    React.useEffect(() => {
        const { filterFixed, filter } = setUpQuestionFilter({
            show,
            page,
            text,
            tags
        });

        if (filterFixed) {
            const url = `/home/questions?${qs.stringify(filterFixed)}`;
            history.replace(url);
        } else {
            getQuestions({ filter, totalCount: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show, page, text, tags]);

    const onPageChange = page => {
        const url = `/home/questions?${qs.stringify({
            show,
            page,
            text,
            tags
        })}`;
        history.push(url);
    };

    return (
        <div className="discy-main-inner float_l">
            <TopNav show={show} />
            <section>
                <h2 className="screen-reader-text">VC&C Latest Questions</h2>
                {isFetching ? (
                    <LoaderWrapper>
                        <ProgressSpinner />
                    </LoaderWrapper>
                ) : (
                    <>
                        <div className="post-articles question-articles">
                            {Object.values(questions).map((question, index) => (
                                <QuestionComponent
                                    key={index}
                                    question={question}
                                />
                            ))}
                        </div>
                        {numberQuestions > 0 ? (
                            <Pagination
                                nbPages={Math.ceil(
                                    numberQuestions / DEFAULT_LIMIT
                                )}
                                activePage={page}
                                changePage={onPageChange}
                                justifyContent="center"
                                color="#37424a"
                            />
                        ) : (
                            <div>
                                {`${t('common_no_result')} `}
                                <Link to={`/home/questions?page=1`}>
                                    {t('common_come_back')}
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

const mapStateToProps = ({ questionsReducer }) => ({
    questionsReducer
});

const mapDispatchToProps = dispatch => ({
    getQuestions: params => dispatch(getQuestionsFn(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Questions));
