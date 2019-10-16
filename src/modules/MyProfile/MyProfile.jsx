import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import CoreService from '../../global/CoreService';
import Result from '../../global/Result';

import { SelectButton } from 'primereact/selectbutton';

import Infos from './Infos';
import EditForm from './EditForm';

const DefaultPhoto = require(`../../static/resources/img/bg-user.jpg`);

const { accountService } = CoreService;

const Wrapper = styled.div`
    font-size: 16px;
    background-color: white;
`;

const TopBackground = styled.div`
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

const MyProfile = ({ getProfileById, subRoutes, location, App }) => {
    const { currentUser, isAuthenticated } = App;

    const items = [
        { label: 'Info', value: 'info' },
        { label: 'Edit', value: 'edit' }
    ];

    const [action, setAction] = React.useState(items[1].value);

    if (!isAuthenticated) {
        return <div />;
    }

    const { firstName, lastName, avatar } = currentUser;

    return (
        <Wrapper className="container discy-container">
            <div className="row">
                <TopBackground className="profile-background-image box-shadow--blur" />
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
                        <EditForm currentUser={currentUser} />
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
export default connect(mapStateToProps)(MyProfile);
