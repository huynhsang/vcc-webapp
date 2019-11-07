import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

const dialogStyle = {
    width: '95%',
    maxWidth: '750px'
};
const contentStyle = {
    position: 'relative',
    maxHeight: '65vh',
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

const EducationModal = ({
    submit,
    isShowing,
    onClose,
    educationToEdit,
    isChangingEducation,
    isFetchingError
}) => {
    const { t } = useTranslation();

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
            header={t('common_education')}
            visible={isShowing}
            style={dialogStyle}
            contentStyle={contentStyle}
            modal={true}
            onHide={onClose}
            footer={footer}
            dismissableMask
        >
            {isChangingEducation ? (
                <LoaderWrapper>
                    <ProgressSpinner />
                </LoaderWrapper>
            ) : (
                <>
                    <div>
                        {t('form_your_school')}{' '}
                        <span className="required">*</span>
                    </div>
                    <Input
                        type="text"
                        value={degree}
                        onChange={ev =>
                            updateEducationEditted({ degree: ev.target.value })
                        }
                        isShownAlert={isShownError && !degree}
                    />
                    <div className="mt2">
                        {t('common_field_of_study')}{' '}
                        <span className="required">*</span>
                    </div>
                    <Input
                        type="text"
                        value={fieldOfStudy}
                        onChange={ev =>
                            updateEducationEditted({
                                fieldOfStudy: ev.target.value
                            })
                        }
                        isShownAlert={isShownError && !fieldOfStudy}
                    />
                    <div className="row mt2">
                        <div className="col-sm-6">
                            <div className="mt2">{t('common_from_year')}</div>
                            <Input
                                type="number"
                                value={fromYear}
                                onChange={ev =>
                                    updateEducationEditted({
                                        fromYear: ev.target.value
                                    })
                                }
                                isShownAlert={isShownError && !fromYear}
                            />
                        </div>
                        <div className="col-sm-6">
                            <div className="mt2">{t('common_to_year')}</div>
                            <Input
                                type="number"
                                value={toYear}
                                onChange={ev =>
                                    updateEducationEditted({
                                        toYear: ev.target.value
                                    })
                                }
                                isShownAlert={isShownError && !toYear}
                            />
                        </div>
                    </div>
                    <div className="mt2">{t('common_description')}</div>
                    <textarea
                        rows="6"
                        value={description}
                        onChange={ev =>
                            updateEducationEditted({
                                description: ev.target.value
                            })
                        }
                    />
                </>
            )}
        </Dialog>
    );
};

export default EducationModal;
