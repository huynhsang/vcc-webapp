import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
    formControl: {
        width: '100%',
        margin: '10px 0'
    }
}));

const SelectInput = ({ title, value, options, handleValue }) => {
    const classes = useStyles();

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        handleValue(event.target.value);
    };

    const optionsRender = options.map(option => (
        <option key={option.value} value={option.value}>
            {option.label}
        </option>
    ));

    return (
        <FormControl
            margin="dense"
            variant="outlined"
            className={classes.formControl}
        >
            <InputLabel
                ref={inputLabel}
                htmlFor="outlined-select-native-simple"
            >
                {title}
            </InputLabel>
            <Select
                native
                value={value}
                onChange={handleChange}
                labelWidth={labelWidth}
                inputProps={{
                    id: 'outlined-select-native-simple'
                }}
            >
                <option value="" key="" />
                {optionsRender}
            </Select>
        </FormControl>
    );
};

export default SelectInput;
