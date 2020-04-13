import React from 'react';
import styled from 'styled-components';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Wrapper = styled.div`
    display: flex;
    & svg {
        font-size: ${(p) => p.isBig ? '2rem' : '1.7rem'};
        margin-right: 0.4rem;
        color: #7078857d;
        cursor: pointer;

        &:hover {
            color: #707885;
        }
    }

    & svg:last-child{
        margin: 0;
    }
`;

const SocialNetwork = ({
    fbLink = '',
    twitterLink = '',
    linkedInLink = '',
    isBig = false
}) => {
    const onClick = (type) => () => {
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
            default:
                link = '';
        }
        window.open(link, '_blank');
    };
    return (
        <Wrapper isBig={isBig}>
            <FacebookIcon onClick={onClick('facebook')} />
            <TwitterIcon onClick={onClick('twitter')} />
            <LinkedInIcon onClick={onClick('linkedIn')} />
        </Wrapper>
    );
};

export default SocialNetwork;
