import React from 'react';
import BasicComponent from "../../../common/abstract/component/BasicComponent";
import TypeQuestionTab from "../container/tabs/TypeQuestionImpl";
import TabsQuestionTab from "../container/tabs/TagsQuestionlmpl";
import TitleQuestionTab from "../container/tabs/TitleQuestionlmpl";
import DescriptionQuestionTab from "../container/tabs/DescriptionQuestionlmpl";
import ReviewQuestiontab from "../container/tabs/ReviewQuestionlmpl";

export default class AddQuestion extends BasicComponent {
    render() {
        return (
            <section className="tabs-container pl3 pr3">
                <TypeQuestionTab/>
                <TabsQuestionTab/>
                <TitleQuestionTab/>
                <DescriptionQuestionTab/>
                <ReviewQuestiontab/>
            </section>
        )
    }
}
