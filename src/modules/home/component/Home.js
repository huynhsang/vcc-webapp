import React from 'react';
import BasicComponent from '../../../common/abstract/component/BasicComponent';
import LeftNav from "./left_nav/LeftNav";
import {Link, Route} from "react-router-dom";
import RightSidebar from "../container/RightSidebarImpl";

export default class Home extends BasicComponent {
	render() {
	    const { isAuthenticated } = this.props;
		return (
            <section>
                <div className="call-action-unlogged call-action-dark call-action-style_1">
                    <div className="call-action-opacity"/>
                    <div className="discy-container">
                        <div className="col6">
                            <h3>Share &amp; grow the world's knowledge!</h3>
                            <p>We want to connect the people who have knowledge to the people who need it, to bring
                                together people with different perspectives so they can understand each other better,
                                and to empower everyone to share their knowledge.</p>
                        </div>
                        <div className="col3">
                            {
                                !isAuthenticated ?
                                    <Link to="/registration" className="signup-panel button-default call-action-button" style={{marginTop: "47.5px"}}>
                                        Create A New Account
                                    </Link> : ''
                            }
                        </div>
                    </div>
                </div>
                <div className="discy-content">
                    <div className="discy-inner-content menu_sidebar">
                        <div className="discy-container">
                            <main className="discy-main-wrap discy-site-content float_l"
                                  style={{position: "relative", overflow: "visible", boxSizing: "border-box", minHeight: "1px"}}>
                                <div className="theiaStickySidebar" style={{paddingTop: "0px", paddingBottom: "1px", position: "static"}}>

                                    {this.props.subRoutes.map((route, index) => {
                                        return (
                                            <Route key={index} exact={route.exact} path={route.path}
                                                   render={props => (
                                                       <route.component {...props}/>
                                                   )}
                                            />
                                        )
                                    })}

                                    <div className="hide-main-inner"/>
                                    <div className = "hide-sidebar sidebar-width">
                                        <div className = "hide-sidebar-inner"/>
                                    </div>

                                    <RightSidebar/>
                                </div>
                            </main>
                            <LeftNav/>
                        </div>
                    </div>
                </div>

            </section>
        );
	}
}