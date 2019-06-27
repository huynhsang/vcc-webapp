import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";

export default class TitleQuestion extends BasicComponent {
    render() {
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
                    <p className="font-weight-700">Tags</p>
                    <input type="text"/>
                </div>
                <div className="mt3 text-right">
                    <button className="btn btn-light mr3">Previous</button>
                    <button className="btn btn-primary">Next</button>
                </div>
            </section>
        )
    }
}
