import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { toggleContactUsFn } from '../../actions/app';

import VCNCLogo from '../../images/VCNC-logo.png';
// import crispIcon from '../../images/crispIcon.png';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// import { openCrisp } from '../../utils/run-crisp';

export const REGISTRE_MENTOR_FORM_LINK =
    'https://docs.google.com/forms/d/e/1FAIpQLSd8OGWo4yevWotalne-vQjCgWmXiogr374rR8QuCRHbK0rEAw/viewform?usp=pp_url';
export const REGISTRE_MENTEE_FORM_LINK =
    'https://docs.google.com/forms/d/e/1FAIpQLSfhMbG6WVOWnw7Rye27A99QOElj0MfdW47q1U_4ei1ZW-wpQA/viewform?usp=pp_url';
const VCNC_BLOG_EMAIL = 'vcncblog@gmail.com';
const VCNC_APP_EMAIL = 'vcnc.app@gmail.com';

const useStyle = makeStyles(() => ({
    dialog: {
        '& .MuiDialog-paper': {
            maxWidth: '630px',
            '@media (max-width: 768px)': {
                margin: '10px'
            }
        }
    },
    title: {
        paddingBottom: 0,
        '& > h2': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    },
    content: {
        paddingBottom: 20
    }
}));

const HelloWrapper = styled.div`
    text-align: center;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 20px;
`;

const Logo = styled.img`
    width: 50px;
`;

const InfoWrapper = styled.div`
    margin-top: 10px;
`;

// const FlexWrapper = styled.div`
//     margin-top: 10px;
//     display: flex;
//     align-items: center;
// `;

// const CrispImg = styled.img`
//     width: 20px;
//     height: 20px;
//     border-radius: 50%;
//     margin: -3px 0 0 5px;
//     cursor: pointer;
// `;

const ContactUs = ({ isOpenContactUs, toggleContactUs }) => {
    const { t } = useTranslation();
    const classes = useStyle();

    // const toggleCrisp = () => {
    //     toggleContactUs(false);
    //     openCrisp();
    // };

    return (
        <Dialog
            className={classes.dialog}
            open={isOpenContactUs}
            onClose={() => toggleContactUs(false)}
        >
            <DialogTitle className={classes.title}>
                <Logo src={VCNCLogo} alt="" />
                <div>{t('common_contact_us')}</div>
                <IconButton size="small" onClick={() => toggleContactUs(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <HelloWrapper>{t('contact_us_hello')}</HelloWrapper>
                <InfoWrapper>
                    {t('contact_us_if_you_want_to_share')}
                    <a href={`mailto:${VCNC_BLOG_EMAIL}`}>{VCNC_APP_EMAIL}</a>.
                    {t('contact_us_reply_soon')}
                </InfoWrapper>
                {/* <FlexWrapper>
                    {t('contact_us_get_live_support')}:
                    <CrispImg
                        onClick={toggleCrisp}
                        src={crispIcon}
                        alt="crisp"
                    />
                </FlexWrapper> */}
                <InfoWrapper>{t('contact_us_sincerely')}</InfoWrapper>
                <div>VCNC team.</div>
            </DialogContent>
        </Dialog>
    );
};

const mapStateToProps = ({ App: { isOpenContactUs } }) => ({
    isOpenContactUs
});

const mapDispatchToProps = (dispatch) => ({
    toggleContactUs: (val) => dispatch(toggleContactUsFn(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
