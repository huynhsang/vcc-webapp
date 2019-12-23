import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { SelectButton } from 'primereact/selectbutton';

import Infos from './Infos';
import ChangePassword from './ChangePassword';
import EditForm from './EditForm';
import { useTranslation } from 'react-i18next';

import { updateCurrentUserFn } from '../../../actions/app';
import { showErrorAlertFn } from '../../../actions/sweetAlert';

const Wrapper = styled.div`
    margin-top: 15px;
`;

const ButtionsWrapper = styled.div`
    margin-bottom: 15px;
`;

const MyProfile = ({ location, App, updateCurrentUser, showErrorAlert }) => {
    const { t } = useTranslation();

    const { currentUser, isAuthenticated } = App;

    const items = [
        { label: t('common_my_profile'), value: 'info' },
        { label: t('common_edit'), value: 'edit' },
        { label: t('my_profile_change_password'), value: 'change-password' }
    ];

    const [action, setAction] = React.useState(items[0].value);
    const userId = location.pathname.split('/')[2];

    if (!isAuthenticated || !currentUser || userId !== currentUser.id) {
        return <div />;
    }

    return (
        <Wrapper>
            <ButtionsWrapper>
                <SelectButton
                    value={action}
                    options={items}
                    onChange={e => setAction(e.value)}
                />
            </ButtionsWrapper>
            {action === 'edit' && (
                <EditForm
                    currentUser={currentUser}
                    updateCurrentUser={updateCurrentUser}
                    showErrorAlert={showErrorAlert}
                />
            )}
            {action === 'change-password' && <ChangePassword />}
            {action === 'info' && <Infos currentUser={currentUser} />}
        </Wrapper>
    );
};

const mapStateToProps = ({ App }) => ({
    App
});

const mapDispatchToProps = dispatch => ({
    updateCurrentUser: data => dispatch(updateCurrentUserFn(data)),
    showErrorAlert: text => dispatch(showErrorAlertFn('ERROR!', text))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
