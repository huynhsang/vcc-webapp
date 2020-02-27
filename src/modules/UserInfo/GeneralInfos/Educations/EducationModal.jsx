import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

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
    margin-bottom: 10px;
    & > div:first-child{
        margin-right: 10px;
    }
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

const EducationModal = ({
    submit,
    isShowing,
    onClose,
    educationToEdit,
    isChangingEducation,
    isFetchingError
}) => {
    const { t } = useTranslation();
    const classes = useStyle();

    const [isMounted, setIsMounted] = React.useState(false);

    const [isShownError, setIsShownError] = React.useState(false);

    const [educationEditted, setEducationEditted] = React.useState({});

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        setEducationEditted(educationToEdit || {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [educationToEdit]);

    React.useEffect(() => {
        if (isMounted && !isChangingEducation && !isFetchingError) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChangingEducation]);

    const {
        degree = '',
        fieldOfStudy = '',
        fromYear = 0,
        toYear = 0,
        description = ''
    } = educationEditted;

    const updateEducationEditted = obj => {
        setIsShownError(false);
        setEducationEditted({ ...educationEditted, ...obj });
    };

    const onSubmit = () => {
        if (!degree || !fieldOfStudy || !fromYear || !toYear) {
            return setIsShownError(true);
        }
        submit(educationEditted);
    };

    return (
        <Dialog className={classes.dialog} open={isShowing}>
            <DialogTitle className={classes.title}>
                <div>{t('common_education')}</div>
                <IconButton size="medium" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                {isChangingEducation ? (
                    <LoaderWrapper>
                        <CircularProgress />
                    </LoaderWrapper>
                ) : (
                    <>
                        <TextField
                            fullWidth
                            label={t('form_your_school')}
                            variant="outlined"
                            value={degree}
                            onChange={ev =>
                                updateEducationEditted({
                                    degree: ev.target.value
                                })
                            }
                            error={isShownError && !degree}
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label={t('common_field_of_study')}
                            variant="outlined"
                            value={fieldOfStudy}
                            onChange={ev =>
                                updateEducationEditted({
                                    fieldOfStudy: ev.target.value
                                })
                            }
                            error={isShownError && !fieldOfStudy}
                            margin="dense"
                        />
                        <FlexWrapper>
                            <TextField
                                type="number"
                                label={t('common_from_year')}
                                variant="outlined"
                                value={fromYear}
                                onChange={ev =>
                                    updateEducationEditted({
                                        fromYear: ev.target.value
                                    })
                                }
                                error={isShownError && !fromYear}
                                margin="dense"
                            />
                            <TextField
                                type="number"
                                label={t('common_to_year')}
                                variant="outlined"
                                value={toYear}
                                onChange={ev =>
                                    updateEducationEditted({
                                        toYear: ev.target.value
                                    })
                                }
                                error={isShownError && !toYear}
                                margin="dense"
                            />
                        </FlexWrapper>
                        <TextField
                            fullWidth
                            label={t('common_description')}
                            multiline
                            rows="6"
                            value={description}
                            variant="outlined"
                            onChange={ev =>
                                updateEducationEditted({
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

export default EducationModal;
