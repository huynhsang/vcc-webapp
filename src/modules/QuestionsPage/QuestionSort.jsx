import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { DEFAULT_SORTS } from './questionFiltters.constant';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
    formControl: {
        marginRight: 10,
        minWidth: 230,
        '@media (max-width: 768px)': {
            width: '100%',
            marginRight: 0,
        }
    }
}));

const QuestionSort = ({ show, onChangeFilter }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const sortElements = DEFAULT_SORTS.map(ele => (
        <MenuItem key={ele.value} value={ele.value}>
            {t(ele.label)}
        </MenuItem>
    ));

    const onChange = ev => {
        const { value } = ev.target;
        onChangeFilter({ show: value});
    };

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel}>{t('common_sort_by')}</InputLabel>
            <Select
                labelWidth={labelWidth}
                value={show || ''}
                onChange={onChange}
            >
                {sortElements}
            </Select>
        </FormControl>
    );
};

export default QuestionSort;
