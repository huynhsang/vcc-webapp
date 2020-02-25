import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getUserByLoginTokenFn } from '../../actions/app';

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
`;

const SSOLogin = ({ location, history, getUserByLoginToken }) => {
    React.useEffect(() => {
        const search = new URLSearchParams(location.search);
        const token = search.get('access_token');
        if (token) {
            getUserByLoginToken(token);
        }
        history.push('/questions');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Wrapper>
            <ContentWrapper>
                <h3>Log in...</h3>
            </ContentWrapper>
        </Wrapper>
    );
};

const mapDispatchToProps = dispatch => ({
    getUserByLoginToken: token => dispatch(getUserByLoginTokenFn(token))
});

export default connect(null, mapDispatchToProps)(SSOLogin);
