import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ExperienceModal from './ExperienceModal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import defaultCompanyLogo from '../../../../images/defaultCompanyLogo.jpg';

import {
    createExperienceFn,
    editExperienceFn
} from '../../../../actions/userInfos';

import { getIdAndToken } from '../../../../utils/cookie-tools';

const Wrapper = styled.section`
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 2px;
`;

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ExperienceInfo = styled(FlexWrapper)`
    border-top: 1px solid #707885;
    width: 80%;
    padding-top: 10px;
`;

const IconWrapper = styled.a`
    display: flex;
    justify-content: center;
    & .pi {
        font-size: 26px;
    }
`;

const Img = styled.img`
    object-fit: contain;
    width: 14%;
    max-height: 90%;
    height: auto;
    margin-left: 1.5%;
`;

const Experiences = ({
    location,
    userInfos,
    createExperience,
    editExperience
}) => {
    const { t } = useTranslation();

    const {
        experiences,
        userProfile,
        isChangingExperience,
        isFetchingError
    } = userInfos;

    const [isShowing, setIsShowing] = React.useState(false);
    const [editExperienceId, setEditExperienceId] = React.useState(null);

    React.useEffect(() => {
        if (editExperienceId) {
            setIsShowing(true);
        }
    }, [editExperienceId]);

    const { id: currentUserId } = getIdAndToken();
    const canEdit = currentUserId === userProfile.id;

    const onSubmit = data => {
        delete data.modified;
        delete data.created;
        if (data.id) {
            editExperience(data);
        } else {
            createExperience({
                ...data,
                ownerId: currentUserId
            });
        }
    };

    const onClose = () => {
        setIsShowing(false);
        setEditExperienceId(null);
    };

    const experiencesRender = Object.values(experiences).map(val => (
        <FlexWrapper key={val.id} className="mt2">
            <Img src={defaultCompanyLogo} alt="" width="100" />
            <ExperienceInfo>
                <div>
                    <h6 className="m0 mr6">{val.title}</h6>
                    <p className="font-size-14">{val.company}</p>
                    <p>{` ${new Date(val.startDate).toDateString()} - ${
                        val.isWorking
                            ? 'Present'
                            : new Date(val.endDate).toDateString()
                    }`}</p>
                    <p className="note">{val.location}</p>
                    <p>{val.description}</p>
                </div>
                {canEdit && (
                    <IconWrapper
                        className="experience--icon"
                        onClick={() => setEditExperienceId(val.id)}
                    >
                        <i className="pi pi-pencil" />
                    </IconWrapper>
                )}
            </ExperienceInfo>
        </FlexWrapper>
    ));

    return (
        <Wrapper className="p5 mt3">
            <FlexWrapper>
                <h5 className="title-user m0">{t('common_experience')}</h5>
                {canEdit && (
                    <IconWrapper
                        className="experience--icon"
                        onClick={() => setIsShowing(true)}
                    >
                        <i className="pi pi-plus" />
                    </IconWrapper>
                )}
            </FlexWrapper>

            {experiencesRender}
            <ExperienceModal
                submit={onSubmit}
                isShowing={isShowing}
                onClose={onClose}
                experienceToEdit={experiences[editExperienceId]}
                isChangingExperience={isChangingExperience}
                isFetchingError={isFetchingError}
            />
        </Wrapper>
    );
};

const mapStateToProps = ({ userInfos }) => ({ userInfos });

const mapDispatchToProps = dispatch => ({
    createExperience: data => dispatch(createExperienceFn(data)),
    editExperience: data => dispatch(editExperienceFn(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Experiences));
