import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const UnAuthRouter = ({component: Component, isAuthenticated, ...rest}) => (
	<Route {...rest} render={props => (!isAuthenticated ? (
			<Component {...props} />
		) : (
			<Redirect to={{
				pathname: '/'
			}}/>
		)
	)}/>
);

export default UnAuthRouter;