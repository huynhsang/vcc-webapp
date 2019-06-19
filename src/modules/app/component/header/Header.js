import React from 'react';
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
// import RootScope from "../../../../global/RootScope";
// import type {User} from "../../../../domain/User";

export default class Header extends BasicComponent {
	render() {
		// const currentUser: User = RootScope.currentUser;
		return (
			<header className="navbar" id="header-navbar">
				this is header
			</header>
		)
	}
}