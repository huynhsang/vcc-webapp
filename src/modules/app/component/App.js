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

export default class App extends BasicComponent {

	constructor() {
		super();
		this.state = {
			auth: {
				isAuthenticated: false
			}
		}
	}

	handleBeforeTheFirstRender(): void {
		RootScope.token = CookieHelper.getCookie(CookieConstant.jwtTokenName);
		RootScope.userId = CookieHelper.getCookie(CookieConstant.userIdKey);
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
		return (
			<Router>
                <div id="wrap" className="wrap-not-login">
                    <Header isAuthenticated={this.state.auth.isAuthenticated}/>
                    <MobileAside/>
                    <AppRouter auth={this.state.auth}/>
                </div>
				<SweetAlert/>
			</Router>
		);
	}
}
