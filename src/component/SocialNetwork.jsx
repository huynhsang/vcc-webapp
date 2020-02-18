import React from 'react';
import styled from 'styled-components';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Wrapper = styled.div`
    display: flex;
    & svg {
        margin-right: 10px;
        color: #7078857d;
        cursor: pointer;

        &:hover {
            color: #707885;
        }
    }
`;

const SocialNetwork = ({
    fbLink = '',
    twitterLink = '',
    linkedInLink = ''
}) => {
    const onClick = type => () => {
        let link = '';
        switch (type) {
            case 'facebook':
                link = fbLink;
                break;
            case 'twitter':
                link = twitterLink;
                break;
            case 'linkedIn':
                link = linkedInLink;
                break;
        }
        window.open(link, '_blank');
    };
    return (
        <Wrapper>
            <FacebookIcon onClick={onClick('facebook')} />
            <TwitterIcon onClick={onClick('twitter')} />
            <LinkedInIcon onClick={onClick('linkedIn')} />
        </Wrapper>
    );
};

export default SocialNetwork;
