import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { ProgressSpinner } from 'primereact/progressspinner';

import { isDate } from '../../../../utils/detect-date';

const dialogStyle = {
    width: '95%',
    maxWidth: '750px'
};
const contentStyle = {
    position: 'relative',
    maxHeight: '73vh',
    padding: '12px 24px 24px 24px',
    overflowY: 'auto'
};

const Input = styled.input`
    border-color: ${p => p.isShownAlert && 'red !important'};
`;

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    color: red;
    align-items: center;
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

        if (experienceToEdit) {
            const { startDate, endDate } = experienceToEdit;
            if (experienceToEdit && !isDate(startDate)) {
                newObj.startDate = new Date(startDate);
            }
            if (experienceToEdit && !isDate(endDate)) {
                newObj.endDate = new Date(endDate);
            }
        }

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
        if (!title || !company || !startDate || !(isWorking || endDate)) {
            return setIsShownError(true);
        }
        submit(experienceEditted);
    };

    const footer = (
        <FlexWrapper>
            <Button
                label="Save"
                className="btn-primary"
                icon="pi pi-check"
                onClick={onSubmit}
            />
            {isShownError && <div>{t('form_require_all_values')}</div>}
        </FlexWrapper>
    );

    return (
        <Dialog
            header="Experience"
            visible={isShowing}
            style={dialogStyle}
            contentStyle={contentStyle}
            modal={true}
            onHide={onClose}
            footer={footer}
            dismissableMask
        >
            {isChangingExperience ? (
                <LoaderWrapper>
                    <ProgressSpinner />
                </LoaderWrapper>
            ) : (
                <>
                    <div>
                        {t('form_your_job')} <span className="required">*</span>
                    </div>
                    <Input
                        type="text"
                        placeholder={t('form_ex_work_manager')}
                        value={title}
                        onChange={ev =>
                            updateExperienceEditted({ title: ev.target.value })
                        }
                        isShownAlert={isShownError && !title}
                    />
                    <div className="mt2">
                        {t('common_company')}{' '}
                        <span className="required">*</span>
                    </div>
                    <Input
                        type="text"
                        value={company}
                        onChange={ev =>
                            updateExperienceEditted({
                                company: ev.target.value
                            })
                        }
                        isShownAlert={isShownError && !company}
                    />
                    <div className="mt2">{t('common_location')}</div>
                    <Input
                        type="text"
                        value={location}
                        onChange={ev =>
                            updateExperienceEditted({
                                location: ev.target.value
                            })
                        }
                        isShownAlert={isShownError && !location}
                    />
                    <div className="mt2">
                        <input
                            id="work-1"
                            type="checkbox"
                            checked={isWorking}
                            onChange={ev =>
                                updateExperienceEditted({
                                    isWorking: ev.target.checked
                                })
                            }
                        />
                        <label htmlFor="work-1">{t('form_current_role')}</label>
                    </div>
                    <div className="row mt2">
                        <div className="col-sm-6">
                            <label>
                                {t('common_start_date')}
                                <span className="required"> *</span>
                            </label>
                            <Calendar
                                value={isDate(startDate) ? startDate : null}
                                placeholder="mm/yy"
                                view="month"
                                dateFormat="mm/yy"
                                yearNavigator={true}
                                yearRange="2010:2030"
                                onChange={ev =>
                                    updateExperienceEditted({
                                        startDate: ev.value
                                    })
                                }
                            />
                        </div>
                        <div className="col-sm-6">
                            <label>
                                {t('common_end_date')}
                                <span className="required"> *</span>
                            </label>
                            {isWorking ? (
                                <div>
                                    <i>{t('common_present')}</i>
                                </div>
                            ) : (
                                <Calendar
                                    value={isDate(endDate) ? endDate : null}
                                    placeholder="mm/yy"
                                    view="month"
                                    dateFormat="mm/yy"
                                    yearNavigator={true}
                                    yearRange="2010:2030"
                                    onChange={ev =>
                                        updateExperienceEditted({
                                            endDate: ev.value
                                        })
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className="mt2">{t('common_description')}</div>
                    <textarea
                        rows="6"
                        value={description}
                        onChange={ev =>
                            updateExperienceEditted({
                                description: ev.target.value
                            })
                        }
                    />
                </>
            )}
        </Dialog>
    );
};

export default ExperienceModal;
