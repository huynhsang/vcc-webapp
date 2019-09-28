import React from 'react';
import PropTypes from 'prop-types';
import BasicComponent from "../../common/abstract/component/BasicComponent";

const propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};
export default class Tab extends BasicComponent {

    onClick = () => {
        const { label, onClick, isDisabled } = this.props;
        if (!isDisabled) {
            onClick(label);
        }
    };

    render() {
        const {
            onClick,
            props: {
                activeTab,
                label,
            },
        } = this;

        let className = 'tab-list-item';

        if (activeTab === label) {
            className += ' tab-list-active';
        }

        return (
            <li className={className} onClick={onClick}>
                {label}
            </li>
        );
    }
}
Tab.propTypes = propTypes;