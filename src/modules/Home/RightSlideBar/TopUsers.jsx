import React from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { Badge } from '../../Badges';

import DefaultUserLogo from '../../../images/default-user-logo.png';

const TopUsers = ({ topUsers }) => {
  const { t } = useTranslation();

  const [isShown, setIsShown] = React.useState(true);

  return (
    <section id="users-widget-2" className="widget users-widget">
      <h2 className="widget-title" onClick={() => setIsShown(state => !state)}>
        <i className="icon-folder" />
        <span>{t('common_top_members')}</span>
        <span className={`pi pi-chevron-${isShown ? 'down' : 'right'}`} />
      </h2>
      {isShown && (
        <div className="widget-wrap">
          <div className="user-section user-section-small row user-not-normal">
            {topUsers.map((user: User, index) => {
              return (
                <div key={index} className="col col12">
                  <div className="post-section user-area user-area-small">
                    <div className="post-inner">
                      <div className="author-image author-image-42">
                        <Link to={`/users/${user.id}`}>
                          <span className="author-image-span">
                            <img
                              className="avatar avatar-42 photo"
                              alt=""
                              title=""
                              width="42"
                              height="42"
                              src={user.avatar || DefaultUserLogo}
                            />
                          </span>
                        </Link>
                      </div>
                      <div className="user-content">
                        <div className="user-inner">
                          <h4>
                            <Link to={`/users/${user.id}`}>
                              {user.firstName} {user.lastName}
                            </Link>
                          </h4>
                          <div className="user-data">
                            <ul>
                              <li className="user-questions">
                                <a href="/users/marko/questions/">
                                  {user.numberOfQuestions}{' '}
                                  {t('common_questions')}
                                </a>
                              </li>
                              <li className="user-points">
                                <a href="/users/marko/points/">
                                  {user.points} {t('common_points')}
                                </a>
                              </li>
                            </ul>
                          </div>
                          <Badge points={user.points} />
                        </div>
                      </div>
                      <div className="clearfix" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default TopUsers;
