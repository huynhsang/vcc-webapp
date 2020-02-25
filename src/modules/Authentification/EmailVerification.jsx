import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { verifyEmail } from '../../services/account.service';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 186px);
`;

const ContentWrapper = styled.div`
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    box-shadow: 0 0 1em #a0a0a0;
    position: relative;
    width: 90%;
    max-width: 500px;
    text-align: center;
    margin: 10px auto;
    ${media.mobileLandscape`
        padding: 10px;
    `}
`;

const BottomWrapper = styled.div`
    border-top: 1px solid rgba(199, 199, 199, 0.7);
    margin-top: 15px;
    padding-top: 15px;
`;

const EmailVerification = ({ location, history }) => {
    const [message, setMessage] = React.useState('Your email is verifying...');

    React.useEffect(() => {
        const search = new URLSearchParams(location.search);
        const uid = search.get('uid');
        const token = search.get('token');
        if (!uid || !token) {
            history.push('/questions');
        } else {
            verifyEmail(uid, token)
                .then(() => {
                    setMessage('Registration verified successfully');
                })
                .catch(() => {
                    setMessage(
                        'Registration has not been successfully verified'
                    );
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Wrapper>
            <ContentWrapper>
                <h3>{message}</h3>
                <BottomWrapper>
                    <Button
                        onClick={() => {
                            history.push('/home');
                        }}
                        color="primary"
                    >
                        Go to home
                    </Button>
                </BottomWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default EmailVerification;
