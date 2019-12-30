import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { setToRegistreFn } from '../../actions/app';

import Cover from '../../images/cover.png';

import { REGISTRE_MENTOR_FORM_LINK } from '../ContactUs';

const CoverWrapper = styled.div`
    background-image: url('${Cover}');
    filter: progid: DXImageTransform.Microsoft.AlphaImageLoader(src='${Cover}', sizingMethod="scale");
    -ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${Cover}',sizingMethod='scale')";
    background-color: black !important;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center right;
`;

const AskWrapper = styled.div`
    font-size: 17px;
    line-height: 30px;
    margin-bottom: 10px;
    color: white;

    & a {
        color: #ffff00cc;
        border-bottom: 1px solid;
        margin-left: 10px;
        user-select: none;

        &:hover {
            color: yellow;
        }
    }
`;

const Glass = styled.div`
    background: #0000006b;
`;

const FindOut = styled.div`
    position: relative;
    margin: 20px 0 0 20px;
    font-size: 17px;
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
    }
`;

const PageCover = ({
    isAuthenticated,
    setToRegistre,
}) => {
    const { t } = useTranslation();

    return (
        <>
            <section>
                <CoverWrapper className="call-action-unlogged call-action-dark call-action-style_1">
                    <Glass className="call-action-opacity" />
                    <div className="discy-container">
                        <div className="col7">
                            <AskWrapper>
                                {t('home_ask_verified_professionals')}
                                <Link to="/add-question">
                                    {`+ ${t('home_ask_a_question')}`}
                                </Link>
                            </AskWrapper>
                            <p>{t('home_want_to_get')}</p>
                            <FindOut>
                                <a
                                    href={REGISTRE_MENTOR_FORM_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('home_find_out_how')}
                                </a>
                            </FindOut>
                        </div>
                        {!isAuthenticated && (
                            <div className="col3">
                                <a //eslint-disable-line jsx-a11y/anchor-is-valid
                                    onClick={setToRegistre}
                                    className="signup-panel button-default call-action-button"
                                    style={{ marginTop: '47.5px' }}
                                >
                                    {t('home_create_a_new_account')}
                                </a>
                            </div>
                        )}
                    </div>
                </CoverWrapper>
            </section>
        </>
    );
};

const mapStateToProps = ({ App : {isAuthenticated} }) => ({
    isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    setToRegistre: () => dispatch(setToRegistreFn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageCover);
