import React from 'react';
import { Route } from 'react-router-dom';
import CopyrightPolicy from './CopyrightPolicy';
import AcceptableUsePolicy from './AcceptableUsePolicy';
import PrivacyPolicy from './PrivacyPolicy';
import TrademarkPolicy from './TrademarkPolicy';
import TermsOfService from './TermsOfService';

const PolicyRouter = ({ match }) => {
    return (
        <>
            <Route
                exact
                path={`${match.path}/`}
                component={CopyrightPolicy}
            />
            <Route
                exact
                path={`${match.path}/copyright`}
                component={CopyrightPolicy}
            />
            <Route
                exact
                path={`${match.path}/acceptableUse`}
                component={AcceptableUsePolicy}
            />
            <Route
                exact
                path={`${match.path}/privacy`}
                component={PrivacyPolicy}
            />
            <Route
                exact
                path={`${match.path}/trademark`}
                component={TrademarkPolicy}
            />
            <Route
                exact
                path={`${match.path}/termsofservice`}
                component={TermsOfService}
            />
        </>
    );
};

export default PolicyRouter;