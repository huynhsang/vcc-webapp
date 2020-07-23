import React from 'react';
import styled from 'styled-components';
import LabelIcon from '@material-ui/icons/Label';
import i18n from 'i18next';

const Wrapper = styled.div`
    display: flex;
    padding: 20px 0;
    justify-content: space-between;
`;

const ContentWrapper = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    min-height: 0;
    padding-right: 10px;
    cursor: pointer;
`;

const ImgCover = styled.div`
    background-position: center;
    background-color: black;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('${(p) => p.img}');
    width: 150px;
    border: 2px solid black;
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 1.3em;
    margin-bottom: 5px;
    cursor: pointer;
`;

const Resume = styled.div`
    color: #636363;
`;

const MainCharacter = styled.div``;

const Time = styled.time`
    color: #979797;
`;

const CharacterInfos = styled.div``;

const TagsWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 3px 0;
    & svg {
        margin-right: 5px;
        font-size: 16px;
    }
`;

const Post = ({ post, viewPost }) => {
    const {
        title,
        resume,
        imageList,
        characterList = [],
        created,
        tagList
    } = post;

    const coverImage = (imageList || [])[0];
    const imageUrl = coverImage ? coverImage.lrg : '';

    const characterNames = React.useMemo(
        () =>
            characterList
                .map(({ lastName, firstName, experiences = [] }) => {
                    let experience;

                    experiences.forEach((val, key) => {
                        if (key === 0 || val.isWorking) {
                            experience = val;
                        } else if (
                            new Date(val.startDate).getTime() <
                            new Date(experience).getTime()
                        ) {
                            experience = val;
                        }
                    });

                    return `${lastName} ${firstName} ${
                        experience ? `(${experience.company})` : ''
                    }`;
                })
                .join(', '),
        [characterList]
    );

    const tagsRender = tagList
        .map((val) =>
            val ? val[i18n.language === 'vi' ? 'nameVi' : 'nameEn'] : ''
        )
        .join(', ');

    return (
        <Wrapper>
            <ContentWrapper>
                <Title onClick={viewPost}>{title}</Title>
                <Resume onClick={viewPost}>{resume}</Resume>
                {tagsRender && <TagsWrapper>
                    <LabelIcon />
                    {tagsRender}
                </TagsWrapper>}
                <CharacterInfos>
                    <MainCharacter>{characterNames}</MainCharacter>
                    <Time dateTime={created}>
                        {` ${new Date(created).toDateString()}`}
                    </Time>
                </CharacterInfos>
            </ContentWrapper>
            {imageUrl && <ImgCover img={imageUrl} alt="" />}
        </Wrapper>
    );
};

export default Post;
