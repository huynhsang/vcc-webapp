import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import qs from 'qs';

import TopNav from './TopNav';

import QuestionComponent from './Question';

import { getQuestionsFn } from '../../actions/questions';

import { setUpQuestionFilter, DEFAULT_LIMIT } from '../../utils/question';

import Pagination from '../../component/Pagination';

const Questions = ({ questionsReducer, getQuestions, location, history }) => {
    const { questions, numberQuestions } = questionsReducer;

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

    const onPageChange = ({ selected }) => {
        const url = `/home/questions?${qs.stringify({
            show,
            page: selected + 1,
            text
        })}`;
        history.push(url);
    };

    return (
        <div className="discy-main-inner float_l">
            <TopNav show={show} />
            <section>
                <h2 className="screen-reader-text">VC&C Latest Questions</h2>
                <div className="post-articles question-articles">
                    {Object.values(questions).map((question, index) => (
                        <QuestionComponent key={index} question={question} />
                    ))}
                </div>
                <Pagination
                    nbPages={Math.ceil(numberQuestions / DEFAULT_LIMIT)}
                    activePage={page}
                    onPageChange={onPageChange}
                    justifyContent="center"
                    color="#37424a"
                />
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
