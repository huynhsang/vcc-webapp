import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import StyleIcon from '@material-ui/icons/Style';

import { calculations, pointScale } from './infos.constant';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const useStyles = makeStyles(() => ({
    scaleBar: {
        '& .Mui-disabled .MuiStepConnector-lineVertical': {
            minHeight: 0
        },
        '& .MuiStepIcon-active': {
            fontSize: '28px'
        }
    }
}));

const Title = styled.div`
    font-size: 18px;
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

const Description = styled.div`
    margin-top: 20px;
`;

const Bloc = styled.div`
    width: calc(50% - 20px);
    border: 1px solid #e1e3e3;
    border-radius: 6px;
    margin: 10px;
    padding: 10px 15px;
    & svg {
        color: #ff6935;
    }
`;

const FlexWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Point = styled.div`
    font-size: 1.2em;
    margin: 0 5px;
    color: black;
`;

const LeftWrapper = styled.div`
    width: 65%;
    ${media.mobile`
        width: 100%;
    `}
`;

const RightWrapper = styled.div`
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${media.mobile`
        width: 100%;
        align-items: flex-start;
    `}
`;

const Badges = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const calculationsRender = calculations.map(cal => (
        <Bloc key={cal.description}>
            <FlexWrapper>
                <StyleIcon />
                <Point>{cal.point}</Point>
                {t('common_points')}
            </FlexWrapper>
            <div>{t(cal.description)}</div>
        </Bloc>
    ));

    return (
        <FlexWrapper>
            <LeftWrapper>
                <Title>
                    <StyleIcon />
                    {t('common_badges')}
                </Title>
                <Description>
                    <p>{t('badges_beside_gaining_reputation')}</p>
                    <p>{t('badges_shown')}</p>
                </Description>
                <FlexWrapper>{calculationsRender}</FlexWrapper>
            </LeftWrapper>
            <RightWrapper>
                <Title>
                    <StyleIcon />
                    {t('common_point_scale')}
                </Title>
                <Stepper orientation="vertical" className={classes.scaleBar}>
                    {pointScale.map((step, index) => (
                        <Step key={`step-${index}`} active={true}>
                            <StepLabel
                                icon={
                                    !index ? '0' : pointScale[index - 1].start
                                }
                            >
                                {step.title}
                            </StepLabel>
                            <StepContent>
                                <Typography>{t(step.value)}</Typography>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </RightWrapper>
        </FlexWrapper>
    );
};

export default Badges;
