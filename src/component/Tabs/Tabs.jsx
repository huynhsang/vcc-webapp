import React from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import './tabs.css';

const Tabs = ({ currentTab, setCurrentTab, children }) => (
    <div className="tabs">
        <ol className="tab-list">
            {children.map(child => {
                const { label, isDisabled } = child.props;
                return (
                    <Tab
                        activeTab={currentTab}
                        key={label}
                        label={label}
                        onClick={setCurrentTab}
                        isDisabled={!!isDisabled}
                    />
                );
            })}
        </ol>
        <div className="tab-content">
            {
                children.find(child => child.props.label === currentTab).props
                    .children
            }
        </div>
    </div>
);

Tabs.prototypes = {
    children: PropTypes.instanceOf(Array).isRequired
};

export default Tabs;
