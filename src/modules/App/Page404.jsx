import React from 'react';
import styled from 'styled-components';
import ErrorImageV2 from '../../images/error-404-v2.png';
import ErrorImageV3 from '../../images/error-404-v3.png';
import RootScope from '../../global/RootScope';

const Wrapper = styled.div`
    margin: 30px;
    min-height: calc(100vh - 230px);
`;

const Page404 = () => {
    //TODO: add button comback

    const ErrorImage = RootScope.currentUser ? ErrorImageV2 : ErrorImageV3;
    return (
        <Wrapper>
            <div>
                <img src={ErrorImage} alt="Have you seen this page?" />
            </div>
            <h1>ERROR 404</h1>
            <p>Page not found.</p>
            <p>
                Go back to <a href="/">homepage</a>.
            </p>
        </Wrapper>
    );
};

export default Page404;
