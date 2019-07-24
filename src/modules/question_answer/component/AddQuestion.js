import React from 'react';
import PropTypes from "prop-types";
import BasicComponent from "../../../common/abstract/component/BasicComponent";
import Tabs from "../../../component/tabs/Tabs";
import TypeQuestionTab from "./tabs/TypeQuestion";
import TagsQuestionTab from "./tabs/TagsQuestion";
import TitleQuestionTab from "./tabs/TitleQuestion";
import DescriptionQuestionTab from "./tabs/DescriptionQuestion";
import ReviewQuestionTab from "./tabs/ReviewQuestion";

const propTypes = {
    getSubCategoriesByCategory: PropTypes.func.isRequired,
    createQuestion: PropTypes.func.isRequired,
};
export default class AddQuestion extends BasicComponent {

    constructor(props) {
        super(props);
        this.state = {
            categorySlug: null,
            currentTab: "Type",
            subCategories: [],
            selectedTags: [],
            title: "",
            body: "",
        }
    }

    setCategory = category => {
        this.changeStateValues(new Map([['categorySlug', category], ['currentTab', 'Tags']]));
        this.props.getSubCategoriesByCategory(category, this);
    };

    setTags = tags => {
        this.changeStateValues(new Map([['selectedTags', tags], ['currentTab', 'Title']]));
    };

    setTitle = title => {
        title = title.replace(/ +/g, ' ');
        this.changeStateValue('title', title.trim());
    };

    setBody = body => {
        this.changeStateValues(new Map([['body', body], ['currentTab', 'Description']]));
    };

    goToTab = (tab) => {
        this.changeStateValue('currentTab', tab);
    };

    postQuestion = () => {
        const { title, body, categorySlug, selectedTags } = this.state;
        let slug = title.toLowerCase().replace(/[^a-z0-9 ]/g, "");
        const question: Question = {
            title: title,
            body: body,
            categorySlug: categorySlug,
            tags: JSON.stringify(selectedTags),
            slug: slug.replace(/ /g, '-'),
        };
        this.props.createQuestion(question, this.props.history)
    };

    render() {
        const { currentTab, categorySlug, subCategories, selectedTags, title, body } = this.state;
        const isDisabled = !categorySlug;
        return (
            <section className="tabs-container pl3 pr3 pt5">
                <Tabs activeTab={currentTab}>
                    <div label="Type">
                        <TypeQuestionTab category={categorySlug} next={this.setCategory}/>
                    </div>
                    <div label="Tags" isDisabled={isDisabled}>
                        <TagsQuestionTab subCategories={subCategories} selectedTags={selectedTags} previous={this.goToTab} next={this.setTags}/>
                    </div>
                    <div label="Title" isDisabled={isDisabled}>
                        <TitleQuestionTab title={title} previous={this.goToTab} next={this.goToTab} setTitle={this.setTitle}/>
                    </div>
                    <div label="Description" isDisabled={isDisabled}>
                        <DescriptionQuestionTab body={body} previous={this.goToTab} next={this.goToTab} setBody={this.setBody}/>
                    </div>
                    <div label="Review" isDisabled={isDisabled}>
                        <ReviewQuestionTab title={title} body={body} tags={selectedTags} postQuestion={this.postQuestion}/>
                    </div>
                </Tabs>
            </section>
        )
    }
}
AddQuestion.propTypes = propTypes;
