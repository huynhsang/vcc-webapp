import React from 'react';
import { useTranslation } from 'react-i18next';

import Tag from '../../../component/Tag';

const TopTrendingTags = ({ trendingTags }) => {
    const { t } = useTranslation();

    const [isShown, setIsShown] = React.useState(true);

    return (
        <section id="tag_cloud-2" className="widget widget_tag_cloud">
            <h2
                className="widget-title"
                onClick={() => setIsShown(state => !state)}
            >
                <i className="icon-folder" />
                <span>{t('common_trending_tags')}</span>
                <span
                    className={`pi pi-chevron-${isShown ? 'down' : 'right'}`}
                />
            </h2>
            {isShown && (
                <div className="tagcloud">
                    {trendingTags.map((tag, index) => {
                        return (
                            <Tag key={tag.id} tag={tag}/>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default TopTrendingTags;
