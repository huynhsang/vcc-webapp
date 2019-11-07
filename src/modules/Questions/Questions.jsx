import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import FilterBuilder from '../../global/Filter';

import TopNav from './TopNav';

import { useTranslation } from 'react-i18next';
import QuestionComponent from './Question';

// import { getQuestions } from '../../services/question.service';

import { getQuestionsFn } from '../../actions/questions';

const orderMaps = {
    'recent-questions': 'created DESC',
    'most-answered': 'answerCount DESC',
    'most-visited': 'viewCount DESC',
    'most-voted': 'upVoteCount DESC'
};

const MainPage = ({ questionsReducer, getQuestions, location, history }) => {
    const { t } = useTranslation();

    const { questions } = questionsReducer;

    const [filter, setFilter] = React.useState(
        FilterBuilder.buildPaginationFilter(
            orderMaps['recent-questions'],
            0,
            10
        )
    );

    const urlParams = new URLSearchParams(location.search);
    const show = urlParams.get('show');

    //Set Filter when change route
    React.useEffect(() => {
        const newState =
            show === 'no-answers'
                ? {
                      skip: 0,
                      where: { numberOfAnswers: 0 }
                  }
                : {
                      skip: 0,
                      order: orderMaps[show] || orderMaps['recent-questions']
                  };

        setFilter(state => ({ ...state, ...newState }));
    }, [show]);

    //Load question when filter has been updated
    React.useEffect(() => {
        getQuestions(filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const handleLoadMore = () =>
        setFilter(state => ({ ...state, skip: state.skip + 1 }));

    const showLoadMore = questions.length >= (filter.skip + 1) * filter.limit;

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
    getQuestions: params => dispatch(getQuestionsFn(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MainPage));
