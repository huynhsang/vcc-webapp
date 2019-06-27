import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";
import questionMark from "../../../../static/resources/img/question_mark_1.png";

export default class TypeQuestion extends BasicComponent {
    constructor() {
        super();
        this.state = {
            radio: false
        };
    }
    setStatus = (e) => {
        this.setState({radio: e.target.checked});
    };
    render() {
        return (
            <section className="row mt5 mb3">
                <div className="col-md-5">
                    <img className="img-responsive" src={questionMark} alt=""/>
                </div>
                <div className="col-md-7">
                    <h3 className="font-size-18 m0">What type of questions do you have?</h3>
                    <h5 className="font-size-14">We'll help you find the best way to get your answer.</h5>
                    <div>
                        <input type="radio" id="test1" name="radio-group" onChange={this.setStatus}/>
                        <label htmlFor="test1">I have a question about some code</label>
                    </div>
                    <div>
                        <input type="radio" id="test2" name="radio-group" onChange={this.setStatus} />
                        <label htmlFor="test2">I need help with a homework problem</label>
                    </div>
                    <div>
                        <input type="radio" id="test3" name="radio-group" onChange={this.setStatus} />
                        <label htmlFor="test3">I need a hardware recommendation</label>
                    </div>
                    <div>
                        <input type="radio" id="test4" name="radio-group" onChange={this.setStatus} />
                        <label htmlFor="test4">I need a software recommendation</label>
                    </div>
                    <div>
                        <input type="radio" id="test5" name="radio-group" onChange={this.setStatus} />
                        <label htmlFor="test5">I need to troubleshoot some software or hardware</label>
                    </div>
                    <div>
                        <input type="radio" id="test6" name="radio-group" onChange={this.setStatus} />
                        <label htmlFor="test6">Other</label>
                    </div>
                    <button className="btn btn-primary mt2" disabled = {!this.state.radio}>Next</button>
                </div>
            </section>
        )
    }
}
