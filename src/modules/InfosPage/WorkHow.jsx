import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import VerticalActiveSteps from '../../component/VerticalActiveSteps';
import { startSteps } from './infos.constant';
import { DefaultWrapper } from '../../component/Wrappers';
import StyleIcon from '@material-ui/icons/Style';

const Bacground = styled.div`
    background-color: #f7f7f7;
`;

const Text = styled.div`
    margin-top: 20px;
`;

const Title = styled.div`
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
    color: #484848;

    & svg {
        margin-right: 10px;
    }
`;

const WorkHow = () => {
    const { t } = useTranslation();

    const askStepsTranslate = startSteps.map((val, index) => ({
        title: `${t(val.title)} ${index + 1}`,
        description: t(val.description, { link: 'test' })
    }));

    return (
        <Bacground>
            <DefaultWrapper>
                <Title>
                    <StyleIcon />
                    {t('infos_what_does_VCNC_do')}
                </Title>
                <p>{t('infos_what_does_VCNC_do_description')}</p>
                <VerticalActiveSteps steps={askStepsTranslate} />
                <Text>{t('infos_conclusion')}</Text>
            </DefaultWrapper>
        </Bacground>
    );
};

export default WorkHow;
