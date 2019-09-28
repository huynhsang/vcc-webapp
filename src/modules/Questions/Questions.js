import React from 'react';
import { withRouter } from 'react-router-dom';
import FilterBuilder from '../../global/Filter';
// import { User } from '../../domain/User';
// import { Question } from '../../domain/Question';
// import { Category } from '../../domain/Category';
import { SubCategory } from '../../domain/SubCategory';
import Result from '../../global/Result';
import produce from 'immer';

import TopNav from './TopNav';

import { useTranslation } from 'react-i18next';
import CoreService from '../../global/CoreService';
import { QuestionComponent } from './QuestionComponent';

const { questionService } = CoreService;

const orderMaps = {
    'recent-questions': 'createdOn DESC',
    'most-answered': 'numberOfAnswers DESC',
    'most-visited': 'numberOfViews DESC',
    'most-voted': 'numberOfVotes DESC'
};

const MainPage = ({ location, history }) => {
    const { t } = useTranslation();

    const [questions, setQuestions] = React.useState([]);

    const [filter, setFilter] = React.useState(
        FilterBuilder.buildPaginationFilter(
            orderMaps['recent-questions'],
            0,
            10
        )
    );

    //Set Filter when change route
    React.useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const show = urlParams.get('show');

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
    }, [location.search]);

    //Load question when filter has been updated
    React.useEffect(() => {
        questionService.findAll(filter).then((result: Result) => {
            if (result.success) {
                setQuestions(result.data);
            }
        });
    }, [filter]);

    const handleLoadMore = () =>
        setFilter(state => ({ ...state, skip: state.skip + 1 }));

    //TODO: Use reducer instead
    const updateVoteQuestion = index => ({
        isPositiveVote,
        numberOfVotes,
        votes
    }) => {
        setQuestions(
            produce(draft => {
                if (votes) {
                    draft[index].votes = votes;
                } else {
                    draft[index].votes[0].isPositiveVote = isPositiveVote;
                }
                draft[index].numberOfVotes = numberOfVotes;
            })
        );
    };

    const showLoadMore = questions.length >= (filter.skip + 1) * filter.limit;

    return (
        <div className="discy-main-inner float_l">
            <TopNav show={'recent-questions'} />
            <section>
                <h2 className="screen-reader-text">VC&C Latest Questions</h2>
                <div className="post-articles question-articles">
                    {questions.map((question: Question, index) => (
                        <QuestionComponent
                            key={index}
                            question={question}
                            updateVoteQuestion={updateVoteQuestion(index)}
                        />
                    ))}
                </div>
                <div className="pagination-wrap pagination-question">
                    <div className="pagination-nav posts-load-more">
                        <span className="load_span">
                            <span className="loader_2" />
                        </span>
                        {showLoadMore && (
                            <div className="load-more">
                                <a onClick={handleLoadMore}>
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

export default withRouter(MainPage);
