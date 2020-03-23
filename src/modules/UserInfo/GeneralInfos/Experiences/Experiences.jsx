import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import ExperienceModal from './ExperienceModal';
import { connect } from 'react-redux';
import defaultCompanyLogo from '../../../../images/defaultCompanyLogo.jpg';

import {
    createExperienceFn,
    editExperienceFn
} from '../../../../actions/userInfos';

import { getIdAndToken } from '../../../../utils/cookie-tools';
import dateformat from 'dateformat';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import Work from '@material-ui/icons/Work';
import { createMediaTemplate } from '../../../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.section`
    width: calc(50% - 10px);
    margin-right: 10px;
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

const ExperienceInfo = styled(FlexWrapper)`
    border-top: 1px solid #cacaca;
    padding-top: 10px;
    line-height: 26px;
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

const JobName = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
`;

const GrayWrapper = styled.div`
    color: #828282;
`;

const WorkIcon = styled(Work)`
    font-size: 2rem !important;
    margin-right: 10px;
`;

const Experiences = ({ userInfos, createExperience, editExperience }) => {
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

    const formatDate = i18n.language === 'en' ? 'mmmm yyyy' : 'mm/yyyy';

    const experiencesRender = Object.values(experiences).map(val => (
        <ExperienceInfo key={val.id}>
            <div>
                <JobName>{val.title}</JobName>
                <div>{val.company}</div>
                <GrayWrapper>{` ${dateformat(val.startDate, formatDate)} - ${
                    val.isWorkings
                        ? t('common_present')
                        : dateformat(val.endDate, formatDate)
                }`}</GrayWrapper>
                <GrayWrapper>{val.location}</GrayWrapper>
                <div>{val.description}</div>
            </div>
            {canEdit && (
                <IconButton onClick={() => setEditExperienceId(val.id)}>
                    <EditIcon />
                </IconButton>
            )}
        </ExperienceInfo>
    ));

    return (
        <Wrapper>
            <TopWrapper>
                <FlexWrapper>
                    <WorkIcon />
                    <Title>{t('common_experience')}</Title>
                </FlexWrapper>
                {canEdit && (
                    <IconButton onClick={() => setIsShowing(true)}>
                        <AddIcon color="primary" />
                    </IconButton>
                )}
            </TopWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(Experiences);
