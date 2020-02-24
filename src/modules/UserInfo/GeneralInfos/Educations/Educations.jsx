import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import defaultCompanyLogo from '../../../../images/defaultCompanyLogo.jpg';

import EducationModal from './EducationModal';

import {
    createEducationFn,
    editEducationFn
} from '../../../../actions/userInfos';

import { getIdAndToken } from '../../../../utils/cookie-tools';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';

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

const Img = styled.img`
    object-fit: contain;
    width: 14%;
    max-height: 90%;
    height: auto;
    margin-left: 1.5%;
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
        <FlexWrapper key={val.id} className="mt2">
            <Img src={defaultCompanyLogo} alt="" width="100" />
            <EducationInfo>
                <div>
                    <h6 className="m0">{val.degree}</h6>
                    <p className="font-size-14">{val.fieldOfStudy}</p>
                    <p className="note">{`${val.fromYear} - ${val.toYear}`}</p>
                    <p className="note pt2">{val.description}</p>
                </div>
                {canEdit && (
                    <IconButton onClick={() => setEditEducationId(val.id)}>
                        <EditIcon />
                    </IconButton>
                )}
            </EducationInfo>
        </FlexWrapper>
    ));

    return (
        <Wrapper className="p5 mt3 mb3">
            <FlexWrapper>
                <h5 className="title-user m0">{t('common_education')}</h5>
                {canEdit && (
                    <IconButton onClick={() => setIsShowingModal(true)}>
                        <AddIcon color="primary" />
                    </IconButton>
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
