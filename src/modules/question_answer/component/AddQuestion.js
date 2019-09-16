import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../../component/tabs/Tabs';
import TypeQuestionTab from './tabs/TypeQuestion';
import TagsQuestionTab from './tabs/TagsQuestion';
import TitleQuestionTab from './tabs/TitleQuestion';
import DescriptionQuestionTab from './tabs/DescriptionQuestion';
import ReviewQuestionTab from './tabs/ReviewQuestion';

const AddQuestion = ({
  history,
  getSubCategoriesByCategory,
  createQuestion,
}) => {
  const [categorySlug, setCategorySlug] = React.useState(null);
  const [currentTab, setCurrentTab] = React.useState('Type');
  const [subCategories, setSubCategories] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [titleEditted, setTitleEditted] = React.useState('');
  const [bodyEditted, setBodyEditted] = React.useState('');

  const setCategory = category => {
    setCategorySlug(category);
    setCurrentTab('Tags');
    getSubCategoriesByCategory(category, setSubCategories);
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

  const goToTab = tab => {
    setCurrentTab(tab);
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
    createQuestion(question, history);
  };

  const isDisabled = !categorySlug;
  return (
    <section className="tabs-container pl3 pr3 pt5">
      <Tabs activeTab={currentTab}>
        <div label="Type">
          <TypeQuestionTab category={categorySlug} next={setCategory} />
        </div>
        <div label="Tags" isDisabled={isDisabled}>
          <TagsQuestionTab
            subCategories={subCategories}
            selectedTags={selectedTags}
            previous={goToTab}
            next={setTags}
          />
        </div>
        <div label="Title" isDisabled={isDisabled}>
          <TitleQuestionTab
            title={titleEditted}
            previous={goToTab}
            next={goToTab}
            setTitle={setTitle}
          />
        </div>
        <div label="Description" isDisabled={isDisabled}>
          <DescriptionQuestionTab
            body={bodyEditted}
            previous={goToTab}
            next={goToTab}
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

AddQuestion.propTypes = {
  getSubCategoriesByCategory: PropTypes.func.isRequired,
  createQuestion: PropTypes.func.isRequired,
};

export default AddQuestion;
