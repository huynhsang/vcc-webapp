import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { toggleMobileAsideFn, toggleContactUsFn } from '../../actions/app';

import { leftNavTabs } from './nav.constant';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles({
    list: {
        width: 250,
        paddingTop: 10
    },
    listItem: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#e3e3e3'
        }
    },
    activeItem: {
        backgroundColor: '#e3e3e3'
    }
});

const MobileAside = ({
    isOpenMobileAside,
    toggleMobileAside,
    history,
    location
}) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const onClickTab = (path, toHide = true) => () => {
        if (toHide) {
            toggleMobileAside(false);
        }
        history.push(path);
    };

    const { pathname } = location;

    const close = () => toggleMobileAside(false);
    return (
        <Drawer open={isOpenMobileAside} onClose={close}>
            <List className={classes.list}>
                <ListItem onClick={close} className={classes.listItem}>
                    <ListItemIcon>
                        <ChevronLeft />
                    </ListItemIcon>
                    <ListItemText primary={t('common_close')} />
                </ListItem>
                <Divider />
                {leftNavTabs.map(({ path, Icon, label }) => (
                    <ListItem
                        className={`${classes.listItem} ${pathname === path &&
                            classes.activeItem}`}
                        key={label}
                        onClick={onClickTab(path)}
                    >
                        <ListItemIcon>
                            <Icon />
                        </ListItemIcon>
                        <ListItemText primary={t(label)} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

// Retrieve data from store as props
const mapStateToProps = ({ App: { isOpenMobileAside } }) => ({
    isOpenMobileAside
});

const mapDispatchToProps = dispatch => ({
    toggleMobileAside: val => dispatch(toggleMobileAsideFn(val)),
    toggleContactUs: val => dispatch(toggleContactUsFn(val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MobileAside));
