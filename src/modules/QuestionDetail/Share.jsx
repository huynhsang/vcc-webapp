import React from 'react';
import { useTranslation } from 'react-i18next';

const Share = () => {
  const {t} = useTranslation();
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
            href="http://www.facebook.com/share"
          >
            <i className="icon-facebook" />
            Facebook
          </a>
        </li>
        <li className="share-twitter">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://twitter.com/share"
          >
            <i className="icon-twitter" />
          </a>
        </li>
        <li className="share-linkedin">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.linkedin.com/shareArticle?"
          >
            <i className="icon-linkedin" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Share;