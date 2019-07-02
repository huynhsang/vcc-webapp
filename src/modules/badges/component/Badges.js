import React from 'react';
import BasicComponent from "../../../common/abstract/component/BasicComponent";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const propTypes = {
};

export default class Badges extends BasicComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="discy-main-inner float_l">
                <div className="breadcrumbs">
                    <span className="crumbs">
                        <span>
                            <a><i className="icon-home"/>Home</a>
                            <span>
                                <span className="crumbs-span"> / </span>
                                <span className="current">Badges</span>
                            </span>
                        </span>
                    </span>
                    <div className="breadcrumb-right">
                        <div className="clearfix"/>
                    </div>
                </div>
                <div className="clearfix"/>
                <div className="page-sections">
                    <div className="page-section">
                        <div className="page-wrap-content">
                            <h2 className="post-title-3">
                                <i className="icon-bucket"/>
                                Points System
                            </h2>
                            <div className="post-content-text">
                                <p>Besides gaining reputation with your questions and answers, you receive badges for
                                    being especially helpful. Badges appears on your profile page,
                                    questions &amp; answers.
                                </p>
                            </div>
                            <div className="points-section">
                                <ul className="row">
                                    <li className="col col4">
                                        <div className="point-section" style={{height: "109px"}}>
                                            <div className="point-div"><i className="icon-bucket"/><span>20</span>Points
                                            </div>
                                            <p>Points for a new user in the community.</p>
                                        </div>
                                    </li>
                                    <li className="col col4">
                                        <div className="point-section" style={{height: "109px"}}>
                                            <div className="point-div"><i className="icon-bucket"></i><span>5</span>Points
                                            </div>
                                            <p>Choosing the best answer for a question.</p>
                                        </div>
                                    </li>
                                    <li className="col col4">
                                        <div className="point-section" style={{height: "109px"}}>
                                            <div className="point-div"><i className="icon-bucket"></i><span>2</span>Points
                                            </div>
                                            <p>Add an answer in the community.</p>
                                        </div>
                                    </li>
                                    <li className="col col4">
                                        <div className="point-section" style={{height: "109px"}}>
                                            <div className="point-div"><i className="icon-bucket"></i><span>1</span>Points
                                            </div>
                                            <p>Voting a question in the community.</p>
                                        </div>
                                    </li>
                                    <li className="col col4">
                                        <div className="point-section" style={{height: "109px"}}>
                                            <div className="point-div"><i className="icon-bucket"></i><span>1</span>Points
                                            </div>
                                            <p>Following a user in the community.</p>
                                        </div>
                                    </li>
                                    <li className="col col4">
                                        <div className="point-section" style={{height: "109px"}}>
                                            <div className="point-div"><i className="icon-bucket"></i><span>1</span>Points
                                            </div>
                                            <p>Voting an answer in the community.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="page-section">
                        <div className="page-wrap-content">
                            <h2 className="post-title-3"><i className="icon-trophy"/>Badges System</h2>
                            <div className="post-content-text">
                                <p>Besides gaining reputation with your questions and answers, you receive badges for
                                    being especially helpful. Badges appears on your profile page,
                                    questions &amp; answers.</p>
                            </div>
                            <div className="badges-section">
                                <ul>
                                    <li>
                                        <div className="badge-section">
                                            <div className="badge-div" style={{height: "96px"}}><span
                                                className="badge-span"
                                                style={{backgroundColor: "#0d0e11"}}>Begginer</span>
                                                <div className="point-div">
                                                    <i className="icon-bucket"/><span>10</span>Points
                                                </div>
                                            </div>
                                            <p>You must have a total score of 50 in at least 10
                                                non-community wiki answers to achieve this badge. Highest scoring answer
                                                that outscored an accepted answer with score of more than 10.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="badge-section">
                                            <div className="badge-div" style={{height: "96px"}}><span
                                                className="badge-span" style={{backgroundColor: "#de2b2b"}}>Teacher</span>
                                                <div className="point-div">
                                                    <i className="icon-bucket"/><span>50</span>Points
                                                </div>
                                            </div>
                                            <p>You must have a total score of 100 in at least 50
                                                non-community wiki answers to achieve this badge. Highest scoring answer
                                                that outscored an accepted answer with score of more than 50.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="badge-section">
                                            <div className="badge-div" style={{height: "96px"}}><span
                                                className="badge-span" style={{backgroundColor: "#ffbf00"}}>Pundit</span>
                                                <div className="point-div">
                                                    <i className="icon-bucket"/><span>100</span>Points
                                                </div>
                                            </div>
                                            <p>You must have a total score of 150 in at least 100
                                                non-community wiki answers to achieve this badge. Highest scoring answer
                                                that outscored an accepted answer with score of more than 100.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="badge-section">
                                            <div className="badge-div" style={{height: "96px"}}>
                                                <span className="badge-span"
                                                style={{backgroundColor: "#30a96f"}}>Explainer</span>
                                                <div className="point-div">
                                                    <i className="icon-bucket"/><span>150</span>Points
                                                </div>
                                            </div>
                                            <p>You must have a total score of 200 in at least 150
                                                non-community wiki answers to achieve this badge. Highest scoring answer
                                                that outscored an accepted answer with score of more than 150.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="badge-section">
                                            <div className="badge-div" style={{height: "96px"}}><span
                                                className="badge-span"
                                                style={{backgroundColor: "#6b3de4"}}>Professional</span>
                                                <div className="point-div">
                                                    <i className="icon-bucket"/>
                                                    <span>200</span>Points
                                                </div>
                                            </div>
                                            <p>You must have a total score of 250 in at least 200
                                                non-community wiki answers to achieve this badge. Highest scoring answer
                                                that outscored an accepted answer with score of more than 200.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="badge-section">
                                            <div className="badge-div" style={{height: "96px"}}><span
                                                className="badge-span"
                                                style={{backgroundColor: "#d9a34a"}}>Enlightened</span>
                                                <div className="point-div">
                                                    <i className="icon-bucket"/><span>250</span>Points
                                                </div>
                                            </div>
                                            <p>You must have a total score of 250 in at least 250
                                                non-community wiki answers to achieve this badge. Highest scoring answer
                                                that outscored an accepted answer with score of more than 250.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Badges.propTypes = propTypes;
