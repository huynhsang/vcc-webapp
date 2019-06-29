import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";
import {Link} from "react-router-dom";
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import PropTypes from "prop-types";

const propTypes = {
    body: PropTypes.string.isRequired,
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    setBody: PropTypes.func.isRequired,
};
export default class DescriptionQuestion extends BasicComponent {
    constructor(props) {
        super(props);
        this.state = {
            questionBody: props.body,
        };
    }

    onChangeHandler = (value) => {
      this.changeStateValue('questionBody', value);
      this.props.setBody(value);
    };

    render() {
        const { next, previous} = this.props;
        const { questionBody } = this.state;
        return (
            <section className="mt5 mb3">
                <h3 className="font-size-18 m0">Tell us more about your question</h3>
                <h5 className="font-size-14">
                    Your description gives people the information they need to help you answer your question.
                </h5>
                <p>
                    <b><i className="fas fa-question-circle"/> Want more help? </b>
                    Check out these examples of great question descriptions:
                    <Link className="color-main" to="/"> Example 1</Link>,
                    <Link className="color-main" to="/"> Example 2</Link>
                </p>

                <SimpleMDEReact
                    value={questionBody}
                    onChange={this.onChangeHandler}
                    options={{
                        autofocus: true,
                        spellChecker: false
                    }}/>

                <div className="mt3 text-right">
                    <button className="btn btn-light mr3" onClick={() => previous("Title")}>Previous step</button>
                    <button className="btn btn-primary" onClick={() => next("Review")}>Next</button>
                </div>
            </section>
        )
    }
}
DescriptionQuestion.propTypes = propTypes;