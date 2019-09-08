import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { changeLanguage, i18n } from '../../services/localize';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  select: {
    color: 'white',
    fontSize: '12px',
    minWidth: '90px',
    '& svg': {
      color: 'white',
    },
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: '#535252',
    },
  },
}));

const items = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Vietnamese',
    value: 'vi',
  },
];

const supportLanguges = ['en', 'vi'];

const LanguageSelector = () => {
  const classes = useStyles();

  useTranslation();

  return (
    <Select
      value={
        supportLanguges.includes(i18n.language) ? i18n.language : 'language'
      }
      onChange={ev => changeLanguage(ev.target.value)}
      autoWidth
      className={classes.select}
    >
      <MenuItem key="language" value="language" disabled>
        <em style={{ color: '#a8a8a8' }}>Language</em>
      </MenuItem>
      {items.map(val => (
        <MenuItem key={val.value} value={val.value}>
          {val.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelector;
