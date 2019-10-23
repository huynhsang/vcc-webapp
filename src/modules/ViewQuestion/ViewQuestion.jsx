import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import AnswersUI from './AnswersUI';
import produce from 'immer';

import { useTranslation } from 'react-i18next';
import CoreService from '../../global/CoreService';
import ApplicationUtil from '../../common/util/ApplicationUtil';

import {
    showErrorAlertFn,
    showConfirmToLoginFn
} from '../../actions/sweetAlert';

import { QuestionComponent } from '../../component/QuestionComponent';

const { questionService } = CoreService;

const ViewQuestion = ({
    match,
    history,
    showErrorNotification,
    showConfirmToLogin
}) => {
    const { t } = useTranslation();

    const [question, setQuestion] = React.useState({});
    const [answers, setAnswers] = React.useState([]);

    const slug = match && match.params && match.params.slug;
    React.useEffect(() => {
        if (slug) {
            questionService.findOneBySlug(slug).then((result: Result) => {
                if (
                    result.success &&
                    result.data &&
                    Object.keys(result.data).length > 0
                ) {
                    setQuestion(result.data);
                    setAnswers(result.data.answers);
                }
            });
        }
    }, [slug]);

    if (!question) {
        return null;
    }

    const updateVoteQuestion = ({ isPositiveVote, numberOfVotes, votes }) => {
        setQuestion(
            produce(draft => {
                if (votes) {
                    draft.votes = votes;
                } else {
                    draft.votes[0].isPositiveVote = isPositiveVote;
                }
                draft.numberOfVotes = numberOfVotes;
            })
        );
    };

    return (
        <div className="discy-main-inner float_l">
            <div className="breadcrumbs">
                <span className="crumbs">
                    <span typeof="v:Breadcrumb">
                        <Link to="/">
                            <i className="icon-home" />
                            {t('common_home')}
                        </Link>
                        <span rel="v:child" typeof="v:Breadcrumb">
                            <span className="crumbs-span"> / </span>
                            <span className="current">
                                <a href="/?show=recent-questions">
                                    {t('common_questions')}
                                </a>
                            </span>
                            <span className="crumbs-span"> / </span>
                            <span className="current">Q {question.id}</span>
                        </span>
                    </span>
                </span>
                <div className="breadcrumb-right">
                    <div className="question-navigation">
                        <Link className="nav-previous" to="/">
                            <i className="icon-left-open" />
                        </Link>
                    </div>
                    <div className="question-stats">
                        {question.hasAcceptedAnswer ? (
                            <span className="question-answered-done">
                                <i className="icon-check" />
                                Answered
                            </span>
                        ) : (
                            <span>
                                <i className="icon-flash" />
                                In Process
                            </span>
                        )}
                    </div>
                    <div className="clearfix" />
                </div>
            </div>
            <div className="clearfix" />
            <div className="post-articles question-articles">
                <QuestionComponent
                    question={question}
                    updateVoteQuestion={updateVoteQuestion}
                    isShownAnswerButton={false}
                />
                <div className="question-bottom">
                    <div className="post-share">
                        <span>
                            <i className="icon-share" />
                            <span>{t('common_share')}</span>
                        </span>
                        <ul style={{ position: 'unset', marginLeft: '10px' }}>
                            <li className="share-facebook">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="http://www.facebook.com/share"
                                >
                                    <i className="icon-facebook" />
                                    Facebook
                                </a>
                            </li>
                            <li className="share-twitter">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="http://twitter.com/share"
                                >
                                    <i className="icon-twitter" />
                                </a>
                            </li>
                            <li className="share-linkedin">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="http://www.linkedin.com/shareArticle?"
                                >
                                    <i className="icon-linkedin" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <ul className="question-link-list">
                        {/* <li className="report_activated">
                            <a //eslint-disable-line jsx-a11y/anchor-is-valid
                                className="report_q"
                            >
                                <i className="icon-attention" />
                                {t('common_report')}
                            </a>
                        </li> */}
                    </ul>
                    <div className="clearfix" />
                </div>
                <AnswersUI
                    answers={answers}
                    question={question}
                    redirect={history}
                    updateQuestion={setQuestion}
                    updateAnswers={setAnswers}
                />
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    showErrorNotification: data =>
        dispatch(showErrorAlertFn('Error!', ApplicationUtil.getErrorMsg(data))),
    showConfirmToLogin: () => dispatch(showConfirmToLoginFn())
});

export default connect(
    null,
    mapDispatchToProps
)(ViewQuestion);
