import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import TopNav from './TopNav';

import { useTranslation } from 'react-i18next';
import QuestionComponent from './Question';

// import { getQuestions } from '../../services/question.service';

import { getQuestionsFn, getNumberQuestionsFn } from '../../actions/questions';

const DEFAULT_LIMIT = 5;
const DEFAULT_SKIP = 0;

const orderMaps = {
    'recent-questions': 'recent',
    'most-answered': 'mostAnswered',
    'most-visited': 'mostVisited',
    'most-voted': 'highVote'
};

const MainPage = ({
    questionsReducer,
    getQuestions,
    getNumberQuestions,
    location,
    history
}) => {
    const { t } = useTranslation();

    const { questions, numberQuestions } = questionsReducer;

    const [filter, setFilter] = React.useState({
        sort: orderMaps['recent-questions'],
        skip: DEFAULT_SKIP,
        limit: DEFAULT_LIMIT
    });

    const urlParams = new URLSearchParams(location.search);
    const show = urlParams.get('show');

    //Set Filter when change route
    React.useEffect(() => {
        const newState =
            show === 'no-answers'
                ? {
                      skip: 0,
                      sort: 'noAnswers'
                  }
                : {
                      skip: 0,
                      sort: orderMaps[show] || orderMaps['recent-questions']
                  };

        setFilter(state => ({ ...state, ...newState }));
    }, [show]);

    //Load question when filter has been updated
    React.useEffect(() => {
        getQuestions({ filter });
        getNumberQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const handleLoadMore = () =>
        setFilter(state => ({ ...state, limit: state.limit + DEFAULT_LIMIT }));

    const showLoadMore = numberQuestions >= filter.limit;

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
                <div className="pagination-wrap pagination-question">
                    <div className="pagination-nav posts-load-more">
                        <span className="load_span">
                            <span className="loader_2" />
                        </span>
                        {showLoadMore && (
                            <div className="load-more">
                                <a //eslint-disable-line jsx-a11y/anchor-is-valid
                                    onClick={handleLoadMore}
                                >
                                    {t('mainpage_load_more_questions')}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

const mapStateToProps = ({ questionsReducer }) => ({
    questionsReducer
});

const mapDispatchToProps = dispatch => ({
    getQuestions: params => dispatch(getQuestionsFn(params)),
    getNumberQuestions: params => dispatch(getNumberQuestionsFn(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MainPage));
