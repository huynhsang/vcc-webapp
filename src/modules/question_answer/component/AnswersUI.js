import React from 'react';
import BasicComponent from "../../../common/abstract/component/BasicComponent";
import PropTypes from "prop-types";
import type {Answer} from "../../../domain/Answer";
import {Link} from "react-router-dom";
import type {Question} from "../../../domain/Question";
import type {User} from "../../../domain/User";

const propTypes = {
    question: PropTypes.object.isRequired,
    answers: PropTypes.array.isRequired,
};
export default class AnswersUI extends BasicComponent {

    constructor(props) {
        super(props);
        this.state = {answers: props.answers};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.answers) {
            this.changeStateValue('answers', nextProps.answers);
        }
    }

    render() {
        const question: Question = this.props.question;
        const answers: Array<Answer> = this.state.answers;
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
                        <ol className="commentlist clearfix">
                            {
                                answers.map((answer, index) => {
                                    const answerBy: User = answer.answerBy;
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
                                                                <span itemProp="dateCreated">Added an answer on {new Date(answerBy.created).toDateString()}</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="text">
                                                        <div itemProp="text">
                                                            <p>No, ‘I see him last night’ is always incorrect and will
                                                                be only just barely understandable. It is a very serious
                                                                and basic error, and it will be tiring for a native
                                                                speaker to converse with someone who speaks like this,
                                                                because they will constantly have to be remembering what
                                                                the person really means. It will not be ‘immediately
                                                                obvious without thinking about it’.</p>
                                                            <p>Someone just asked this question recently, and I replied,
                                                                saying that ‘I see him last night’ is never correct.
                                                                That is exactly what i meant.</p>
                                                        </div>
                                                        <div className="clearfix"/>
                                                        <div className="clearfix"/>
                                                        <div className="wpqa_error"/>
                                                        <ul className="question-vote answer-vote answer-vote-dislike">
                                                            <li>
                                                                <button className="wpqa_vote comment_vote_up vote_allow" title="Like">
                                                                    <i className="icon-up-dir"/>
                                                                </button>
                                                            </li>
                                                            <li className="vote_result" itemProp="upvoteCount">{answer.numberOfVotes}</li>
                                                            <li className="li_loader">
                                                                <span className="loader_3 fa-spin"/>
                                                            </li>
                                                            <li className="dislike_answers">
                                                                <button className="wpqa_vote comment_vote_down vote_allow" title="Dislike">
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
                    <div className="button-default show-answer-form">Leave an answer</div>
                    <h3 className="section-title comment-form-hide">Leave an answer
                        <div className="cancel-comment-reply"><a rel="nofollow"
                                                                 id="cancel-comment-reply-link"
                                                                 href="https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/#respond"
                                                                 style={{display: "none"}}>Cancel reply</a>
                        </div>
                    </h3>
                    <form action="https://2code.info/demo/themes/Discy/Main/wp-comments-post.php"
                          method="post" id="commentform"
                          className="post-section comment-form comment-form-hide answers-form" noValidate=""
                          encType="multipart/form-data">
                        <div className="wpqa_form">
                            <label htmlFor="featured_image">Featured image</label>
                            <div className="fileinputs">
                                <input type="file" name="featured_image" id="featured_image"/>
                                <div className="fakefile">
                                    <button type="button">Select file</button>
                                    <span>Browse</span></div>
                                <i className="icon-camera"/></div>
                        </div>
                        <div className="wpqa_error"/>
                        <div className="form-input form-textarea form-comment-editor">
                            <div id="wp-comment-wrap" className="wp-core-ui wp-editor-wrap tmce-active">
                                <div id="wp-comment-editor-tools" className="wp-editor-tools hide-if-no-js">
                                    <div className="wp-editor-tabs">
                                        <button type="button" id="comment-tmce"
                                                className="wp-switch-editor switch-tmce"
                                                data-wp-editor-id="comment">Visual
                                        </button>
                                        <button type="button" id="comment-html"
                                                className="wp-switch-editor switch-html"
                                                data-wp-editor-id="comment">Text
                                        </button>
                                    </div>
                                </div>
                                <div id="wp-comment-editor-container" className="wp-editor-container">
                                    <div id="qt_comment_toolbar" className="quicktags-toolbar">
                                        <input type="button" id="qt_comment_strong"
                                               className="ed_button button button-small" aria-label="Bold"
                                               defaultValue="b"/>
                                        <input type="button" id="qt_comment_em"
                                               className="ed_button button button-small"
                                               aria-label="Italic" defaultValue="i"/>
                                        <input type="button" id="qt_comment_link"
                                               className="ed_button button button-small"
                                               aria-label="Insert link" defaultValue="link"/>
                                        <input type="button" id="qt_comment_block"
                                               className="ed_button button button-small"
                                               aria-label="Blockquote" defaultValue="b-quote"/>
                                        <input type="button" id="qt_comment_del"
                                               className="ed_button button button-small"
                                               aria-label="Deleted text (strikethrough)"
                                               defaultValue="del"/>
                                        <input type="button" id="qt_comment_ins"
                                               className="ed_button button button-small"
                                               aria-label="Inserted text" defaultValue="ins"/>
                                        <input type="button" id="qt_comment_img"
                                               className="ed_button button button-small"
                                               aria-label="Insert image"
                                               defaultValue="img"/>
                                        <input type="button" id="qt_comment_ul"
                                               className="ed_button button button-small"
                                               aria-label="Bulleted list"
                                               defaultValue="ul"/>
                                        <input type="button"
                                               id="qt_comment_ol"
                                               className="ed_button button button-small"
                                               aria-label="Numbered list"
                                               defaultValue="ol"/>
                                        <input type="button"
                                               id="qt_comment_li"
                                               className="ed_button button button-small"
                                               aria-label="List item"
                                               defaultValue="li"/>
                                        <input type="button"
                                               id="qt_comment_code"
                                               className="ed_button button button-small"
                                               aria-label="Code"
                                               defaultValue="code"/>
                                        <input type="button"
                                               id="qt_comment_more"
                                               className="ed_button button button-small"
                                               aria-label="Insert Read More tag"
                                               defaultValue="more"/>
                                        <input type="button"
                                               id="qt_comment_close"
                                               className="ed_button button button-small"
                                               title="Close all open tags"
                                               defaultValue="close tags"/>
                                    </div>
                                    <div id="mceu_24" className="mce-tinymce mce-container mce-panel"
                                         hidefocus="1" tabIndex="-1" role="application"
                                         style={{visibility: "hidden", borderWidth: "1px", width: "100%"}}>
                                        <div id="mceu_24-body"
                                             className="mce-container-body mce-stack-layout">
                                            <div id="mceu_25"
                                                 className="mce-top-part mce-container mce-stack-layout-item mce-first">
                                                <div id="mceu_25-body" className="mce-container-body">
                                                    <div id="mceu_26"
                                                         className="mce-toolbar-grp mce-container mce-panel mce-first mce-last"
                                                         hidefocus="1" tabIndex="-1" role="group">
                                                        <div id="mceu_26-body"
                                                             className="mce-container-body mce-stack-layout">
                                                            <div id="mceu_27"
                                                                 className="mce-container mce-toolbar mce-stack-layout-item mce-first"
                                                                 role="toolbar">
                                                                <div id="mceu_27-body"
                                                                     className="mce-container-body mce-flow-layout">
                                                                    <div id="mceu_28"
                                                                         className="mce-container mce-flow-layout-item mce-first mce-last mce-btn-group"
                                                                         role="group">
                                                                        <div id="mceu_28-body">
                                                                            <div id="mceu_0"
                                                                                 className="mce-widget mce-btn mce-menubtn mce-fixed-width mce-listbox mce-first mce-btn-has-text"
                                                                                 tabIndex="-1"
                                                                                 aria-labelledby="mceu_0"
                                                                                 role="button"
                                                                                 aria-haspopup="true">
                                                                                <button id="mceu_0-open"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><span
                                                                                    className="mce-txt">Paragraph</span>
                                                                                    <i className="mce-caret"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_1"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1"
                                                                                 aria-pressed="false"
                                                                                 role="button"
                                                                                 aria-label="Bold (⌘B)">
                                                                                <button id="mceu_1-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-bold"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_2"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1"
                                                                                 aria-pressed="false"
                                                                                 role="button"
                                                                                 aria-label="Italic (⌘I)">
                                                                                <button id="mceu_2-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-italic"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_3"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1"
                                                                                 aria-pressed="false"
                                                                                 role="button"
                                                                                 aria-label="Bulleted list (⌃⌥U)">
                                                                                <button id="mceu_3-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-bullist"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_4"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1"
                                                                                 aria-pressed="false"
                                                                                 role="button"
                                                                                 aria-label="Numbered list (⌃⌥O)">
                                                                                <button id="mceu_4-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-numlist"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_5"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1"
                                                                                 aria-pressed="false"
                                                                                 role="button"
                                                                                 aria-label="Blockquote (⌃⌥Q)">
                                                                                <button id="mceu_5-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-blockquote"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_6"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1"
                                                                                 aria-pressed="false"
                                                                                 role="button"
                                                                                 aria-label="Align left (⌃⌥L)">
                                                                                <button id="mceu_6-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-alignleft"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_7"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1"
                                                                                 aria-pressed="false"
                                                                                 role="button"
                                                                                 aria-label="Align center (⌃⌥C)">
                                                                                <button id="mceu_7-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-aligncenter"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_8"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1"
                                                                                 aria-pressed="false"
                                                                                 role="button"
                                                                                 aria-label="Align right (⌃⌥R)">
                                                                                <button id="mceu_8-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-alignright"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_9"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1"
                                                                                 aria-pressed="false"
                                                                                 role="button"
                                                                                 aria-label="Insert/edit link (⌘K)">
                                                                                <button id="mceu_9-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-link"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_10"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1" role="button"
                                                                                 aria-label="Insert Read More tag (⌃⌥T)">
                                                                                <button id="mceu_10-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-wp_more"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_11"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1"
                                                                                 aria-pressed="false"
                                                                                 role="button"
                                                                                 aria-label="Fullscreen">
                                                                                <button id="mceu_11-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-fullscreen"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_12"
                                                                                 className="mce-widget mce-btn mce-last"
                                                                                 tabIndex="-1" role="button"
                                                                                 aria-label="Toolbar Toggle (⌃⌥Z)">
                                                                                <button id="mceu_12-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-wp_adv"/>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div id="mceu_29"
                                                                 className="mce-container mce-toolbar mce-stack-layout-item mce-last"
                                                                 role="toolbar" style={{display: "none"}}>
                                                                <div id="mceu_29-body"
                                                                     className="mce-container-body mce-flow-layout">
                                                                    <div id="mceu_30"
                                                                         className="mce-container mce-flow-layout-item mce-first mce-last mce-btn-group"
                                                                         role="group">
                                                                        <div id="mceu_30-body">
                                                                            <div id="mceu_13"
                                                                                 className="mce-widget mce-btn mce-first"
                                                                                 tabIndex="-1"
                                                                                 aria-pressed="false"
                                                                                 role="button"
                                                                                 aria-label="Strikethrough (⌃⌥D)">
                                                                                <button id="mceu_13-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-strikethrough"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_14"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1" role="button"
                                                                                 aria-label="Horizontal line">
                                                                                <button id="mceu_14-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-hr"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_15"
                                                                                 className="mce-widget mce-btn mce-splitbtn mce-colorbutton"
                                                                                 role="button" tabIndex="-1"
                                                                                 aria-haspopup="true"
                                                                                 aria-label="Text color">
                                                                                <button role="presentation"
                                                                                        hidefocus="1"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-forecolor"/><span
                                                                                    id="mceu_15-preview"
                                                                                    className="mce-preview"></span>
                                                                                </button>
                                                                                <button type="button"
                                                                                        className="mce-open"
                                                                                        hidefocus="1"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-caret"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_16"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1"
                                                                                 aria-pressed="false"
                                                                                 role="button"
                                                                                 aria-label="Paste as text">
                                                                                <button id="mceu_16-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-pastetext"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_17"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1" role="button"
                                                                                 aria-label="Clear formatting">
                                                                                <button id="mceu_17-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-removeformat"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_18"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1" role="button"
                                                                                 aria-label="Special character">
                                                                                <button id="mceu_18-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-charmap"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_19"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1" role="button"
                                                                                 aria-label="Decrease indent">
                                                                                <button id="mceu_19-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-outdent"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_20"
                                                                                 className="mce-widget mce-btn"
                                                                                 tabIndex="-1" role="button"
                                                                                 aria-label="Increase indent">
                                                                                <button id="mceu_20-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-indent"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_21"
                                                                                 className="mce-widget mce-btn mce-disabled"
                                                                                 tabIndex="-1" role="button"
                                                                                 aria-label="Undo (⌘Z)"
                                                                                 aria-disabled="true">
                                                                                <button id="mceu_21-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-undo"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_22"
                                                                                 className="mce-widget mce-btn mce-disabled"
                                                                                 tabIndex="-1" role="button"
                                                                                 aria-label="Redo (⌘Y)"
                                                                                 aria-disabled="true">
                                                                                <button id="mceu_22-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-redo"/>
                                                                                </button>
                                                                            </div>
                                                                            <div id="mceu_23"
                                                                                 className="mce-widget mce-btn mce-last"
                                                                                 tabIndex="-1" role="button"
                                                                                 aria-label="Keyboard Shortcuts (⌃⌥H)">
                                                                                <button id="mceu_23-button"
                                                                                        role="presentation"
                                                                                        type="button"
                                                                                        tabIndex="-1"><i
                                                                                    className="mce-ico mce-i-wp_help"/>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="mceu_31"
                                                 className="mce-edit-area mce-container mce-panel mce-stack-layout-item"
                                                 hidefocus="1" tabIndex="-1" role="group"
                                                 style={{borderWidth: "1px 0px 0px"}}>
                                                <iframe id="comment_ifr" frameBorder="0"
                                                        allowtransparency="true"
                                                        title="Rich Text Area. Press Control-Option-H for help."
                                                        style={{width: "100%", height: "150px", display: "block"}}
                                                        src="./Is this statement, “i see him last night” can be understood as “I saw him last night”_ – Discy_files/saved_resource.html"></iframe>
                                            </div>
                                            <div id="mceu_32"
                                                 className="mce-statusbar mce-container mce-panel mce-stack-layout-item mce-last"
                                                 hidefocus="1" tabIndex="-1" role="group"
                                                 style={{borderWidth: "1px 0px 0px"}}>
                                                <div id="mceu_32-body"
                                                     className="mce-container-body mce-flow-layout">
                                                    <div id="mceu_33"
                                                         className="mce-path mce-flow-layout-item mce-first">
                                                        <div className="mce-path-item">&nbsp;</div>
                                                    </div>
                                                    <div id="mceu_34"
                                                         className="mce-flow-layout-item mce-last mce-resizehandle">
                                                        <i className="mce-ico mce-i-resize"/></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="wp-editor-area" rows="10" autoComplete="off"
                                              cols="40" name="comment" id="comment" style={{display: "none"}}
                                              aria-hidden="true"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="form-input">
                            <input type="text" name="author" defaultValue="" id="comment_name" aria-required="true"
                                   placeholder="Your Name"/><i className="icon-user"/></div>
                        <div className="form-input form-input-last">
                            <input type="email" name="email" defaultValue="" id="comment_email"
                                   aria-required="true" placeholder="Email"/><i className="icon-mail"/>
                        </div>
                        <div className="form-input form-input-full">
                            <input type="url" name="url" defaultValue="" id="comment_url" placeholder="URL"/><i
                            className="icon-link"/></div>
                        <p className="form-submit">
                            <input name="submit" type="submit" id="submit"
                                   className="button-default button-hide-click" defaultValue="Submit"/><span
                            className="clearfix"></span><span className="load_span"><span
                            className="loader_2"></span></span>
                            <input type="hidden" name="comment_post_ID" defaultValue="118"
                                   id="comment_post_ID"/>
                            <input type="hidden" name="comment_parent" id="comment_parent"
                                   defaultValue="0"/>
                        </p>
                        <p style={{display: "none"}}>
                            <input type="hidden" id="akismet_comment_nonce" name="akismet_comment_nonce"
                                   defaultValue="ebcde7f3b8"/>
                        </p>
                        <p style={{display: "none"}}></p>
                        <input type="hidden" id="ak_js" name="ak_js" defaultValue="1561294316574"/>
                    </form>
                </div>
            </div>
        )
    }
}
AnswersUI.prototypes = propTypes;