import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useTranslation } from 'react-i18next';
import { ConfirmModal } from '../ConfirmModal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    iconButton: {
        margin: '0 0 0 5px',
        padding: '2px'
    }
}));

const AnswerMenu = ({ answerId, removeAnswer, onEdit }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const edit = () => {
        onEdit();
        handleClose();
    };

    const deleteAnswerFn = () => {
        handleClose();
        setIsOpenDeleteModal(true);
    };

    return (
        <>
            <div>
                <IconButton
                    className={classes.iconButton}
                    onClick={handleClick}
                >
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            width: '20ch'
                        }
                    }}
                >
                    <MenuItem
                        key="edit"
                        onClick={edit}
                        style={{ minHeight: '35px' }}
                    >
                        {t('common_edit')}
                    </MenuItem>
                    <MenuItem
                        key="delete"
                        onClick={deleteAnswerFn}
                        style={{ minHeight: '35px' }}
                    >
                        {t('common_delete')}
                    </MenuItem>
                </Menu>
            </div>
            <ConfirmModal
                isOpen={isOpenDeleteModal}
                action={() => removeAnswer(answerId)}
                title={t('question_do_you_want_to_delete_this_answer')}
                cancel={() => setIsOpenDeleteModal(false)}
            />
        </>
    );
};

export default AnswerMenu;
