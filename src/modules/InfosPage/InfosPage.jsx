import React from 'react';
import { PageCover } from '../Header';

import Badges from './Badges';
import WorkHow from './WorkHow';

const InfoPage = () => {
    return (
        <>
            <PageCover />
            <WorkHow />
            <Badges />
        </>
    );
};

export default InfoPage;
