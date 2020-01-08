import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    FACEBOOK_SHARE_URL,
    TWITTER_SHARE_URL,
    LINKEDIN_SHARE_URL
} from '../../constants/share.constant';

const Share = ({ questionSlug }) => {
    const { t } = useTranslation();
    const { REACT_APP_DOMAIN_NAME } = process.env;
    const url = `${REACT_APP_DOMAIN_NAME}/homes/question/${questionSlug}/view`;
    return (
        <div className="post-share">
            <span>
                <i className="icon-share" />
                <span>{t('common_share')}</span>
            </span>
            <ul style={{ position: 'unset', marginLeft: '10px' }}>
                <li className="share-facebook">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${FACEBOOK_SHARE_URL}${url}`}
                    >
                        <i className="icon-facebook" />
                        Facebook
                    </a>
                </li>
                <li className="share-twitter">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${TWITTER_SHARE_URL}${url}`}
                    >
                        <i className="icon-twitter" />
                    </a>
                </li>
                <li className="share-linkedin">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${LINKEDIN_SHARE_URL}${url}`}
                    >
                        <i className="icon-linkedin" />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Share;
