import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import EducationModal from './EducationModal';

import {
    createEducationFn,
    editEducationFn
} from '../../../../actions/userInfos';

import { getIdAndToken } from '../../../../utils/cookie-tools';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import School from '@material-ui/icons/School';
import { createMediaTemplate } from '../../../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.section`
    width: calc(50% - 10px);
    margin-left: 10px;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 2px;
    padding: 10px 20px 20px;
    ${media.mobileLandscape`
        width: 100%; 
        margin: 0;
    `}
`;

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TopWrapper = styled(FlexWrapper)`
    padding-bottom: 5px;
`;

const EducationInfo = styled(FlexWrapper)`
    border-top: 1px solid #cacaca;
    padding-top: 10px;
    line-height: 26px;
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

const SchoolName = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
`;

const YearsWrapper = styled.span`
    color: #828282;
`;

const SchoolIcon = styled(School)`
    font-size: 2rem !important;
    margin-right: 10px;
`;

const DegreesWrapper = styled.ul`
    padding-left: 18px;
    margin: 5px 0;
`;

const Educations = ({ createEducation, editEducation, userInfos }) => {
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

    const onSubmit = (data) => {
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

    const educationsRender = Object.values(educations).map((val) => (
        <EducationInfo key={val.id}>
            <div>
                <SchoolName>{val.degree}</SchoolName>
                <div>{val.fieldOfStudy}</div>
                <div>
                    {val.school}
                    <YearsWrapper>{` (${val.fromYear} - ${val.toYear})`}</YearsWrapper>
                </div>
                <div>{val.description}</div>
                <DegreesWrapper>
                    {(val.degrees || []).map((val, key) => (
                        <li key={`degree-${key}`}>{val}</li>
                    ))}
                </DegreesWrapper>
            </div>
            {canEdit && (
                <IconButton onClick={() => setEditEducationId(val.id)}>
                    <EditIcon />
                </IconButton>
            )}
        </EducationInfo>
    ));

    return (
        <Wrapper>
            <TopWrapper>
                <FlexWrapper>
                    <SchoolIcon />
                    <Title>{t('common_education')}</Title>
                </FlexWrapper>
                {canEdit && (
                    <IconButton onClick={() => setIsShowingModal(true)}>
                        <AddIcon color="primary" />
                    </IconButton>
                )}
            </TopWrapper>
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

const mapDispatchToProps = (dispatch) => ({
    createEducation: (data) => dispatch(createEducationFn(data)),
    editEducation: (data) => dispatch(editEducationFn(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Educations);
