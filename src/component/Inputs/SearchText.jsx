import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({
    searchInput: {
        width: '100%'
    }
}));

const SearchText = ({ text, setText, label }) => {
    const classes = useStyles();

    const [searchText, setSearchText] = React.useState(text || '');

    const search = () => {
        setText(searchText);
    };

    const onTextKeyUp = ev => {
        if (ev.which === 13) {
            search();
        }
    };

    return (
        <TextField
            className={classes.searchInput}
            label={label}
            variant="outlined"
            value={searchText}
            onChange={ev => setSearchText(ev.target.value)}
            onKeyUp={onTextKeyUp}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton size="small" onClick={search} edge="end">
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default SearchText;
