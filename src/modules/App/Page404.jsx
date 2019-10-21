import React from 'react';
import styled from 'styled-components';
import ErrorImageV2 from '../../static/resources/img/errors/error-404-v2.png';
import ErrorImageV3 from '../../static/resources/img/errors/error-404-v3.png';
import RootScope from '../../global/RootScope';

const Wrapper = styled.div`
    margin: 30px;
`;

const Page404 = () => {
    //TODO: add button comback

    const ErrorImage = RootScope.currentUser ? ErrorImageV2 : ErrorImageV3;
    return (
        <Wrapper>
            <div id="error-box-inner">
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
