import React from 'react';
import BasicComponent from "../../../../common/abstract/component/BasicComponent";
import Autocomplete from "../../../../component/autocomplete/AutoComplete";
import PropTypes from "prop-types";
import type {SubCategory} from "../../../../domain/SubCategory";

const propTypes = {
    subCategories: PropTypes.array.isRequired,
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    selectedTags: PropTypes.array.isRequired,
};
export default class TagsQuestion extends BasicComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedTags: props.selectedTags,
        };
    }

    onSelectTag = (tag: SubCategory) => {
        const { selectedTags, suggestions} = this.state;
        selectedTags.push(tag);
        let removeIndex = suggestions.map(function(item) { return item.id; }).indexOf(tag.id);
        suggestions.splice(removeIndex, 1);
        this.changeStateValue('selectedTags', selectedTags);
    };

    onRemoveTag(tag: SubCategory) {
        const { selectedTags, suggestions} = this.state;
        let removeIndex = selectedTags.map(function(item) { return item.id; }).indexOf(tag.id);
        selectedTags.splice(removeIndex, 1);
        suggestions.push(tag);
        this.changeStateValue('selectedTags', selectedTags);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.subCategories) {
            this.changeStateValue('suggestions', nextProps.subCategories);
        }
    }

    render() {
        const selectedTags: Array<SubCategory> = this.state.selectedTags;
        const suggestions: Array<string> = this.state.suggestions;
        const { next, previous } = this.props;
        return (
            <section className="mt5 mb3">
                <h3 className="font-size-18 m0">What languages, technologies, and/or frameworks is your question about?</h3>
                <h5 className="font-size-14">Tags help the right people find and answer your question.</h5>
                <div className="module p4 width-100">
                    <p className="font-weight-700">Identify your tags by completing the sentence, “My question is about…”</p>
                    <p>For example:</p>
                    <p className="m0">
                        <span><i className="fas fa-check"/> Include tags that are crucial to your question only, like europe, us,...</span><br/>
                        <span><i className="fas fa-times"/> Only included in the proposed scope</span>
                    </p>
                </div>
                <div className="mt3">
                    <p className="font-weight-700 mb2">Tags</p>
                    <div className="tagcloud">
                        <div className="question-tags">
                            {
                                selectedTags.map((tag, index) => {
                                    return (
                                        <button key={index} className="module" onClick={() => this.onRemoveTag(tag)}>
                                            {tag.nameEn} <i className="fas fa-times"/>
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Autocomplete suggestions={suggestions} filterBy="nameEn" onSelected={this.onSelectTag}/>
                </div>
                <div className="mt3 text-right">
                    <button className="btn btn-light mr3" onClick={() => previous("Type")}>Previous step</button>
                    <button className="btn btn-primary" onClick={() => next(selectedTags)}>Next</button>
                </div>
            </section>
        )
    }
}
TagsQuestion.propTypes = propTypes;
