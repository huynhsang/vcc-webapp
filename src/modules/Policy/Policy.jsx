import React from 'react';
import { DefaultWrapper } from '../../component/Wrappers';
import PolicyMenu from './PolicyMenu';
import PolicyRouter from './PolicyRouter';
import { PageCover } from '../Header';

const Policy = ({ match, location, history }) => {
    return (
        <>
            <PageCover />
            <PolicyMenu location={location} history={history} />
            <DefaultWrapper>
                <PolicyRouter match={match}/>
            </DefaultWrapper>
        </>
    );
};

export default Policy;
