import React from 'react';
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
import RootScope from "../../../../global/RootScope";
import type {User} from "../../../../domain/User";
import ApplicationUtil from "../../../../common/util/ApplicationUtil";

export default class Header extends BasicComponent {
	render() {
		const currentUser: User = RootScope.currentUser;
		const smallAvatar: string = (currentUser) ? ApplicationUtil.getFullImageURL(currentUser.avatar.replace(".png", "_100x100.png")) : "";
		return (
			<header className="navbar" id="header-navbar">
				<div className="container">
					<a href="/" id="logo" className="navbar-brand">
						<img src="img/logo.png" alt="" className="normal-logo logo-white"/>
						<img src="img/logo-black.png" alt="" className="normal-logo logo-black"/>
						<img src="img/logo-small.png" alt="" className="small-logo hidden-xs hidden-sm hidden"/>
					</a>

					<div className="clearfix">
						<button className="navbar-toggle" data-target=".navbar-ex1-collapse" data-toggle="collapse"
								type="button">
							<span className="sr-only">Toggle navigation</span>
							<span className="fa fa-bars"/>
						</button>

						<div className="nav-no-collapse navbar-left pull-left hidden-sm hidden-xs">
							<ul className="nav navbar-nav pull-left">
								<li>
									<a className="btn" id="make-small-nav">
										<i className="fa fa-bars"/>
									</a>
								</li>
								<li className="dropdown hidden-xs">
									<a className="btn dropdown-toggle" data-toggle="dropdown">
										<i className="fa fa-bell"/>
										<span className="count">8</span>
									</a>
									<ul className="dropdown-menu notifications-list">
										<li className="pointer">
											<div className="pointer-inner">
												<div className="arrow"/>
											</div>
										</li>
										<li className="item-header">You have 6 new notifications</li>
										<li className="item">
											<a>
												<i className="fa fa-comment"/>
												<span className="content">New comment on ‘Awesome P...</span>
												<span className="time"><i className="fa fa-clock-o"/>13 min.</span>
											</a>
										</li>
										<li className="item">
											<a>
												<i className="fa fa-plus"/>
												<span className="content">New user registration</span>
												<span className="time"><i className="fa fa-clock-o"/>13 min.</span>
											</a>
										</li>
										<li className="item">
											<a>
												<i className="fa fa-envelope"/>
												<span className="content">New Message from George</span>
												<span className="time"><i className="fa fa-clock-o"/>13 min.</span>
											</a>
										</li>
										<li className="item">
											<a>
												<i className="fa fa-shopping-cart"/>
												<span className="content">New purchase</span>
												<span className="time"><i className="fa fa-clock-o"/>13 min.</span>
											</a>
										</li>
										<li className="item">
											<a>
												<i className="fa fa-eye"/>
												<span className="content">New order</span>
												<span className="time"><i className="fa fa-clock-o"/>13 min.</span>
											</a>
										</li>
										<li className="item-footer">
											<a>
												View all notifications
											</a>
										</li>
									</ul>
								</li>
								<li className="dropdown hidden-xs">
									<a className="btn dropdown-toggle" data-toggle="dropdown">
										<i className="fa fa-envelope-o"/>
										<span className="count">16</span>
									</a>
									<ul className="dropdown-menu notifications-list messages-list">
										<li className="pointer">
											<div className="pointer-inner">
												<div className="arrow"/>
											</div>
										</li>
										<li className="item first-item">
											<a>
												<img src="img/samples/messages-photo-1.png" alt=""/>
												<span className="content">
											<span className="content-headline">
												George Clooney
											</span>
											<span className="content-text">
												Look, just because I don't be givin' no man a foot massage don't make it
												right for Marsellus to throw...
											</span>
										</span>
												<span className="time"><i className="fa fa-clock-o"/>13 min.</span>
											</a>
										</li>
										<li className="item">
											<a>
												<img src="img/samples/messages-photo-2.png" alt=""/>
												<span className="content">
											<span className="content-headline">
												Emma Watson
											</span>
											<span className="content-text">
												Look, just because I don't be givin' no man a foot massage don't make it
												right for Marsellus to throw...
											</span>
										</span>
												<span className="time"><i className="fa fa-clock-o"/>13 min.</span>
											</a>
										</li>
										<li className="item">
											<a>
												<img src="img/samples/messages-photo-3.png" alt=""/>
												<span className="content">
											<span className="content-headline">
												Robert Downey Jr.
											</span>
											<span className="content-text">
												Look, just because I don't be givin' no man a foot massage don't make it
												right for Marsellus to throw...
											</span>
										</span>
												<span className="time"><i className="fa fa-clock-o"/>13 min.</span>
											</a>
										</li>
										<li className="item-footer">
											<a>
												View all messages
											</a>
										</li>
									</ul>
								</li>
								<li className="dropdown hidden-xs">
									<a className="btn dropdown-toggle" data-toggle="dropdown">
										New Item
										<i className="fa fa-caret-down"/>
									</a>
									<ul className="dropdown-menu">
										<li className="item">
											<a>
												<i className="fa fa-archive"/>
												New Product
											</a>
										</li>
										<li className="item">
											<a>
												<i className="fa fa-shopping-cart"/>
												New Order
											</a>
										</li>
										<li className="item">
											<a>
												<i className="fa fa-sitemap"/>
												New Category
											</a>
										</li>
										<li className="item">
											<a>
												<i className="fa fa-file-text"/>
												New Page
											</a>
										</li>
									</ul>
								</li>
								<li className="dropdown hidden-xs">
									<a className="btn dropdown-toggle" data-toggle="dropdown">
										English
										<i className="fa fa-caret-down"/>
									</a>
									<ul className="dropdown-menu">
										<li className="item">
											<a>
												Spanish
											</a>
										</li>
										<li className="item">
											<a>
												German
											</a>
										</li>
										<li className="item">
											<a>
												Italian
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</div>

						<div className="nav-no-collapse pull-right" id="header-nav">
							<ul className="nav navbar-nav pull-right">
								<li className="mobile-search">
									<a className="btn">
										<i className="fa fa-search"/>
									</a>

									<div className="drowdown-search">
										<form role="search">
											<div className="form-group">
												<input type="text" className="form-control" placeholder="Search..."/>
												<i className="fa fa-search nav-search-icon"/>
											</div>
										</form>
									</div>

								</li>
								<li className="dropdown profile-dropdown">
									<a className="dropdown-toggle" data-toggle="dropdown">
										<img src={smallAvatar} alt=""/>
										<span
											className="hidden-xs">{currentUser ? `${currentUser.firstName}.${currentUser.lastName}` : ""}</span>
										<b className="caret"/>
									</a>
									<ul className="dropdown-menu dropdown-menu-right">
										<li><a href="user-profile.html"><i className="fa fa-user"/>Profile</a></li>
										<li><a><i className="fa fa-cog"/>Settings</a></li>
										<li><a><i className="fa fa-envelope-o"/>Messages</a></li>
										<li><a><i className="fa fa-power-off"/>Logout</a></li>
									</ul>
								</li>
								<li className="hidden-xxs">
									<a className="btn">
										<i className="fa fa-power-off"/>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</header>
		)
	}
}