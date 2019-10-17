import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import CoreService from '../../global/CoreService';
import Result from '../../global/Result';

import { SelectButton } from 'primereact/selectbutton';

import Infos from './Infos';
import EditForm from './EditForm';
import { useTranslation } from 'react-i18next';

import { updateCurrentUserFn } from '../../actions/app';

const DefaultPhoto = require(`../../static/resources/img/bg-user.jpg`);

const { accountService } = CoreService;

const Wrapper = styled.div`
    font-size: 16px;
    background-color: white;
`;

const TopBackground = styled.div`
    box-shadow: 0 2px 3px rgba(0,0,0,0.2);
    background-image: url('${DefaultPhoto}');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
`;

const BodyWrapper = styled.div`
    background-color: white;
    position: relative;
`;

const LeftSection = styled.div`
    min-height: 80px;
`;

const ButtionsWrapper = styled.div`
    margin-bottom: 10px;
`;

const MyProfile = ({
    getProfileById,
    subRoutes,
    location,
    App,
    updateCurrentUser
}) => {

    const {t} = useTranslation();

    const { currentUser, isAuthenticated } = App;

    const items = [
        { label: t('common_my_profile'), value: 'info' },
        { label: t('common_edit'), value: 'edit' }
    ];

    const [action, setAction] = React.useState(items[0].value);

    if (!isAuthenticated || !currentUser) {
        return <div />;
    }

    const { firstName, lastName, avatar } = currentUser;

    return (
        <Wrapper className="container discy-container">
            <div className="row">
                <TopBackground className="profile-background-image" />
                <LeftSection className="info-user position-relative col-lg-3">
                    <div className="avatar-user">
                        <img
                            src={avatar}
                            width="200"
                            alt=""
                            className="img-responsive"
                        />
                    </div>
                </LeftSection>
                <section className="box-content--user pt5 about-user col-lg-8">
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
                </section>
            </div>
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
