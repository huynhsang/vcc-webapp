import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { toggleContactUsFn } from '../../actions/app';

import VCNCLogo from '../../images/VCNC-logo.png';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const REGISTRE_MENTOR_FORM_LINK =
    'https://docs.google.com/forms/d/e/1FAIpQLSd8OGWo4yevWotalne-vQjCgWmXiogr374rR8QuCRHbK0rEAw/viewform?usp=pp_url';
const REGISTRE_MENTEE_FORM_LINK =
    'https://docs.google.com/forms/d/e/1FAIpQLSfhMbG6WVOWnw7Rye27A99QOElj0MfdW47q1U_4ei1ZW-wpQA/viewform?usp=pp_url';
const VCNC_BLOG_EMAIL = 'vcncblog@gmail.com';
const VCNC_APP_EMAIL = 'vcnc.app@gmail.com';

const useStyle = makeStyles(() => ({
    dialog: {
        '& .MuiDialog-paper': {
            '@media (max-width: 768px)': {
                margin: 10
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
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
`;

const Logo = styled.img`
    width: 50px;
`;

const InfoWrapper = styled.div`
    & i {
        font-size: 12px;
    }

    margin-top: 10px;
`;

const ContactUs = ({ isOpenContactUs, toggleContactUs }) => {
    const { t } = useTranslation();
    const classes = useStyle();
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
                <HelloWrapper>{t('contact_us_hello')}!</HelloWrapper>
                <InfoWrapper>
                    <i className="pi pi-angle-right" />
                    {t('contact_us_if_you_want_to_registre')}
                    <strong>{` ${t('common_mentor')}, `}</strong>
                    {`${t('contact_us_please_complete_this_formule')}: `}
                    <a
                        href={REGISTRE_MENTOR_FORM_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        link
                    </a>
                </InfoWrapper>
                <InfoWrapper>
                    <i className="pi pi-angle-right"></i>
                    {t('contact_us_if_you_want_to_registre')}
                    <strong>{` ${t('common_mentee')}, `}</strong>
                    {`${t('contact_us_please_complete_this_formule')}: `}
                    <a
                        href={REGISTRE_MENTEE_FORM_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        link
                    </a>
                </InfoWrapper>
                <InfoWrapper>
                    <i className="pi pi-angle-right"></i>
                    {t('contact_us_if_you_want_to_share')}
                    <strong>{` ${t('common_your_history')}, `}</strong>
                    {`${t('contact_us_please_email_to')}: `}
                    <a href={`mailto:${VCNC_BLOG_EMAIL}`}>{VCNC_BLOG_EMAIL}</a>
                </InfoWrapper>
                <InfoWrapper>
                    <i className="pi pi-angle-right"></i>
                    {`${t('contact_us_feedback')}: `}
                    <a href={`mailto:${VCNC_APP_EMAIL}`}>{VCNC_APP_EMAIL}</a>
                </InfoWrapper>
            </DialogContent>
        </Dialog>
    );
};

const mapStateToProps = ({ App: { isOpenContactUs } }) => ({
    isOpenContactUs
});

const mapDispatchToProps = dispatch => ({
    toggleContactUs: val => dispatch(toggleContactUsFn(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
