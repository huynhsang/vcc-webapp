import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const SwitchInput = ({ isChecked, handleChange, label }) => {
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={isChecked}
                    onChange={ev => handleChange(ev.target.checked)}
                    color="primary"
                />
            }
            label={label}
        />
    );
};

export default SwitchInput;
