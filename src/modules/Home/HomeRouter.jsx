import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { Questions } from '../Questions';
import { SubCategory } from '../SubCategory';
import { Badges } from '../Badges';
import { ViewQuestion } from '../ViewQuestion';

const HomeRouter = ({ match }) => {
    return (
        <Switch>
            <Route
                path={`${match.path}/questions`}
                render={props => <Questions {...props} />}
            />
            <Route
                exact
                path={`${match.path}/question/:slug/view`}
                component={ViewQuestion}
            />
            <Route
                path={`${match.path}/tags`}
                render={props => <SubCategory {...props} />}
            />
            <Route
                path={`${match.path}/badges`}
                render={props => <Badges {...props} />}
            />
            <Route component={Questions} />
        </Switch>
    );
};

export default withRouter(HomeRouter);