import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoCompany from '../../../../static/resources/img/logo/est-rouge.png';

import { EducationMock } from '../../Mock';

import EducationModal from './EducationModal';
import CookieConstant from '../../../../common/constant/CookieConstant';
import CookieHelper from '../../../../common/util/CookieHelper';
const { getCookie } = CookieHelper;
const { jwtTokenName, userIdKey } = CookieConstant;

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
    min-width: 80%;
    padding-top: 10px;
`;

const IconWrapper = styled.a`
    display: flex;
    justify-content: center;
    & .pi {
        font-size: 26px;
    }
`;

const Educations = ({ location }) => {
    const { t } = useTranslation();

    const [educations, setEducations] = React.useState([]);
    const [isShowingModal, setIsShowingModal] = React.useState(false);

    React.useEffect(() => {
        setEducations([EducationMock]);
    }, []);

    const userId = location.pathname.split('/')[2];
    const canEdit = getCookie(userIdKey) === userId;

    const educationsRender = educations.map(val => (
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
                    <IconWrapper className="experience--icon">
                        <i className="pi pi-pencil" />
                    </IconWrapper>
                )}
            </EducationInfo>
        </FlexWrapper>
    ));

    return (
        <Wrapper className="p5 mt3 mb3">
            <FlexWrapper>
                <h5 className="title-user m0">Education</h5>
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
                isShowing={isShowingModal}
                setIsShowing={setIsShowingModal}
            />
        </Wrapper>
    );
};

export default withRouter(Educations);
