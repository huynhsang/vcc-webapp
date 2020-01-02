import React from 'react';
import { useTranslation } from 'react-i18next';
import isoLangs from '../../services/localize/iso-langs.json';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3)
        }
    },
    input: {
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 14,
        fontWeight: 300,
        padding: '5px 21px 5px 7px',
        width: '120px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(','),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            backgroundColor: theme.palette.background.paper
        }
    }
}))(InputBase);

const useStyles = makeStyles(() => ({
    selectLabel: {
        transform: 'unset',
        color: 'rgba(255,255,255,1)',
        fontSize: 14,
        fontWeight: 300,
        '&.Mui-focused': {
            color: 'rgba(255,255,255, 1) !important'
        }
    },
    centerLabel: {
        left: '50%',
        transform: 'translateX(-50%)'
    }
}));

const LanguageSelector = ({ isSmallSize }) => {
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    return (
        <div>
            <FormControl>
                <InputLabel
                    className={`${classes.selectLabel} ${
                        isSmallSize ? classes.centerLabel : ''
                    }`}
                    shrink
                >
                    {t('common_language')}
                </InputLabel>
                <NativeSelect
                    value={i18n.language}
                    onChange={ev => i18n.changeLanguage(ev.target.value)}
                    input={<BootstrapInput />}
                >
                    {i18n.languages.map(lang => (
                        <option value={lang} key={lang}>
                            {isoLangs[lang]}
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>
        </div>
    );
};

export default LanguageSelector;
