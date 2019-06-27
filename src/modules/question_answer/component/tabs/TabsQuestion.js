import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";

export default class TabsQuestion extends BasicComponent {
    render() {
        return (
            <section className="mt5 mb3">
                <h3 className="font-size-18 m0">What languages, technologies, and/or frameworks is your question about?</h3>
                <h5 className="font-size-14">Tags help the right people find and answer your question.</h5>
                <div className="module p4 width-100">
                    <p className="font-weight-700">Identify your tags by completing the sentence, “My question is about…”</p>
                    <p>For example:</p>
                    <p className="m0">
                        <span><i className="fas fa-check"/> Include tags that are crucial to your question only, like c#</span><br/>
                        <span><i className="fas fa-times"/>  Only include version numbers, like c#-4.0, when absolutely necessary</span>
                    </p>
                </div>
                <div className="mt3">
                    <p className="font-weight-700">Tags</p>
                    <input type="text"/>
                </div>
                <div className="mt3 text-right">
                    <button className="btn btn-light mr3">Previous step</button>
                    <button className="btn btn-primary">Next</button>
                </div>
            </section>
        )
    }
}
