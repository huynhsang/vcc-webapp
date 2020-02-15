import React from 'react';
import styled from 'styled-components';
import { PageCover } from '../Header';
import { DefaultWrapper } from '../../component/Wrappers';

import Badges from './Badges';

const Wrapper = styled(DefaultWrapper)`
    min-height: calc(100vh - 435px);
`;

const InfoPage = () => {
    return (
        <>
            <PageCover />
            <Wrapper>
                <Badges />
            </Wrapper>
        </>
    );
};

export default InfoPage;
