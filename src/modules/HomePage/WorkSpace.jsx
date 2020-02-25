import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import VerticalActiveSteps from '../../component/VerticalActiveSteps';
import { askSteps, answerSteps, supportText } from './workspaceText.constant';
import AskButton from '../../component/AskButton';
import { DefaultWrapper } from '../../component/Wrappers';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const FullWidth = styled.div`
    background-color: #f7f7f7;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
`;

const SmallTitle = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    padding: 15px 0;
`;

const StepsWrapper = styled.div`
    margin: 0 -10px;
    display: flex;
    flex-wrap: wrap;
`;

const StepWrapper = styled.div`
    width: calc(50% - 20px);
    margin: 10px;
    ${media.mobileLandscape`
        width: calc(100% - 20px);
    `}
`;

const SupportWrapper = styled.div`
    margin-top: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    padding: 10px;
    background-color: white;
`;

const SupportOl = styled.ul`
    list-style: initial;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    & li {
        margin-left: 20px;
        width: calc(33.33% - 20px);
        line-height: 30px;
        color: rgba(0, 0, 0, 0.87);
        ${media.mobileLandscape`
            width: calc(100% - 20px);
        `}
    }
`;

const AskWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
`;

const WorkSpace = () => {
    const { t } = useTranslation();

    const askStepsTranslate = askSteps.map(val => ({
        ...val,
        title: t(val.title)
    }));

    const answerStepsTranslate = answerSteps.map(val => ({
        ...val,
        title: t(val.title)
    }));

    return (
        <FullWidth>
            <DefaultWrapper>
                <Title>{t('workspace_how_does_it_work')}</Title>
                <StepsWrapper>
                    <StepWrapper>
                        <VerticalActiveSteps
                            steps={askStepsTranslate}
                            title={t('workspace_if_you_are_asking')}
                        />
                    </StepWrapper>
                    <StepWrapper>
                        <VerticalActiveSteps
                            steps={answerStepsTranslate}
                            title={t('workspace_if_you_are_answering')}
                        />
                    </StepWrapper>
                </StepsWrapper>
                <SupportWrapper>
                    <SmallTitle>{t('workspace_our_support')}</SmallTitle>
                    <SupportOl>
                        {supportText.map((text, key) => (
                            <li key={key}>{t(text)}</li>
                        ))}
                    </SupportOl>
                </SupportWrapper>
                <AskWrapper>
                    <AskButton label={t('common_ask')} />
                </AskWrapper>
            </DefaultWrapper>
        </FullWidth>
    );
};

export default WorkSpace;
