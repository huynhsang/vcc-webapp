import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 500,
    color: 'rgb(82, 82, 82)',
  },
  leftMargin: {
    marginLeft: '1em',
  },
}));

const CheckBox = ({
  label,
  isBold = true,
  isChecked = false,
  leftMargin = false,
  handleChange = () => {},
}) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      className={classes.formControlLabel}
      label={
        <FormLabel className={isBold ? classes.bold : ''}>{label}</FormLabel>
      }
      control={
        <Checkbox
          color='primary'
          className={leftMargin ? classes.leftMargin : ''}
          checked={isChecked}
          onChange={(ev) => handleChange(ev.target.checked)}
        />
      }
    />
  );
};

export default CheckBox;
