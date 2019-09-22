import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const AuthRouter = ({component: Component, isAuthenticated, subRoutes, ...rest}) => (
	<Route {...rest} render={props => (isAuthenticated ? (
			<Component {...props} subRoutes={subRoutes}/>
		) : (
			<Redirect to={{
				pathname: '/user/login'
			}}/>
		)
	)}/>
);

export default AuthRouter;