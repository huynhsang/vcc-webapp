import BasicComponent from "../../../common/abstract/component/BasicComponent";
import SidebarPageDetail from "../SidebarForPageDetailUI";

const defaultNavigation: Array<any> = [
	{
		path: "/",
		iconClass: "fa fa-home",
		name: "Home"
	},{
		path: "/about",
		iconClass: "fa fa-address-book-o",
		name: "About"
	},{
		path: "/members",
		iconClass: "fa fa-user-circle-o",
		name: "Members"
	},{
		path: "/events",
		iconClass: "fa fa-edit",
		name: "Events"
	}
];

const extendNavigation : Array<any> = [
	{
		path: "/groups",
		iconClass: "fa fa-users",
		name: "Groups"
	}
];

export function handleDataForSidebar(_this: BasicComponent): void {
	let sidebarModel: SidebarModel = {};
	sidebarModel.currentPath = _this.context.router.route.location.pathname;
	sidebarModel.shortcuts = [];
	sidebarModel.navigation = (_this instanceof SidebarPageDetail) ? defaultNavigation.concat(extendNavigation) : defaultNavigation;
	_this.changeStateValue("UIData", sidebarModel);
}

export interface SidebarModel {
	navigation: Array<any>;
	shortcuts: Array<any>;
	currentPath: string;
}