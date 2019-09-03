import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { changeLanguage, i18n } from '../../services/localize';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  select: {
    color: 'white',
    fontSize: '12px',
    '& svg': {
      color: 'white',
    },
    '&:before': {
      borderColor: 'white',
    },
  },
}));

const items = [
  {
    label: 'Language',
    value: '',
    disable: true,
  },
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Tiếng Việt',
    value: 'vi',
  },
];

const LanguageSelector = ({}) => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <Select
      value={i18n.language}
      onChange={ev => changeLanguage(ev.target.value)}
      autoWidth
      className={classes.select}
    >
      {items.map(val => (
        <MenuItem
          key={val.key}
          value={val.value}
          disabled={val.disable || false}
        >
          {val.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelector;
