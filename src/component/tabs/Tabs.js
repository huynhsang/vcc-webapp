import React from 'react';
import PropTypes from 'prop-types';
import BasicComponent from "../../common/abstract/component/BasicComponent";
import Tab from './Tab';
import './tabs.css';

const propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
};
export default class Tabs extends BasicComponent {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.label,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeTab) {
            this.changeStateValue('activeTab', nextProps.activeTab)
        }
    }

    onClickTabItem = (tab) => {
        this.changeStateValue('activeTab', tab);
    };

    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this;

        return (
            <div className="tabs">
                <ol className="tab-list">
                    {children.map((child) => {
                        const { label, isDisabled } = child.props;

                        return (
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={onClickTabItem}
                                isDisabled={!!isDisabled}
                            />
                        );
                    })}
                </ol>
                <div className="tab-content">
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return undefined;
                        return child.props.children;
                    })}
                </div>
            </div>
        );
    }
}
Tabs.prototypes = propTypes;