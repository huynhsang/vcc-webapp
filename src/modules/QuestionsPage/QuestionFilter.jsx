import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import { DefaultWrapper } from '../../component/Wrappers';
import CategoryFilter from './CategoryFilter';
import QuestionSort from './QuestionSort';
import TagFilter from './TagFilter';
import { withRouter } from 'react-router-dom';

const FlexWrapper = styled.div`
    display: flex;
`;

const useStyles = makeStyles(() => ({
    searchInput: {
        flexGrow: 1,
        flexBasis: 0,
        minHeight: 0,
        '& input': {
            border: 'none',
            height: 32
        }
    }
}));

const QuestionFilter = ({ category, show, tags, history, onChangeFilter }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <CategoryFilter category={category} history={history} />
            <DefaultWrapper>
                <TagFilter
                    category={category}
                    tags={tags}
                    onChangeFilter={onChangeFilter}
                />
                <FlexWrapper>
                    <QuestionSort show={show} onChangeFilter={onChangeFilter} />
                    <TextField
                        className={classes.searchInput}
                        label={t('question_search_question')}
                        variant="outlined"
                    />
                </FlexWrapper>
            </DefaultWrapper>
        </>
    );
};

export default withRouter(QuestionFilter);
