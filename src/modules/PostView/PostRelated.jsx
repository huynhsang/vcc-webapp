import React from 'react';
import styled from 'styled-components';
import { Badge } from '../../component/Badge';
import UserLogo from '../../component/UserLogo';

const Wrapper = styled.div`
    width: calc(33.33% - 20px);
    margin: 0 10px;
`;

const Title = styled.div`
    margin-top: 5px;
    font-size: 1.1rem;
`;

const CoverImage = styled.div`
    height: 200px;
    background-position: center;
    background-color: black;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('${(p) => p.src}');
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const UserInfos = styled.div`
    margin-left: 10px;
`;

const UserName = styled.span`
    color: #009fff;
    font-size: 1.1em;
    margin-right: 5px;

    &:hover {
        color: #0570b1;
    }
`;

const Time = styled.time`
    color: #979797;
`;

const PostRelated = ({ post, history }) => {
    const {
        title,
        coverImage,
        mainCharacter,
        created
    } = post;

    const redirect = (url) => (ev) => {
        ev.stopPropagation();
        history.push(url);
    };

    return (
        <Wrapper>
            <CoverImage src={coverImage} />
            <Title>{title}</Title>
            <FlexWrapper>
                <UserLogo user={mainCharacter} />
                <UserInfos>
                    <UserName onClick={redirect(`/users/${mainCharacter.id}`)}>
                        {`${mainCharacter.firstName} ${mainCharacter.lastName}`}
                    </UserName>
                    <Badge points={mainCharacter.points} />
                    <br />
                    <Time dateTime={created}>
                        {` ${new Date(created).toDateString()}`}
                    </Time>
                </UserInfos>
            </FlexWrapper>
        </Wrapper>
    );
};

export default PostRelated;
