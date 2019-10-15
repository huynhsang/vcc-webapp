import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import logoCompany from '../../../static/resources/img/logo/est-rouge.png';
import logoFram from '../../../static/resources/img/logo/fram.png';
import CoreService from '../../../global/CoreService';
import Result from '../../../global/Result';

import ApplicationUtil from '../../../common/util/ApplicationUtil';
import {
    showSuccessAlertFn,
    showErrorAlertFn
} from '../../../actions/sweetAlert';
import { Experiences } from './Experiences';
import { Educations } from './Educations';

import ProfileModal from './ProfileModal';

const { accountService } = CoreService;

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const GeneralInfos = ({
    profile,
    setProfile,
    showErrorNotification,
    showSuccessNotification
}) => {
    // const [experiencesEditted, setExperiencesEditted] = React.useState(experiences);

    const [isShownModal, setIsShownModal] = React.useState(false);

    const { id } = profile;
    const onSubmit = data => {
        if (id) {
            accountService.update(id, data).then((result: Result) => {
                if (result.success) {
                    setProfile(result.data);
                }
            });
        }
    };

    return (
        <>
            <section className="box-content--user p5 mt3 box-shadow--blur about-user">
                <FlexWrapper>
                    <h5 className="title-user m0">About</h5>
                    <button
                        className="btn btn-info"
                        onClick={() => setIsShownModal(true)}
                    >
                        Edit Profile
                    </button>
                </FlexWrapper>
                <p>
                    Until now 30/9/2018, I have more than 2 years experience on
                    the job developer (include: mobile and web (both front-end &
                    back-end)). I also have some knowledge about architecture
                    system. You can look on my CV attached for more details. I'm
                    a interesting, funny, sportive person and have a passion on
                    researching AI and new technologies.
                </p>
            </section>
            <Experiences />
            <Educations />
            <ProfileModal
                isShowing={isShownModal}
                setIsShowing={setIsShownModal}
                submit={onSubmit}
            />
        </>
    );
};

const mapStateToProps = ({ App: { isAuthenticated } }) => ({
    isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    showErrorNotification: data =>
        dispatch(showErrorAlertFn('Error!', ApplicationUtil.getErrorMsg(data))),
    showSuccessNotification: (title, text) =>
        dispatch(showSuccessAlertFn(title, text))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(GeneralInfos));
