import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import VerticalActiveSteps from '../../component/VerticalActiveSteps';
import { askSteps, answerSteps, supportText } from './workspaceText.constant';
import AskButton from '../../component/AskButton';
import { DefaultWrapper } from '../../component/Wrappers';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const FullWidth = styled.div`
    background-color: #f7f7f7;
`;

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 15px;
`;

const SmallTitle = styled.div`
    text-align: center;
    font-size: 1.1rem;
    font-weight: bold;
    padding: 15px 0;
`;

const StepsWrapper = styled.div`
    margin: 0 -10px;
    display: flex;
    flex-wrap: wrap;
`;

const StepWrapper = styled.div`
    border-radius: 6px;
    overflow: hidden;
    width: calc(50% - 20px);
    margin: 10px;
    ${media.mobileLandscape`
        width: calc(100% - 20px);
    `}
`;

const SupportWrapper = styled.div`
    border-radius: 6px;
    margin-top: 20px;
    padding: 10px;
    background-color: white;
`;

const SupportOl = styled.ul`
    list-style: initial;
    font-weight: 600;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    padding: 0;
    margin: 0;

    & li {
        margin-left: 20px;
        width: calc(33.33% - 20px);
        line-height: 30px;
        color: rgba(0, 0, 0, 0.6);
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

const useStyles = makeStyles(() => ({
    linkButton: {
        color: 'rgba(0, 0, 0, 0.58)'
    }
}));

const WorkSpace = ({ history }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const askStepsTranslate = askSteps.map(val => ({
        ...val,
        title: t(val.title)
    }));

    const answerStepsTranslate = answerSteps.map(val => ({
        ...val,
        title: t(val.title)
    }));

    const goTo = () => {
        window.scrollTo(0, 0);
        history.push('/information');
    };

    return (
        <FullWidth>
            <DefaultWrapper>
                <FlexWrapper>
                    <Title>{t('common_how_does_it_work')}</Title>
                    <Button
                        onClick={goTo}
                        className={classes.linkButton}
                        endIcon={<ChevronRightIcon />}
                    >
                        {t('common_more_detail')}
                    </Button>
                </FlexWrapper>
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
