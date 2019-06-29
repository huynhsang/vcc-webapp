import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";
import questionMark from "../../../../static/resources/img/question_mark_1.png";
import ApplicationConstant from "../../../../common/constant/ApplicationConstant";
import PropTypes from "prop-types";

const propTypes = {
    next: PropTypes.func.isRequired,
    category: PropTypes.string,
};
export default class TypeQuestion extends BasicComponent {
    constructor(props) {
        super(props);
        this.state = {
            categorySelected: props.category
        };
    }
    onChangeHandler = (e) => {
        this.changeStateValue('categorySelected', e.target.value);
    };
    render() {
        const selected: string = this.state.categorySelected;
        const studying: string =ApplicationConstant.category.studying;
        const working: string =ApplicationConstant.category.working;
        const immigration: string =ApplicationConstant.category.immigration;
        return (
            <section className="row mt5 mb3">
                <div className="col-md-5">
                    <img className="img-responsive" src={questionMark} alt="question mark"/>
                </div>
                <div className="col-md-7">
                    <h3 className="font-size-18 m0">What category of questions do you want to ask?</h3>
                    <h5 className="font-size-14">We'll help you find the best way to get your answer.</h5>
                    <div className="mb1">
                        <input type="radio" id="studying" name="radio-group" value={studying} checked={selected === studying}
                               onChange={this.onChangeHandler}/>
                        <label htmlFor="studying">I have a question about studying</label>
                    </div>
                    <div className="mb1">
                        <input type="radio" id="working" name="radio-group" value={working} checked={selected === working}
                               onChange={this.onChangeHandler} />
                        <label htmlFor="working">I need help with a working problem</label>
                    </div>
                    <div className="mb1">
                        <input type="radio" id="immigration" name="radio-group" value={immigration} checked={selected === immigration}
                               onChange={this.onChangeHandler} />
                        <label htmlFor="immigration">I need to troubleshoot some immigration</label>
                    </div>
                    <button className="btn btn-primary mt2" onClick={() => this.props.next(selected)} disabled={!this.state.categorySelected}>
                        Next
                    </button>
                </div>
            </section>
        )
    }
}
TypeQuestion.propTypes = propTypes;
