import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import './../../../../static/Scss/theme-styles.scss';

const AuthRouter = ({component: Component, isAuthenticated, subRoutes, ...rest}) => (
	<Route {...rest} render={props => (isAuthenticated ? (
			<Component {...props} subRoutes={subRoutes}/>
		) : (
			<Redirect to={{
				pathname: '/login'
			}}/>
		)
	)}/>
);

export default AuthRouter;