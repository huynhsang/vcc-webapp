import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    FACEBOOK_SHARE_URL,
    TWITTER_SHARE_URL,
    LINKEDIN_SHARE_URL
} from '../../constants/share.constant';

const AnswerShare = ({ questionSlug, answerId }) => {
    const { t } = useTranslation();
    const { REACT_APP_DOMAIN_NAME } = process.env;
    const url = `${REACT_APP_DOMAIN_NAME}/homes/question/${questionSlug}/view#${answerId}`;

    return (
        <ul className="comment-reply comment-reply-main">
            {/* <li>
                <button
                    rel="nofollow"
                    className="comment-reply-link wpqa-reply-link"
                    aria-label={`Reply to ${answerBy.firstName} ${answerBy.lastName}`}
                >
                    <i className="icon-reply" />
                    {t('common_reply')}
                </button>
            </li> */}
            <li className="comment-share question-share question-share-2">
                <i className="icon-share" /> {t('common_share')}
                <div className="post-share">
                    <span>
                        <i className="icon-share" />
                        <span>{t('common_share')}</span>
                    </span>
                    <ul style={{ right: '-180px' }}>
                        <li className="share-facebook">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${FACEBOOK_SHARE_URL}${url}`}
                            >
                                <i className="icon-facebook" />
                                {t('share_on_facebook')}
                            </a>
                        </li>
                        <li className="share-twitter">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${TWITTER_SHARE_URL}${url}`}
                            >
                                <i className="icon-twitter" />
                                {t('share_on_twitter')}
                            </a>
                        </li>
                        <li className="share-linkedin">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${LINKEDIN_SHARE_URL}${url}`}
                            >
                                <i className="icon-linkedin" />
                                {t('share_on_linkedIn')}
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
            <li className="clearfix last-item-answers" />
        </ul>
    );
};

export default AnswerShare;
