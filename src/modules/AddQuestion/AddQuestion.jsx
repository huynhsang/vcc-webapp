import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { useTranslation } from 'react-i18next';

import Tabs from '../../component/Tabs/Tabs';
import TypeQuestionTab from './TypeQuestion';
import TagsQuestionTab from './TagsQuestion';
import TitleQuestionTab from './TitleQuestion';
import DescriptionQuestionTab from './DescriptionQuestion';
import ReviewQuestionTab from './ReviewQuestion';

import CoreService from '../../global/CoreService';
import Result from '../../global/Result';
import { Question } from '../../domain/Question';
import ApplicationUtil from '../../common/util/ApplicationUtil';

import { showSuccessAlertFn, showErrorAlertFn, showConfirmToLoginFn } from '../../actions/sweetAlert';

const { questionService } = CoreService;

const AddQuestion = ({
    history,
    createQuestion,
    showSuccessAlert,
    showErrorAlert,
    App,
    showConfirmToLogin,
    AlertState
}) => {

    const {t} = useTranslation();

    const {isAuthenticated, toAuthenticate} = App;

    React.useEffect(()=> {
        if(!isAuthenticated && !toAuthenticate ){
            showConfirmToLogin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isAuthenticated, toAuthenticate])
    
    const [currentTab, setCurrentTab] = React.useState('Type');

    const [categorySlug, setCategorySlug] = React.useState(null);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [titleEditted, setTitleEditted] = React.useState('');
    const [bodyEditted, setBodyEditted] = React.useState('');

    if(!isAuthenticated){
        return <div>
            {t('authentification_this_page_need_to_authenticate')}
        </div>
    }

    const setCategory = category => {
        setCategorySlug(category);
        setCurrentTab('Tags');
    };

    const setTags = tags => {
        setSelectedTags(tags);
        setCurrentTab('Title');
    };

    const setTitle = title => {
        const titleToSave = title.replace(/ +/g, ' ');
        setTitleEditted(titleToSave.trim());
    };

    const setBody = val => {
        setBodyEditted(val);
        setCurrentTab('Description');
    };

    const postQuestion = () => {
        let slug = titleEditted.toLowerCase().replace(/[^a-z0-9 ]/g, '');
        const question: Question = {
            title: titleEditted,
            body: bodyEditted,
            categorySlug,
            tags: JSON.stringify(selectedTags),
            slug: slug.replace(/ /g, '-'),
        };

        questionService.create(question).then((result: Result) => {
            if (result.success) {
                showSuccessAlert('Success!', 'Created a Question');
                history.push(`/home/question/${result.data.slug}/view`);
            } else {
                showErrorAlert(result.data);
            }
        });
    };

    const isDisabled = !categorySlug;
    return (
        <section className="tabs-container pl3 pr3 pt5">
            <Tabs activeTab={currentTab}>
                <div label="Type">
                    <TypeQuestionTab
                        category={categorySlug}
                        next={setCategory}
                    />
                </div>
                <div label="Tags" isDisabled={isDisabled}>
                    <TagsQuestionTab
                        category={categorySlug}
                        selectedTags={selectedTags}
                        previous={setCurrentTab}
                        next={setTags}
                    />
                </div>
                <div label="Title" isDisabled={isDisabled}>
                    <TitleQuestionTab
                        title={titleEditted}
                        previous={setCurrentTab}
                        next={setCurrentTab}
                        setTitle={setTitle}
                    />
                </div>
                <div label="Description" isDisabled={isDisabled}>
                    <DescriptionQuestionTab
                        body={bodyEditted}
                        previous={setCurrentTab}
                        next={setCurrentTab}
                        setBody={setBody}
                    />
                </div>
                <div label="Review" isDisabled={isDisabled}>
                    <ReviewQuestionTab
                        title={titleEditted}
                        body={bodyEditted}
                        tags={selectedTags}
                        postQuestion={postQuestion}
                    />
                </div>
            </Tabs>
        </section>
    );
};

const mapStateToProps = ({ App, AlertState }) => ({
    App,
    AlertState
});


const mapDispatchToProp = dispatch => ({
    showSuccessAlert: (title, text) =>
        dispatch(showSuccessAlertFn(title, text)),
    showErrorAlert: data =>
        dispatch(showErrorAlertFn('Error!', ApplicationUtil.getErrorMsg(data))),
    showConfirmToLogin : () => dispatch(showConfirmToLoginFn())
});

export default connect(
    mapStateToProps,
    mapDispatchToProp
)(AddQuestion);
