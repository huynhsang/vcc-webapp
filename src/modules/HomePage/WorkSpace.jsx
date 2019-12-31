import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import VerticalActiveSteps from '../../component/VerticalActiveSteps';

import { askSteps, answerSteps, supportText } from './workspaceText.constant';

const FullWidth = styled.div`
    background-color: white;
`;

const Wrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px;
`;

const Title = styled.div`
    font-size: 16px;
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
`;

const StepWrapper = styled.div`
    float: left;
    width: calc(50% - 20px);
    margin: 0 10px;
`;

const SupportWrapper = styled.div`
    margin-top: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    padding: 10px;
`;

const SupportOl = styled.ul`
    list-style: initial;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;

    & li {
        margin-left: 20px;
    }
`;

const WorkSpace = () => {
    const { t } = useTranslation();

    return (
        <FullWidth>
            <Wrapper>
                <Title>{t('workspace_how_does_it_work')}</Title>
                <StepsWrapper className="row">
                    <StepWrapper>
                        <VerticalActiveSteps
                            steps={askSteps}
                            title={t('workspace_if_you_are_asking')}
                        />
                    </StepWrapper>
                    <StepWrapper>
                        <VerticalActiveSteps
                            steps={answerSteps}
                            title={t('workspace_if_you_are_answering')}
                        />
                    </StepWrapper>
                </StepsWrapper>
                <SupportWrapper>
                    <SmallTitle>{t('workspace_our_support')}</SmallTitle>
                    <SupportOl>
                        {supportText.map(text => (
                            <li>{text}</li>
                        ))}
                    </SupportOl>
                </SupportWrapper>
            </Wrapper>
        </FullWidth>
    );
};

export default WorkSpace;
