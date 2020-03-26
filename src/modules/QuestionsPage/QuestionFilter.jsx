import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import QuestionSort from './QuestionSort';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { SwitchInput } from '../../component/Inputs';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const FlexWrapper = styled.div`
    display: flex;
    ${media.mobileLandscape`
        display: block;
    `}
`;

const FlexMargin = styled(FlexWrapper)`
    margin-top: 10px;
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
    isAuthenticated,
    show,
    text,
    onChangeFilter,
    askme,
    mime,
    noanswer
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

    const onAskmeAndMimeChange = name => val => {
        const obj = val ? { mime: false, askme: false } : {};
        obj[name] = val;
        onChangeFilter(obj);
    };

    return (
        <>
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
            <FlexMargin>
                <SwitchInput
                    label={t('questions_no_answers')}
                    isChecked={noanswer === 'true'}
                    handleChange={val => onChangeFilter({ noanswer: val })}
                />
                {isAuthenticated && (
                    <>
                        <SwitchInput
                            label={t('questions_my_questions')}
                            isChecked={mime === 'true'}
                            handleChange={onAskmeAndMimeChange('mime')}
                        />
                        <SwitchInput
                            label={t('questions_ask_me')}
                            isChecked={askme === 'true'}
                            handleChange={onAskmeAndMimeChange('askme')}
                        />
                    </>
                )}
            </FlexMargin>
        </>
    );
};

export default QuestionFilter;
