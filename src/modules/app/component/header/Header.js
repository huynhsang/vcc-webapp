import React from 'react';
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
import flags1 from './../../../../static/resources/img/flag/vn.svg'
import flags2 from './../../../../static/resources/img/6.jpg'
// import RootScope from "../../../../global/RootScope";
// import type {User} from "../../../../domain/User";

export default class Header extends BasicComponent {
	render() {
		// const currentUser: User = RootScope.currentUser;
		return (
			<header className="menu-bar">
				<div className="bg-header d-flex align-items-center">
					<div className="menu-item">
						<a href="/"><h3>VC&C</h3></a>
					</div>
					<div className="d-flex align-items-center w-100 mr-1">
						<div className="c-search w-100 mr-5">
							<label className="font-size-16"><i className="fa fa-search"></i></label>
							<input className="input-search pl-5 pt-1 pb-1" type="text" placeholder="Search..."/>
						</div>
						<a className="ml-2 mr-2"><img src={flags1} width="30" alt=""/></a>
						<a className="ml-2 mr-2"><i className="fa fa-bell"></i></a>
						<a className="ml-2 mr-2">
							<div className="avatar">
								<img src={flags2} width="30" alt=""/>
								<i className="c-online">
								</i>
							</div>
						</a>
					</div>
				</div>
			</header>

		)
	}
}
