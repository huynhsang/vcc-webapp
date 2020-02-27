import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import dateformat from 'dateformat';

const useStyle = makeStyles(() => ({
    dialog: {
        '& .MuiDialog-paper': {
            background: '#fdfdfd',
            '@media (max-width: 768px)': {
                margin: 10
            }
        }
    },
    title: {
        paddingBottom: 0,
        '& > h2': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        '@media (max-width: 768px)': {
            padding: '10px 10px 0'
        }
    },
    content: {
        paddingBottom: 20,
        '@media (max-width: 768px)': {
            padding: 10
        }
    },
    actions: {
        justifyContent: 'space-between',
        flexDirection: 'row-reverse'
    }
}));

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 15px;
    padding: 0 20px;
`;

const LoaderWrapper = styled.div`
    width: 100%;
    min-height: 420px;
    position: relative;
    & > div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
`;

const ExperienceModal = ({
    submit,
    isShowing,
    onClose,
    experienceToEdit,
    isChangingExperience,
    isFetchingError
}) => {
    const classes = useStyle();
    const { t } = useTranslation();

    const [isMounted, setIsMounted] = React.useState(false);

    const [isShownError, setIsShownError] = React.useState(false);

    const [experienceEditted, setExperienceEditted] = React.useState({});

    React.useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsShownError(false);
        };
    }, []);

    React.useEffect(() => {
        const newObj = experienceToEdit ? { ...experienceToEdit } : {};
        setExperienceEditted(newObj);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [experienceToEdit]);

    React.useEffect(() => {
        if (isMounted && !isChangingExperience && !isFetchingError) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChangingExperience]);

    const {
        title = '',
        company = '',
        location = '',
        isWorking = false,
        startDate,
        endDate = new Date(),
        description = ''
    } = experienceEditted;

    const updateExperienceEditted = obj => {
        setIsShownError(false);
        setExperienceEditted({ ...experienceEditted, ...obj });
    };

    const onSubmit = () => {
        if (
            !title ||
            !location ||
            !company ||
            !startDate ||
            !(isWorking || endDate)
        ) {
            return setIsShownError(true);
        }
        submit(experienceEditted);
    };

    return (
        <Dialog className={classes.dialog} open={isShowing}>
            <DialogTitle className={classes.title}>
                <div>{t('common_experience')}</div>
                <IconButton size="medium" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                {isChangingExperience ? (
                    <LoaderWrapper>
                        <CircularProgress />
                    </LoaderWrapper>
                ) : (
                    <>
                        <TextField
                            fullWidth
                            label={t('form_your_job')}
                            helperText={t('form_ex_work_manager')}
                            variant="outlined"
                            value={title}
                            onChange={ev =>
                                updateExperienceEditted({
                                    title: ev.target.value
                                })
                            }
                            error={isShownError && !title}
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label={t('common_company')}
                            variant="outlined"
                            value={company}
                            onChange={ev =>
                                updateExperienceEditted({
                                    company: ev.target.value
                                })
                            }
                            error={isShownError && !company}
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label={t('common_location')}
                            variant="outlined"
                            value={location}
                            onChange={ev =>
                                updateExperienceEditted({
                                    location: ev.target.value
                                })
                            }
                            error={isShownError && !location}
                            margin="dense"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isWorking}
                                    onChange={ev =>
                                        updateExperienceEditted({
                                            isWorking: ev.target.checked
                                        })
                                    }
                                    color="primary"
                                />
                            }
                            label={t('form_current_role')}
                        />
                        <FlexWrapper>
                            <TextField
                                label={t('common_start_date')}
                                type="date"
                                defaultValue={dateformat(
                                    startDate,
                                    'yyyy-mm-dd'
                                )}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={ev =>
                                    updateExperienceEditted({
                                        startDate: ev.target.value
                                    })
                                }
                            />
                            {isWorking ? (
                                <div>
                                    <i>{t('common_present')}</i>
                                </div>
                            ) : (
                                <TextField
                                    label={t('common_start_date')}
                                    type="date"
                                    defaultValue={dateformat(
                                        endDate,
                                        'yyyy-mm-dd'
                                    )}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    onChange={ev =>
                                        updateExperienceEditted({
                                            endDate: ev.target.value
                                        })
                                    }
                                />
                            )}
                        </FlexWrapper>
                        <TextField
                            fullWidth
                            label={t('common_description')}
                            multiline
                            rows="6"
                            value={description}
                            variant="outlined"
                            onChange={ev =>
                                updateExperienceEditted({
                                    description: ev.target.value
                                })
                            }
                        />
                    </>
                )}
            </DialogContent>
            <MuiDialogActions className={classes.actions}>
                <Button variant="contained" onClick={onSubmit} color="primary">
                    {t('common_save')}
                </Button>
                {isShownError && <div>{t('form_require_all_values')}</div>}
            </MuiDialogActions>
        </Dialog>
    );
};

export default ExperienceModal;
