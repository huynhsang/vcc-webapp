import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";

export default class ReviewQuestion extends BasicComponent {
    render() {
        return (
            <section className="mt5 mb3">
                <h3 className="font-size-18 m0">Review your question</h3>
                <h5 className="font-size-14">
                    Almost there! Let’s give your question one more look. And don’t worry—you can edit your question after it’s posted, too.
                </h5>
                <div className="module p4 width-100">
                    <p className="font-weight-700">Check for typos, slang, and code formatting issues.</p>
                    <p>For example:</p>
                    <p className="m0">
                        <span><i className="fas fa-check"/> Format your code: SELECT * FROM Users WHERE Id = 1;</span><br/>
                        <span><i className="fas fa-times"/>  Don’t include slang or shorthand: “u can’t bc it returns -1”</span>
                    </p>
                </div>
                <p className="mt3">
                    <b><i className="fas fa-question-circle"/> Want more help? </b>
                    Check out
                    <a className="color-main" href="https://stackoverflow.com/editing-help" target="_blank"> these tips for editing with Markdown </a>
                    for guidance.
                </p>
                <div>
                    <p className="font-weight-700 m0">Title</p>
                    <input type="text" placeholder="What's your programming question? Be specific."/>
                </div>
                <div className="content-review mt3">
                    <div className="title-textarea">
                    </div>
                    <textarea rows="7"></textarea>
                </div>
                <div>
                    <p className="font-weight-700 m0">Tags</p>
                    <input type="text" placeholder="e.g. (regex ios json)"/>
                </div>
                <div className="text-right mt5">
                    <button className="btn btn-primary">Post Your Question</button>
                </div>
            </section>
        )
    }
}
