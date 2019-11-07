import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoCompany from '../../../../static/resources/img/logo/est-rouge.png';

import EducationModal from './EducationModal';

import {
    createEducationFn,
    editEducationFn
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

const EducationInfo = styled(FlexWrapper)`
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

const Educations = ({
    location,
    createEducation,
    editEducation,
    userInfos
}) => {
    const { t } = useTranslation();

    const {
        educations,
        userProfile,
        isChangingEducation,
        isFetchingError
    } = userInfos;

    const [isShowingModal, setIsShowingModal] = React.useState(false);

    const [editEducationId, setEditEducationId] = React.useState(null);

    React.useEffect(() => {
        if (editEducationId) {
            setIsShowingModal(true);
        }
    }, [editEducationId]);

    const onSubmit = data => {
        delete data.modified;
        delete data.created;
        if (data.id) {
            editEducation(data);
        } else {
            createEducation({
                ...data,
                ownerId: currentUserId
            });
        }
    };

    const onClose = () => {
        setIsShowingModal(false);
        setEditEducationId(null);
    };

    const { id: currentUserId } = getIdAndToken();

    const canEdit = currentUserId === userProfile.id;

    const educationsRender = Object.values(educations).map(val => (
        <FlexWrapper key={val.id} className="box-content--info mt2">
            <div className="logo-company">
                <img
                    src={logoCompany}
                    alt=""
                    width="100"
                    className="img-responsive"
                />
            </div>
            <EducationInfo>
                <div>
                    <h6 className="m0">{val.degree}</h6>
                    <p className="font-size-14">{val.fieldOfStudy}</p>
                    <p className="note">{`${val.fromYear} - ${val.toYear}`}</p>
                    <p className="note pt2">{val.description}</p>
                </div>
                {canEdit && (
                    <IconWrapper
                        className="experience--icon"
                        onClick={() => setEditEducationId(val.id)}
                    >
                        <i className="pi pi-pencil" />
                    </IconWrapper>
                )}
            </EducationInfo>
        </FlexWrapper>
    ));

    return (
        <Wrapper className="p5 mt3 mb3">
            <FlexWrapper>
                <h5 className="title-user m0">{t('common_education')}</h5>
                {canEdit && (
                    <IconWrapper
                        className="experience--icon"
                        onClick={() => setIsShowingModal(true)}
                    >
                        <i className="pi pi-plus" />
                    </IconWrapper>
                )}
            </FlexWrapper>
            {educationsRender}
            <EducationModal
                submit={onSubmit}
                isShowing={isShowingModal}
                onClose={onClose}
                educationToEdit={educations[editEducationId]}
                isChangingEducation={isChangingEducation}
                isFetchingError={isFetchingError}
            />
        </Wrapper>
    );
};

const mapStateToProps = ({ userInfos }) => ({ userInfos });

const mapDispatchToProps = dispatch => ({
    createEducation: data => dispatch(createEducationFn(data)),
    editEducation: data => dispatch(editEducationFn(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Educations));
