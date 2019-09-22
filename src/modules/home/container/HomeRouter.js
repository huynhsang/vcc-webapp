import React from 'react';
import { withRouter } from 'react-router-dom';
import {MainPage} from '../../MainPage';
import {ViewQuestion} from '../../ViewQuestion';
import SubCategory from '../../sub_category/container/SubCategoryImpl';
import Badges from '../../badges/container/BadgesImpl';

import { Route } from 'react-router-dom';

const HomeRouter = ({ match }) => (
    <>
        <Route exact path={`${match.path}/`} component={MainPage} />
        {/* <Route
            exact
            path={`${match.path}/question/:identity/view`}
            component={ViewQuestion}
        /> */}
        <Route
            exact
            path={`${match.path}/question/:slug/view`}
            component={ViewQuestion}
        />
        <Route exact path={`${match.path}/tags`} component={SubCategory} />
        <Route exact path={`${match.path}/badges`} component={Badges} />
    </>
);

export default withRouter(HomeRouter);
