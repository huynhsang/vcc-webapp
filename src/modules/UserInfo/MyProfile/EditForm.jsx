import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import COUNTRIES from './countries.constant';

import dateformat from 'dateformat';

import TextField from '@material-ui/core/TextField';
import { SelectInput } from '../../../component/Inputs';

import Button from '@material-ui/core/Button';
import { Checkbox } from '../../../component/Inputs';

const useStyles = makeStyles(() => ({
    textInput: {
        width: '100%',
        margin: '10px 0'
    }
}));

const USERNAME_REGEX = /([A-Za-z0-9_]){8,24}/;

const Wrapper = styled.div`
    padding: 5px 20px 20px 20px;
    border-radius: 2px;
    background-color: white;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2);
`;

const ButtonsWrapper = styled.div`
    display: flex;
    margin-top: 15px;
    justify-content: end;

    & button:first-child {
        margin-right: 15px;
    }
`;

const EditForm = ({ currentUser, updateCurrentUser, errorAlert }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const { roles, ...data } = currentUser;
    const [userEditted, setUserEditted] = React.useState(data);

    const [birthDayEditted, setBirthDayEditted] = React.useState(null);

    const {
        username,
        lastName,
        firstName,
        nationality,
        dateOfBirth,
        summary,
        showRealName,
        gender
    } = userEditted;

    React.useEffect(() => {
        setBirthDayEditted(
            dateOfBirth ? dateformat(dateOfBirth, 'mm/dd/yyyy') : null
        );
    }, [dateOfBirth]);

    const updateUser = (name, value) => {
        setUserEditted({ ...userEditted, [name]: value });
    };

    const handleEvent = (name, ev) => updateUser(name, ev.target.value);

    const onSubmit = () => {
        if (!USERNAME_REGEX.test(username)) {
            return errorAlert(t('common_invalid_username'));
        }
        updateCurrentUser({
            ...userEditted,
            dateOfBirth: birthDayEditted ? new Date(birthDayEditted) : null
        });
    };

    const reset = () => {
        setUserEditted(currentUser);
    };

    return (
        <Wrapper>
            <TextField
                variant="outlined"
                className={classes.textInput}
                value={username}
                label={t('common_userName')}
                onChange={(e) => handleEvent('username', e)}
                margin="dense"
            />
            <TextField
                variant="outlined"
                className={classes.textInput}
                value={lastName}
                label={t('common_lastname')}
                onChange={(e) => handleEvent('lastName', e)}
                margin="dense"
            />
            <TextField
                variant="outlined"
                className={classes.textInput}
                value={firstName}
                label={t('common_firstname')}
                onChange={(e) => handleEvent('firstName', e)}
                margin="dense"
            />
            <Checkbox
                label={t('my_profile_show_real_name')}
                isChecked={showRealName}
                handleChange={(val) => updateUser('showRealName', val)}
            />
            <SelectInput
                title={t('common_gender')}
                value={gender}
                options={[
                    { value: 0, label: '' },
                    { value: 1, label: t('common_male') },
                    { value: 2, label: t('common_female') }
                ]}
                handleValue={(value) => updateUser('gender', value)}
            />
            <TextField
                className={classes.textInput}
                label={t('common_date_of_birth')}
                variant="outlined"
                type="date"
                defaultValue={dateformat(dateOfBirth, 'yyyy-mm-dd')}
                InputLabelProps={{
                    shrink: true
                }}
                margin="dense"
                onChange={(e) => setBirthDayEditted(e.target.value)}
            />
            <SelectInput
                title={t('my_profile_you_come_from')}
                value={nationality}
                options={COUNTRIES}
                handleValue={(value) => updateUser('nationality', value)}
            />
            <TextField
                className={classes.textInput}
                label={t('common_summary')}
                multiline
                rows="5"
                value={summary}
                variant="outlined"
                onChange={(e) => handleEvent('summary', e)}
            />
            <ButtonsWrapper>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={reset}
                >
                    {t('common_reset')}
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                >
                    {t('common_save')}
                </Button>
            </ButtonsWrapper>
        </Wrapper>
    );
};

export default EditForm;
