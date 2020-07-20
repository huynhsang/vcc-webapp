import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { useTranslation } from 'react-i18next';

import EditIcon from '@material-ui/icons/Edit';

import { AVATARS } from '../../constants/constants';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const useStyles = makeStyles((theme) => ({
    button: {
        padding: '5px',
        minWidth: 'unset',
        borderRadius: '50%',
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    title: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    content: {
        padding: '10px',
        backgroundColor: '#00000014',
        textAlign: 'center'
    },
    action: {
        margin: 0,
        padding: theme.spacing(1)
    }
}));

const AvaImg = styled.img`
    width: 120px;
    height: 120px;
    background-color: black;
    margin: 10px;
    border-radius: 50%;

    border: ${(p) => p.isActive && '2px solid #dacb1f'};
    opacity: 0.9;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }

    ${media.mobile`
        width: 90px;
        height: 90px;
    `}
`;

const CustomAvatar = ({ avatarIndex, setAvatarIndex }) => {
    const classes = useStyles();

    const [isOpen, setIsOpen] = React.useState(false);

    const toggleModal = () => setIsOpen((state) => !state);

    const { t } = useTranslation();

    const handleAvatar = (index) => () => {
        setAvatarIndex(index);
        toggleModal();
    };

    const imagesRender = AVATARS.map((val, key) => (
        <AvaImg
            key={key}
            src={val.image}
            isActive={avatarIndex === key}
            onClick={handleAvatar(key)}
        />
    ));

    return (
        <>
            <Button
                variant="contained"
                className={classes.button}
                onClick={toggleModal}
            >
                <EditIcon />
            </Button>
            <Dialog onClose={toggleModal} open={isOpen}>
                <MuiDialogTitle disableTypography className={classes.title}>
                    <Typography variant="h6">
                        {t('my_profile_custom_avatar')}
                    </Typography>
                    <IconButton
                        className={classes.closeButton}
                        onClick={toggleModal}
                    >
                        <CloseIcon />
                    </IconButton>
                </MuiDialogTitle>
                <MuiDialogContent className={classes.content} dividers>
                    {imagesRender}
                </MuiDialogContent>
                <MuiDialogActions className={classes.action}>
                    <Button onClick={toggleModal} color="secondary">
                        {t('common_cancel')}
                    </Button>
                </MuiDialogActions>
            </Dialog>
        </>
    );
};

export default CustomAvatar;
