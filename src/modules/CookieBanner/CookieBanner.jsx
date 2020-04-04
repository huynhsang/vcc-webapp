import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { getCookie, setCookie, deleteCookie } from '../../utils/CookieHelper';

const CONSENT_REQUIRED_COOKIE_KEY = 'rcl_consent_given';

export const COOKIE_TYPE = {
    NECESSARY: 1
};

export const consentMap = {
    [COOKIE_TYPE.NECESSARY]: false
};

const useStyle = makeStyles(() => ({
    banner: {
        width: '100%',
        maxWidth: '1280px',
        padding: '0 10px'
    }
}));

const PrivacySpan = styled.span`
    cursor: pointer;
    text-decoration: underline;
`;

const saveConsentCookie = (key, value, expiringDays = 365) => {
    if (value) {
        setCookie(key, true, expiringDays);
    } else {
        deleteCookie(key);
    }
};

const CookieBanner = ({ history }) => {
    const { t } = useTranslation();
    const classes = useStyle();

    const [isShownCookieBanner, setBanner] = React.useState(true);

    const isConsentRequired = getCookie(CONSENT_REQUIRED_COOKIE_KEY) === 'true';

    //SET COOKIE CONSENT VALUES FROM COOKIES
    React.useEffect(() => {
        if (!isConsentRequired && !isShownCookieBanner) {
            setBanner(true);
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConsentRequired]);

    const onSubmit = () => {
        saveConsentCookie(CONSENT_REQUIRED_COOKIE_KEY, true);
        setBanner(false);
    };

    const goToPrivacy = () => {
        window.scrollTo(0, 0);
        history.push('/policy/privacy');
    };

    return (
        <Snackbar
            className={classes.banner}
            open={isShownCookieBanner}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            message={
                <>
                    {t('cookie_banner_info1')}
                    <PrivacySpan onClick={goToPrivacy}>
                        Privacy Policy
                    </PrivacySpan>
                    {t('cookie_banner_info2')}cookie policy.
                </>
            }
            action={
                <Button color="secondary" onClick={onSubmit} size="small">
                    {t('common_agree')}
                </Button>
            }
        />
    );
};

export default withRouter(CookieBanner);
