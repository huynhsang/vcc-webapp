import React from 'react';
import BasicComponent from "../../../common/abstract/component/BasicComponent";
import PropTypes from "prop-types";
import type {Answer} from "../../../domain/Answer";
import {Link} from "react-router-dom";
import type {User} from "../../../domain/User";
import ReactMarkdown from "react-markdown";
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import RootScope from "../../../global/RootScope";

const propTypes = {
    approveAnswer: PropTypes.func.isRequired,
    updateQuestion: PropTypes.func.isRequired,
    createNewAnswer: PropTypes.func.isRequired,
    leaveAnswerValidation: PropTypes.func.isRequired,
    handleVoteAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired,
    answers: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};
export default class AnswersUI extends BasicComponent {

    constructor(props) {
        super(props);
        this.state = {
            answers: props.answers,
            leaveAnswer: false,
            answerBody: '',
            disableApproveBtn: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.answers) {
            this.changeStateValue('answers', nextProps.answers);
        }
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.createNewAnswer(this.state.answerBody, this.props.question.id, this);
    }

    triggerUpdateQuestion(question) {
        this.props.updateQuestion(question);
    }

    handleChangeAnswerBody = value => {
        if (value.length < 10000) {
            this.changeStateValue('answerBody', value);
        }
    };

    render() {
        const _this = this;
        const { answers, loader, disableApproveBtn } = _this.state;
        const { question, handleVoteAnswer, approveAnswer } = _this.props;
        const isOwner: boolean = question.askedBy ? question.askedBy.id === RootScope.userId : false;
        return (
            <div className="question-adv-comments question-has-comments question-has-tabs">
                <div id="comments" className="post-section">
                    <div className="post-inner">
                        <div className="answers-tabs">
                            <h3 className="section-title"><span>{question.numberOfAnswers} </span>Answers</h3>
                            <div className="answers-tabs-inner">
                                <ul>
                                    <li className="active-tab">
                                        <Link to="?show=voted">Voted</Link>
                                    </li>
                                    <li>
                                        <Link to="?show=oldest">Oldest</Link>
                                    </li>
                                    <li>
                                        <Link to="?show=recent">Recent</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="clearfix"/>
                        </div>
                        <ol className="commentlist clearfix custom-comment-list">
                            {
                                answers.map((answer: Answer, index: number) => {
                                    const answerBy: User = answer.answerBy;

                                    const isVoted: boolean = answer.votes && answer.votes.length > 0;
                                    const disableUp: boolean = isVoted && answer.votes[0].isPositiveVote;
                                    const disableDown: boolean = isVoted && !answer.votes[0].isPositiveVote;
                                    const showLoader: boolean = loader && loader.answerId === answer.id;
                                    return (
                                        <li key={index} className="comment byuser comment-author-james even thread-even depth-1">
                                            <div className="comment-body clearfix">
                                                <div className="comment-text">
                                                    <div className="author-image author-image-42">
                                                        <Link to={`/user/${answerBy.id}`}>
                                                            <span className="author-image-span">
                                                                <img className="avatar avatar-42 photo" alt="" title="" width="42" height="42" src={answerBy.avatar}/>
                                                            </span>
                                                        </Link>
                                                        <div className="author-image-pop-2">
                                                            <div
                                                                className="post-section user-area user-area-columns_pop">
                                                                <div className="post-inner">
                                                                    <div className="author-image author-image-70">
                                                                        <Link to={`/user/${answerBy.id}`}>
                                                                            <span className="author-image-span">
                                                                                <img className="avatar avatar-70 photo" alt="" title="" width="70" height="70" src={answerBy.avatar}/>
                                                                            </span>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="user-content">
                                                                        <div className="user-inner">
                                                                            <div className="user-data-columns">
                                                                                <h4>
                                                                                    <Link to={`/user/${answerBy.id}`}>{`${answerBy.firstName} ${answerBy.lastName}`}</Link>
                                                                                </h4>
                                                                                <div className="user-data">
                                                                                    <ul>
                                                                                        <li className="city-country">
                                                                                            <i className="icon-location"/>
                                                                                            {answerBy.nationality}
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="user-columns-data">
                                                                        <ul>
                                                                            <li className="user-columns-questions">
                                                                                <Link to={`/user/${answerBy.id}/questions`}>
                                                                                    <i className="icon-book-open"/>
                                                                                    {answerBy.numberOfQuestions} Questions
                                                                                </Link>
                                                                            </li>
                                                                            <li className="user-columns-answers">
                                                                                <Link to={`/user/${answerBy.id}/answers`}>
                                                                                    <i className="icon-comment"/>{answerBy.numberOfAnswers} Answers
                                                                                </Link>
                                                                            </li>
                                                                            <li className="user-columns-best-answers">
                                                                                <Link to={`/user/${answerBy.id}/answers/?show=best`}>
                                                                                    <i className="icon-graduation-cap"/>
                                                                                    {answerBy.numberOfBestAnswers} Best Answers
                                                                                </Link>
                                                                            </li>
                                                                            <li className="user-columns-points">
                                                                                <Link to={`/user/${answerBy.id}`}>
                                                                                    <i className="icon-bucket"/>
                                                                                    {answerBy.points} Points
                                                                                </Link>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="user-follow-profile">
                                                                        <Link to={`/user/${answerBy.id}`}>View Profile</Link>
                                                                    </div>
                                                                    <div className="clearfix"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="author clearfix">
                                                        {
                                                            question.hasAcceptedAnswer && answer.isTheBest ?
                                                                <div className="best-answer">Best Answer</div> : ''
                                                        }
                                                        {
                                                            isOwner && !question.hasAcceptedAnswer ?
                                                                <button className="btn btn-approve" disabled={disableApproveBtn}
                                                                    onClick={() => approveAnswer(question, answer, _this)}>
                                                                    <i className="fas fa-check"/> Approve
                                                                </button> : ''
                                                        }
                                                        <div className="comment-meta">
                                                            <div className="comment-author">
                                                                <span>
                                                                    <Link to={`/user/${answerBy.id}`}>
                                                                        <span>{`${answerBy.firstName} ${answerBy.lastName}`}</span>
                                                                    </Link>
                                                                </span>
                                                                <span className="badge-span" style={{backgroundColor: "#ffbf00"}}>{answerBy.level}</span>
                                                            </div>
                                                            <a href="" className="comment-date" itemProp="url">
                                                                <span itemProp="dateCreated">Added an answer on {new Date(answer.created).toDateString()}</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="text">
                                                        <div itemProp="text">
                                                            <ReactMarkdown source={answer.body}/>
                                                        </div>
                                                        <div className="clearfix"/>
                                                        <div className="clearfix"/>
                                                        <div className="wpqa_error"/>
                                                        <ul className="question-vote answer-vote answer-vote-dislike">
                                                            <li>
                                                                <button className="wpqa_vote comment_vote_up vote_allow" disabled={disableUp}
                                                                   onClick={() => handleVoteAnswer(answer, true, isVoted, _this)}>
                                                                    <i className="icon-up-dir"/>
                                                                </button>
                                                            </li>
                                                            {
                                                                showLoader ?
                                                                    <li className="li_loader" style={{display: "block"}}>
                                                                        <span className="loader_3 fa-spin"/>
                                                                    </li> :
                                                                    <li className="vote_result" itemProp="upvoteCount">
                                                                        {answer.numberOfVotes}
                                                                    </li>
                                                            }
                                                            <li className="dislike_answers">
                                                                <button className="wpqa_vote comment_vote_down vote_allow" disabled={disableDown}
                                                                   onClick={() => handleVoteAnswer(answer, false, isVoted, _this)}>
                                                                    <i className="icon-down-dir"/>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                        <ul className="comment-reply comment-reply-main">
                                                            <li>
                                                                <button rel="nofollow" className="comment-reply-link wpqa-reply-link" aria-label={`Reply to ${answerBy.firstName} ${answerBy.lastName}`}>
                                                                    <i className="icon-reply"/>Reply
                                                                </button>
                                                            </li>
                                                            <li className="comment-share question-share question-share-2">
                                                                <i className="icon-share"/> Share
                                                                <div className="post-share">
                                                                    <span>
                                                                        <i className="icon-share"/>
                                                                        <span>Share</span>
                                                                    </span>
                                                                    <ul style={{right: "-180px"}}>
                                                                        <li className="share-facebook">
                                                                            <a target="_blank" rel="noopener noreferrer" href="http://www.facebook.com/sharer.php?">
                                                                                <i className="icon-facebook"/>Share on Facebook
                                                                            </a>
                                                                        </li>
                                                                        <li className="share-twitter">
                                                                            <a target="_blank" rel="noopener noreferrer" href="http://twitter.com/share?">
                                                                                <i className="icon-twitter"/>Share on Twitter
                                                                            </a>
                                                                        </li>
                                                                        <li className="share-linkedin">
                                                                            <a target="_blank" rel="noopener noreferrer" href="http://www.linkedin.com/shareArticle?">
                                                                                <i className="icon-linkedin"/>Share on LinkedIn
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                            <li className="clearfix last-item-answers"/>
                                                        </ul>
                                                        <ul className="comment-reply comment-list-links">
                                                            <li className="question-list-details comment-list-details">
                                                                <i className="icon-dot-3"/>
                                                                <ul>
                                                                    <li className="report_activated">
                                                                        <button className="report_c">
                                                                            <i className="icon-attention"/>Report
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li className="clearfix last-item-answers"/>
                                                        </ul>
                                                    </div>
                                                    <div className="clearfix"/>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ol>
                        <div className="clearfix"/>
                    </div>
                </div>
                <div id="respond" className="comment-respond">
                    {
                        !this.state.leaveAnswer ? <div className="button-default show-answer-form" onClick={() => this.props.leaveAnswerValidation(_this.props.isAuthenticated, _this, _this.props.redirect)}>Leave an answer</div> :
                            <h3 className="section-title">
                                Leave an answer
                            </h3>
                    }
                    {
                        this.state.leaveAnswer ?
                            <form id="commentform" className="post-section comment-form answers-form"
                                  onSubmit={(e) => this.onSubmit(e)}>
                                <SimpleMDEReact
                                    value={this.state.answerBody}
                                    onChange={this.handleChangeAnswerBody}
                                    options={{
                                        autofocus: true,
                                        spellChecker: false
                                    }}/>
                                <p className="form-submit">
                                    <input name="submit" type="submit" id="submit"
                                           className="button-default button-hide-click" defaultValue="Submit"/>
                                    <span className="clearfix"/>
                                </p>
                            </form> : ''
                    }

                </div>

            </div>
        )
    }
}
AnswersUI.prototypes = propTypes;