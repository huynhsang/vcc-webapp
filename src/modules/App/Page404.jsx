import React from 'react';
import styled from 'styled-components';
import ErrorImageV2 from '../../images/error-404-v2.png';
// import ErrorImageV3 from '../../images/error-404-v3.png';

const Wrapper = styled.div`
    margin: 30px;
    min-height: calc(100vh - 230px);
`;

const Page404 = () => {
    //TODO: add button comback

    return (
        <Wrapper>
            <div>
                <img src={ErrorImageV2} alt="Have you seen this page?" />
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
