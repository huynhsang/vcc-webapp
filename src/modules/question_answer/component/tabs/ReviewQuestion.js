import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

const propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    postQuestion: PropTypes.func.isRequired,
};
export default class ReviewQuestion extends BasicComponent {
    render() {
        const { title, body, tags, postQuestion } = this.props;
        return (
            <section className="mt5 mb3">
                <h3 className="font-size-18 m0">Review your question</h3>
                <h5 className="font-size-14">
                    Almost there! Let’s give your question one more look. And don’t worry—you can edit your question after it’s posted, too.
                </h5>
                <div className="module p4 width-100">
                    <p className="font-weight-700">Check for typos, slang, and text formatting issues.</p>
                    <p>For example:</p>
                    <p className="m0">
                        <span><i className="fas fa-check"/> Format your text with <b>bold</b> and <i>italic</i></span><br/>
                        <span><i className="fas fa-times"/>  Don’t include slang or shorthand: “u can’t bc it's mine”</span>
                    </p>
                </div>
                <p className="mt3">
                    <b><i className="fas fa-question-circle"/> Want more help? </b>
                    Check out
                    <a className="color-main" href="https://www.cirosantilli.com/markdown-style-guide/" rel="noopener noreferrer" target="_blank"> these tips for editing with Markdown </a>
                    for guidance.
                </p>
                <div>
                    <p className="font-weight-700 m0">Title</p>
                    <input type="text" defaultValue={title} disabled={true} placeholder="What's your programming question? Be specific."/>
                </div>
                <div className="content-review mt3">
                    <ReactMarkdown className="question-body" source={body}/>
                </div>
                <div className="mt2">
                    <p className="font-weight-700 m0">Tags</p>
                    <div className="tagcloud">
                        <div className="question-tags">
                            {
                                tags.map((tag, index) => {
                                    return (
                                        <button key={index} className="module">
                                            {tag.nameEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="text-right mt5">
                    <button className="btn btn-primary" onClick={() => postQuestion()}>Post Your Question</button>
                </div>
            </section>
        )
    }
}
ReviewQuestion.propTypes = propTypes;
