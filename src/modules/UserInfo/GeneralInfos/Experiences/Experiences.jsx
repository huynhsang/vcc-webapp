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

const ExperienceInfo = styled(FlexWrapper)`
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

const Experiences = ({
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

    const formatDate = i18n.language === 'en' ? 'mmmm yyyy' : 'mm/yyyy';

    const experiencesRender = Object.values(experiences).map(val => (
        <FlexWrapper key={val.id}>
            <Img src={defaultCompanyLogo} alt="" width="100" />
            <ExperienceInfo>
                <div>
                    <h5>{val.title}</h5>
                    <p>{val.company}</p>
                    <p>{` ${dateformat(val.startDate, formatDate)} - ${
                        val.isWorkings
                            ? t('common_present')
                            : dateformat(val.endDate, formatDate)
                    }`}</p>
                    <p >{val.location}</p>
                    <p>{val.description}</p>
                </div>
                {canEdit && (
                    <IconButton onClick={() => setEditExperienceId(val.id)}>
                        <EditIcon />
                    </IconButton>
                )}
            </ExperienceInfo>
        </FlexWrapper>
    ));

    return (
        <Wrapper>
            <FlexWrapper>
                <h4>{t('common_experience')}</h4>
                {canEdit && (
                    <IconButton onClick={() => setIsShowing(true)}>
                        <AddIcon color="primary" />
                    </IconButton>
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
)(Experiences);
