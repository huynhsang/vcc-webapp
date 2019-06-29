import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";
import PropTypes from "prop-types";

const propTypes = {
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};
export default class TitleQuestion extends BasicComponent {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
        };
    }

    onBlurHandler = () => {
        this.props.setTitle(this.refs.title.value);
    };

    render() {
        const { title } = this.state;
        const { next, previous } = this.props;
        return (
            <section className="mt5 mb3">
                <h3 className="font-size-18 m0">What’s your question title?</h3>
                <h5 className="font-size-14">Your title helps people quickly understand what your question is about so they can answer it.</h5>
                <div className="module p4 width-100">
                    <p className="font-weight-700">Imagine you’re asking a question to another developer.</p>
                    <p>For example:</p>
                    <p>
                        <span><i className="fas fa-check"/> “Is there an R function for finding the index of an element in a vector?”</span><br/>
                        <span><i className="fas fa-times"/>  “Please help with R”</span>
                    </p>
                    <p className="m0">
                        <span><i className="fas fa-check"/> “Is there an R function for finding the index of an element in a vector?”</span><br/>
                        <span><i className="fas fa-times"/>  “Please help with R”</span>
                    </p>

                </div>
                <div className="mt3">
                    <p className="font-weight-700">Title</p>
                    <input type="text" autoFocus={true} defaultValue={title} ref="title" onBlur={this.onBlurHandler}/>
                </div>
                <div className="mt3 text-right">
                    <button className="btn btn-light mr3" onClick={() => previous("Tags")}>Previous</button>
                    <button className="btn btn-primary" onClick={() => next("Description")}>Next</button>
                </div>
            </section>
        )
    }
}
TitleQuestion.propTypes = propTypes;