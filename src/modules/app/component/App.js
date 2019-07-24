import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import BasicComponent from '../../../common/abstract/component/BasicComponent';
import AppRouter from './../router/component/AppRouter';
import Header from './header/Header';
import RootScope from "../../../global/RootScope";
import CookieHelper from "../../../common/util/CookieHelper";
import CookieConstant from "../../../common/constant/CookieConstant";
import SweetAlert from "../../../component/sweet_alert/container/SweetAlertImpl";
import MobileAside from "./aside/MobileAside";
import PropTypes from "prop-types";

const propTypes = {
    verifyToken: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};
export default class App extends BasicComponent {

	constructor(props) {
		super(props);
		this.state = {
			auth: {
				isAuthenticated: false
			}
		}
	}

	handleBeforeTheFirstRender(): void {
		RootScope.token = CookieHelper.getCookie(CookieConstant.jwtTokenName);
		RootScope.userId = Number(CookieHelper.getCookie(CookieConstant.userIdKey));
		if (RootScope.token && RootScope.userId) {
			this.changeStateValue("auth", {isAuthenticated: true});
			this.props.verifyToken();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth) {
			this.changeStateValue("auth", {isAuthenticated: nextProps.auth.isAuthenticated});
		}
	}

	render() {
	    const _this = this;
	    const { auth } = _this.state;
	    const { logout } = _this.props;
		const classWrapper: string = auth.isAuthenticated ? "wrap-login" : "wrap-not-login";
		return (
			<Router>
                <div id="wrap" className={classWrapper}>
                    <Header isAuthenticated={auth.isAuthenticated} doLogOut={logout}/>
                    <MobileAside/>
                    <AppRouter auth={auth}/>
					<SweetAlert/>
                </div>
			</Router>
		);
	}
}
App.propTypes = propTypes;
