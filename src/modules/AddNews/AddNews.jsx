import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import dateformat from 'dateformat';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getUsers } from '../../services/user.service';

import { createNews } from '../../services/news.service';
import { DefaultWrapper } from '../../component/Wrappers';
import { errorAlertFn, successAlertFn } from '../../actions/alertConfirm';
import { getUserName } from '../../utils/get-user-name';

const useStyles = makeStyles(() => ({
    marginBottom: {
        marginBottom: '10px'
    }
}));

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 15px;
`;

const Wrapper = styled(DefaultWrapper)`
    min-height: calc(100vh - 100px);
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const AddNews = ({ errorAlert, successAlert }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [users, setUsers] = React.useState([]);
    const [news, setNews] = React.useState({
        title: '',
        description: '',
        expireOn: new Date(),
        userId: ''
    });

    React.useEffect(() => {
        getUsers()
            .then((data) => {
                setUsers(data || []);
                setNews({
                    title: '',
                    description: '',
                    expireOn: new Date(),
                    userId: ''
                });
            })
            .catch((err) => errorAlert(err.response.data.error.message));
    }, []);

    const { title, description, expireOn, userId } = news;

    const updateNews = (obj) => {
        setNews((state) => ({ ...state, ...obj }));
    };

    const onSubmit = () => {
        createNews(news)
            .then(() => {
                successAlert(t('news_create_success'));
            })
            .catch((err) => errorAlert(err.response.data.error.message));
    };

    const handleUsers = (ev, value) => {
        updateNews({ userId: value ? value.id : null });
    };

    const defaultUser = users.find((val) => val.id === userId);

    return (
        <Wrapper>
            <Title>{t('common_add_news')}</Title>
            <TextField
                fullWidth
                className={classes.marginBottom}
                variant="outlined"
                label={t('common_title')}
                value={title}
                onChange={(ev) => updateNews({ title: ev.target.value })}
            />
            <Autocomplete
                className={classes.marginBottom}
                options={users}
                getOptionLabel={(u) => getUserName(u)}
                value={defaultUser}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label={t('common_main_character')}
                        placeholder={t('common_user_name')}
                    />
                )}
                onChange={handleUsers}
            />
            <TextField
                fullWidth
                className={classes.marginBottom}
                variant="outlined"
                label={t('common_description')}
                value={description}
                multiline
                rows="4"
                onChange={(ev) => updateNews({ description: ev.target.value })}
            />
            <TextField
                label={t('common_start_date')}
                type="date"
                defaultValue={dateformat(expireOn, 'yyyy-mm-dd')}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true
                }}
                onChange={(ev) =>
                    updateNews({
                        expireOn: ev.target.value
                    })
                }
            />
            <ButtonWrapper>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    {t('common_submit')}
                </Button>
            </ButtonWrapper>
        </Wrapper>
    );
};

const mapDispatchToProps = (dispatch) => ({
    errorAlert: (text) => dispatch(errorAlertFn(text)),
    successAlert: (text) => dispatch(successAlertFn(text))
});

export default connect(null, mapDispatchToProps)(AddNews);
