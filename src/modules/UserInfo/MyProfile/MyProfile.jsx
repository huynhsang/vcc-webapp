import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Infos from './Infos';
import ChangePassword from './ChangePassword';
import EditForm from './EditForm';
import { useTranslation } from 'react-i18next';

import { updateCurrentUserFn } from '../../../actions/app';
import { errorAlertFn } from '../../../actions/alertConfirm';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    root: {
        width: 500,
        background: '#f1f1f1'
    },
    label: {
        '& .MuiBottomNavigationAction-label': {
            fontSize: '14px'
        },
        '& .MuiBottomNavigationAction-label.Mui-selected': {
            fontSize: '15px'
        }
    }
});

const Wrapper = styled.div`
    margin-top: 15px;
`;

const ButtionsWrapper = styled.div`
    margin-top: 15px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
`;

const ITEMS = [
    { label: 'common_my_profile' },
    { label: 'common_edit' },
    { label: 'my_profile_change_password' }
];

const MyProfile = ({ location, App, updateCurrentUser, errorAlert }) => {
    const { t } = useTranslation();

    const { currentUser, isAuthenticated } = App;

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const userId = location.pathname.split('/')[2];

    if (!isAuthenticated || !currentUser || userId !== currentUser.id) {
        return <div />;
    }

    const tabsRender = ITEMS.map((item, key) => (
        <BottomNavigationAction
            key={`item-${key}`}
            className={classes.label}
            label={t(item.label)}
        />
    ));

    return (
        <Wrapper>
            {value === 0 && <Infos currentUser={currentUser} />}
            {value === 1 && (
                <EditForm
                    currentUser={currentUser}
                    updateCurrentUser={updateCurrentUser}
                    errorAlert={errorAlert}
                />
            )}
            {value === 2 && <ChangePassword />}
            <ButtionsWrapper>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}
                >
                    {tabsRender}
                </BottomNavigation>
            </ButtionsWrapper>
        </Wrapper>
    );
};

const mapStateToProps = ({ App }) => ({
    App
});

const mapDispatchToProps = dispatch => ({
    updateCurrentUser: data => dispatch(updateCurrentUserFn(data)),
    errorAlert: text => dispatch(errorAlertFn(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
