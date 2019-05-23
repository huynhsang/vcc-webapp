import React from 'react';
import BasicComponent from "../../../common/abstract/component/BasicComponent";

const navigation: Array<any> = [
	{
		path: "/",
		iconClass: "fa fa-dashboard",
		name: "Dashboard"
	}, {
		path: "/messages",
		iconClass: "fa fa-comments",
		name: "Messages"
	}
];

const explores: Array<any> = [
	{
		path: "/pages",
		iconClass: "fa fa-copy",
		name: "Pages"
	}, {
		path: "/groups",
		iconClass: "fa fa-users",
		name: "Groups"
	}, {
		path: "/events",
		iconClass: "fa fa-edit",
		name: "Events",
		addition: <span className="label label-success pull-right">New</span>
	}, {
		path: "/calendar",
		iconClass: "fa fa-calendar",
		name: "Calendar",
		addition: <span className="label label-danger pull-right">Updated</span>
	}, {
		path: "/suggests",
		iconClass: "fa fa-gratipay",
		name: "Suggests"
	}, {
		path: "/slink",
		iconClass: "fa fa-google",
		name: "Slink demo"
	}
];

export function handleDataForUI(_this: BasicComponent): void {
	let sidebarModel: SidebarLeftModel = {};
	sidebarModel.currentPath = _this.context.router.route.match.path;
	sidebarModel.shortcuts = [];
	sidebarModel.navigation = navigation;
	sidebarModel.explorers = explores;
	_this.changeStateValue("data", sidebarModel);
}

export interface SidebarLeftModel {
	navigation: Array<any>;
	shortcuts: Array<any>;
	explorers: Array<any>;
	currentPath: string;
}