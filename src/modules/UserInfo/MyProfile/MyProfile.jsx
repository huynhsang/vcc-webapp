import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import CoreService from '../../../global/CoreService';
import Result from '../../../global/Result';

import { SelectButton } from 'primereact/selectbutton';

import Infos from './Infos';
import EditForm from './EditForm';
import { useTranslation } from 'react-i18next';

import { updateCurrentUserFn } from '../../../actions/app';

const DefaultPhoto = require(`../../../static/resources/img/bg-user.jpg`);

const { accountService } = CoreService;

const Wrapper = styled.div`
    margin-top: 15px;
`;

const ButtionsWrapper = styled.div`
    margin-bottom: 15px;
`;

const MyProfile = ({
    getProfileById,
    subRoutes,
    location,
    App,
    updateCurrentUser
}) => {
    const { t } = useTranslation();

    const { currentUser, isAuthenticated } = App;

    const items = [
        { label: t('common_my_profile'), value: 'info' },
        { label: t('common_edit'), value: 'edit' }
    ];

    const [action, setAction] = React.useState(items[0].value);
    const userId = location.pathname.split('/')[2];

    if (
        !isAuthenticated ||
        !currentUser ||
        parseInt(userId) !== currentUser.id
    ) {
        return <div />;
    }

    const { firstName, lastName, avatar } = currentUser;

    return (
        <Wrapper>
            <ButtionsWrapper>
                <SelectButton
                    value={action}
                    options={items}
                    onChange={e => setAction(e.value)}
                />
            </ButtionsWrapper>
            {action === 'edit' ? (
                <EditForm
                    currentUser={currentUser}
                    updateCurrentUser={updateCurrentUser}
                />
            ) : (
                <Infos currentUser={currentUser} />
            )}
        </Wrapper>
    );
};

const mapStateToProps = ({ App }) => ({
    App
});

const mapDispatchToProps = dispatch => ({
    updateCurrentUser: data => dispatch(updateCurrentUserFn(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfile);
