import React from 'react';
import styled from 'styled-components';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    width: calc(33.33% - 20px);
    margin: 0 10px;

    ${media.tabletLandscape`
        width: calc(50% - 20px);
        margin-bottom: 15px;
    `}
    ${media.mobileLandscape`
        width: calc(100% - 20px);
    `}
`;

const Title = styled.div`
    margin-top: 5px;
    font-size: 1.1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
`;

const CoverImage = styled.div`
    height: 200px;
    background-position: center;
    background-color: black;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('${(p) => p.src}');
    border: 1px solid black;
    cursor:pointer;
`;

const UserName = styled.div`
    font-size: 1.1em;
    margin-right: 5px;
`;

const Time = styled.time`
    color: #979797;
`;

const PostRelated = ({ post, history }) => {
    const { title, imageList, created } = post;

    const characterNames = React.useMemo(() => {
        if (!post || !post.characterList) {
            return null;
        }
        return post.characterList
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
            .join(', ');
    }, [post]);

    const redirect = () => {
        history.push(`/posts/${post.id}`);
    };

    const coverImage = (imageList || [])[0];
    const imageUrl = coverImage ? coverImage.lrg : '';

    return (
        <Wrapper>
            {imageUrl && <CoverImage onClick={redirect} src={imageUrl} />}
            <Title onClick={redirect}>{title}</Title>
            <UserName>{characterNames}</UserName>
            <Time dateTime={created}>
                {` ${new Date(created).toDateString()}`}
            </Time>
        </Wrapper>
    );
};

export default PostRelated;
