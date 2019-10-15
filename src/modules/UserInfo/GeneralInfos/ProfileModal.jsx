import React from 'react';
import styled from 'styled-components';
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

const ProfileModal = ({ submit, isShowing, setIsShowing, profile = {} }) => {
    const { t } = useTranslation();

    const [isShownError, setIsShownError] = React.useState(false);

    const [profileEditted, setProfileEditted] = React.useState(profile);

    const { id } = profile;

    React.useEffect(() => {
        setProfileEditted(profile);
        setIsShownError(false);
    }, [id, isShowing]);

    const { firstname = '', lastname = '', summary = '' } = profileEditted;

    const updateProfileEditted = obj => {
        setIsShownError(false);
        setProfileEditted({ ...profileEditted, ...obj });
    };

    const onSubmit = () => {
        if (!firstname || !firstname || !summary) {
            return setIsShownError(true);
        }
        submit({
            firstname,
            lastname,
            summary
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
            <div className="row mt2">
                <div className="col-sm-6">
                    <div className="mt2">{t('common_lastname')}</div>
                    <Input
                        type="text"
                        value={lastname}
                        onChange={ev =>
                            updateProfileEditted({
                                lastname: ev.target.value
                            })
                        }
                        isShownAlert={isShownError && !lastname}
                    />
                </div>
                <div className="col-sm-6">
                    <div className="mt2">{t('common_firstname')}</div>
                    <Input
                        type="text"
                        value={firstname}
                        onChange={ev =>
                            updateProfileEditted({ firstname: ev.target.value })
                        }
                        isShownAlert={isShownError && !firstname}
                    />
                </div>
            </div>
            <div className="mt2">{t('common_summary')}</div>
            <textarea
                rows="6"
                value={summary}
                onChange={ev =>
                    updateProfileEditted({ summary: ev.target.value })
                }
            />
        </Dialog>
    );
};

export default ProfileModal;
