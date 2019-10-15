import React from 'react';
import styled from 'styled-components';
import Modal from '../../../../component/modal/modal';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const defaultExpericence = () => ({
    id: '',
    title: '',
    employment: 0,
    company: '',
    location: '',
    isWorking: false,
    startDate: '',
    endDate: new Date(),
    description: ''
});

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

const ExperienceModal = ({
    submit,
    isShowing,
    setIsShowing,
    experience = {}
}) => {
    const { t } = useTranslation();

    const [isShownError, setIsShownError] = React.useState(false);

    const [experienceEditted, setExperienceEditted] = React.useState(
        experience
    );

    const { id } = experience;

    React.useEffect(() => {
        setExperienceEditted(experience);
        setIsShownError(false);
    }, [id, isShowing]);

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
        if (!title || !company || !startDate || !(!isWorking && endDate)) {
            return setIsShownError(true);
        }
        submit({
            title,
            company,
            location,
            isWorking,
            startDate,
            endDate,
            description
        });
    };

    const renderError = (condition, valueRequired) => {
        if (isShownError && condition) {
            return (
                <div className="required">
                    {t('form_require_value', { value: valueRequired })}
                </div>
            );
        }
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
            onHide={() => setIsShowing(false)}
            footer={footer}
            dismissableMask
        >
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
                {t('common_company')} <span className="required">*</span>
            </div>
            <Input
                type="text"
                value={company}
                onChange={ev =>
                    updateExperienceEditted({ company: ev.target.value })
                }
                isShownAlert={isShownError && !company}
            />
            <div className="mt2">{t('common_location')}</div>
            <Input
                type="text"
                value={location}
                onChange={ev =>
                    updateExperienceEditted({ location: ev.target.value })
                }
                isShownAlert={isShownError && !location}
            />
            <div className="mt2">
                <input
                    id="work-1"
                    type="checkbox"
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
                        value={startDate}
                        placeholder="mm/dd/YY"
                        onChange={ev =>
                            setExperienceEditted({ startDate: ev.value })
                        }
                    />
                </div>
                <div className="col-sm-6">
                    <label>
                        {t('common_end_date')}
                        <span className="required"> *</span>
                    </label>
                    {isWorking ? (
                        <i>{t('common_present')}</i>
                    ) : (
                        <Calendar
                            value={endDate}
                            placeholder="mm/dd/YY"
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
                    updateExperienceEditted({ description: ev.target.value })
                }
            />
        </Dialog>
    );
};

export default ExperienceModal;
