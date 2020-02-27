import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
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
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 2px;
    padding: 20px;
    margin-bottom: 15px;
`;

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
        <FlexWrapper key={val.id}>
            <Img src={defaultCompanyLogo} alt="" width="100" />
            <EducationInfo>
                <div>
                    <h5>{val.degree}</h5>
                    <p>{val.fieldOfStudy}</p>
                    <p>{`${val.fromYear} - ${val.toYear}`}</p>
                    <p>{val.description}</p>
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
        <Wrapper>
            <FlexWrapper>
                <h4>{t('common_education')}</h4>
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
)(Educations);
