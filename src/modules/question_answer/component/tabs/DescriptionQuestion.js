import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";

export default class DescriptionQuestion extends BasicComponent {
    render() {
        return (
            <section className="mt5 mb3">
                <h3 className="font-size-18 m0">Tell us more about your question</h3>
                <h5 className="font-size-14">
                    Your description gives people the information they need to help you answer your question.
                </h5>
                <p>
                    <b><i className="fas fa-question-circle"/> Want more help? </b>
                    Check out these examples of great question descriptions:
                    <a className="color-main" href="https://stackoverflow.com/questions/50464314/why-isnt-an-animation-flipped-horizontally-when-i-call-setflippedtrue" target="_blank"> Example 1</a>,
                    <a className="color-main" href="https://stackoverflow.com/questions/50378884/when-catch-doesnt-actually-catch-anything" target="_blank"> Example 2</a>
                </p>
            </section>
        )
    }
}
