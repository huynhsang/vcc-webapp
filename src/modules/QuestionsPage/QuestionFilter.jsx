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

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const FlexWrapper = styled.div`
    display: flex;
    ${media.mobileLandscape`
        display: block;
    `}
`;

const useStyles = makeStyles(() => ({
    searchInput: {
        flexGrow: 1,
        flexBasis: 0,
        minHeight: 0,
        '@media (max-width: 768px)': {
            width: '100%',
            marginTop: '15px'
        }
    }
}));

const QuestionFilter = ({
    category,
    show,
    tags,
    text,
    history,
    onChangeFilter
}) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [searchText, setSearchText] = React.useState(text || '');

    const search = () => {
        onChangeFilter({ text: searchText });
    };

    const onTextKeyUp = ev => {
        if (ev.which === 13) {
            search();
        }
    };

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
                        value={searchText}
                        onChange={ev => setSearchText(ev.target.value)}
                        onKeyUp={onTextKeyUp}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={search}
                                        edge="end"
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </FlexWrapper>
            </DefaultWrapper>
        </>
    );
};

export default withRouter(QuestionFilter);
