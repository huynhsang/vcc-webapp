import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const Title = styled.h2`

`;

const TopTrendingTags = ({ trendingTags }) => {
    const { t } = useTranslation();

    const [isShown, setIsShown] = React.useState(true);

    return (
        <section id="tag_cloud-2" className="widget widget_tag_cloud">
            <Title
                className="widget-title"
                onClick={() => setIsShown(state => !state)}
            >
                <i className="icon-folder" />
                <span>Trending Tags</span>
                <span
                    className={`pi pi-chevron-${isShown ? 'down' : 'right'}`}
                />
            </Title>
            {isShown && (
                <div className="tagcloud">
                    {trendingTags.map((tag: SubCategory, index) => {
                        return (
                            <Link
                                key={index}
                                to={`/home/questions?tags=${tag.slug}`}
                                className="tag-cloud-link tag-link-11 tag-link-position-1"
                            >
                                {tag.nameEn}
                            </Link>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default TopTrendingTags;
