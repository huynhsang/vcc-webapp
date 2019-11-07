import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AnswersUI from './AnswersUI';

import { useTranslation } from 'react-i18next';
import ApplicationUtil from '../../common/util/ApplicationUtil';

import {
    showErrorAlertFn,
    showConfirmToLoginFn
} from '../../actions/sweetAlert';

import Question from './Question';

import { getQuestionFn } from '../../actions/questionDetail';
import Share from './Share';

const QuestionDetail = ({
    match,
    history,
    showErrorNotification,
    showConfirmToLogin,
    getQuestion,
    questionDetail
}) => {
    const { t } = useTranslation();

    const { question } = questionDetail;

    const slug = match && match.params && match.params.slug;
    React.useEffect(() => {
        if (slug) {
            getQuestion(slug);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    if (!question) {
        return null;
    }

    const { answers } = question;

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
                    <Share />
                    {/* <ul className="question-link-list">
            <li className="report_activated">
              <a //eslint-disable-line jsx-a11y/anchor-is-valid
                className="report_q"
              >
                <i className="icon-attention" />
                {t('common_report')}
              </a>
            </li>
          </ul> */}
                    <div className="clearfix" />
                </div>
                <AnswersUI
                    answers={answers}
                    question={question}
                    redirect={history}
                />
            </div>
        </div>
    );
};

const mapStateToProps = ({ questionDetail }) => ({ questionDetail });

const mapDispatchToProps = dispatch => ({
    showErrorNotification: data =>
        dispatch(showErrorAlertFn('Error!', ApplicationUtil.getErrorMsg(data))),
    showConfirmToLogin: () => dispatch(showConfirmToLoginFn()),
    getQuestion: slug => dispatch(getQuestionFn(slug))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionDetail);
