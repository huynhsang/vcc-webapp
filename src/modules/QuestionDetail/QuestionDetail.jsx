import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';

import Question from './Question';
import AnswerComponent from './Answer';
import AnswerForm from './AnswerForm';

import { getQuestionFn } from '../../actions/questionDetail';
import Share from './Share';

const QuestionDetail = ({ match, getQuestion, questionDetail }) => {
    const { t } = useTranslation();

    const { question } = questionDetail;

    const slug = match && match.params && match.params.slug;

    const fetchQuestion = () => {
        if (slug) {
            getQuestion(slug);
        }
    };

    React.useEffect(() => {
        fetchQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    if (!question) {
        return null;
    }

    const { answers } = question;

    const renderAnswers = answers.map(answer => (
        <AnswerComponent key={answer.id} answer={answer} question={question} />
    ));

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
                        {question.bestAnswerItem ? (
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
                <Question question={question} />
                <div className="question-bottom">
                    <Share questionSlug={slug}/>
                    {/* 
                    <ul className="question-link-list">
                        <li className="report_activated">
                        <a //eslint-disable-line jsx-a11y/anchor-is-valid
                            className="report_q"
                        >
                            <i className="icon-attention" />
                            {t('common_report')}
                        </a>
                        </li>
                    </ul> 
                    */}
                    <div className="clearfix" />
                </div>
                <div className="question-adv-comments question-has-comments question-has-tabs">
                    <div id="comments" className="post-section">
                        <div className="post-inner">
                            <div className="answers-tabs">
                                <h3 className="section-title">
                                    <span>{question.answerCount} </span>
                                    {t('common_answers')}
                                </h3>
                                {/* <div className="answers-tabs-inner">
                            <ul>
                                <li className="active-tab">
                                    <Link to="?show=voted">
                                        {t('common_voted')}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="?show=oldest">
                                        {t('common_oldest')}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="?show=recent">
                                        {t('common_rencent')}
                                    </Link>
                                </li>
                            </ul>
                        </div> */}
                                <div className="clearfix" />
                            </div>
                            <ol className="commentlist clearfix custom-comment-list">
                                {renderAnswers}
                            </ol>
                            <div className="clearfix" />
                        </div>
                    </div>
                    <AnswerForm
                        questionId={question.id}
                        reloadQuestion={fetchQuestion}
                    />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ questionDetail }) => ({
    questionDetail
});

const mapDispatchToProps = dispatch => ({
    getQuestion: slug => dispatch(getQuestionFn(slug))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(QuestionDetail));
