import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { showLoginConfirmFn } from '../../actions/alertConfirm';

import Cover from '../../images/cover.png';

import { DefaultWrapper } from '../../component/Wrappers';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const CoverWrapper = styled.section`
    background-image: url('${Cover}');
    filter: progid: DXImageTransform.Microsoft.AlphaImageLoader(src='${Cover}', sizingMethod="scale");
    -ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${Cover}',sizingMethod='scale')";
    background-color: black;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center right;

    width : 100%;
    height: 160px;
    position: relative;
    color: white;

    ${media.mobileLandscape`
        height: 150px;
    `}

    ${media.mobile`
        height: 180px;
    `}
`;

const Glass = styled.div`
    position: absolute;
    background: #0000006b;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

const ContentWrapper = styled(DefaultWrapper)`
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
`;

const LeftContent = styled.div`
    width: 70%;
    max-width: 550px;
    ${media.mobileLandscape`
        width: 90%;
    `}
`;

const AskWrapper = styled.div`
    font-size: 1.1rem;
    line-height: 30px;
    margin-bottom: 10px;
    color: white;

    & div {
        color: #ffff00cc;
        border-bottom: 1px solid;
        margin-left: 15px;
        user-select: none;
        white-space: nowrap;
        cursor: pointer;
        font-weight: 600;
        display: inline-block;
        line-height: 20px;
        padding-right: 2px;

        &:hover {
            color: yellow;
            transform: scale(1.1);
        }
    }
`;

const FindOut = styled.div`
    position: relative;
    margin: 20px 0 0 20px;
    font-size: 1.1rem;
    border: 1px solid #ffff00cc;
    width: 200px;
    height: 30px;
    & a {
        position: absolute;
        background-color: #dede00;
        color: black;
        bottom: 8px;
        left: 8px;
        height: 30px;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        cursor: pointer;
        text-decoration: none;
    }
`;

const PageCover = ({ showLoginConfirm, isAuthenticated, history }) => {
    const { t } = useTranslation();

    const onLickAddQuestion = () => {
        if (isAuthenticated) {
            history.push('/add-question');
        } else {
            showLoginConfirm();
        }
    };

    return (
        <CoverWrapper>
            <Glass />
            <ContentWrapper>
                <LeftContent>
                    <AskWrapper>
                        {t('home_ask_verified_professionals')}
                        <div onClick={onLickAddQuestion}>
                            {`+ ${t('home_ask_a_question')}`}
                        </div>
                    </AskWrapper>
                    <FindOut>
                        <Link to="/information">{t('home_find_out_how')}</Link>
                    </FindOut>
                </LeftContent>
            </ContentWrapper>
        </CoverWrapper>
    );
};

const mapStateToProps = ({ App: { isAuthenticated } }) => ({
    isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    showLoginConfirm: () => dispatch(showLoginConfirmFn())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PageCover));
