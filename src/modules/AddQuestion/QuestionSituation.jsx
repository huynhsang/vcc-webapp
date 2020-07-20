import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const Wrapper = styled.div``;

const QuestionSituation = ({
    usersToMatch,
    isPublic,
    supporterIds,
    setIsPublic,
    setSupporterIds
}) => {
    const { t } = useTranslation();

    const handleUsers = (ev, value) => {
        if (value && value.length <= 2) {
            setSupporterIds(value.map((val) => val.id));
        }
    };

    const defaultUsers = usersToMatch.filter((val) =>
        supporterIds.includes(val.id)
    );

    return (
        <Wrapper>
            <h3>{t('question_set_mode')}</h3>
            <p>{t('question_set_mode_des')}</p>
            <FormControlLabel
                control={
                    <Switch
                        checked={isPublic}
                        onChange={(ev) => setIsPublic(ev.target.checked)}
                        color="primary"
                    />
                }
                label={t(isPublic ? 'common_public' : 'common_private')}
            />
            <h3>{t('question_support_list')}</h3>
            <p>{t('question_support_list_des')}</p>
            <p>
                {`${t('question_support_list_des_sup_empty')} ${
                    isPublic ? t('question_support_list_require') : ''
                }`}
            </p>
            <Autocomplete
                multiple
                options={usersToMatch}
                getOptionLabel={(user) => user.username}
                value={defaultUsers || []}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label={t('common_users')}
                        placeholder={t('common_user')}
                    />
                )}
                onChange={handleUsers}
            />
        </Wrapper>
    );
};

export default QuestionSituation;
