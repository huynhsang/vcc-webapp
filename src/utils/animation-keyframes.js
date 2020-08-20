import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

export const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const zoomInOut = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(0.5) translateZ(0);
  }
  50% {
    opacity: 1;
    transform: scale(1) translateZ(0);
  }
  100% {
    opacity: 0.5;
    transform: scale(0.5) translateZ(0);
  }
`;

export const spin = keyframes`
  100% { 
    transform: rotateZ(360deg);
  }
`;

export const borderTop = keyframes`
  25% {
    width: 0;
  }
  38% {
    width: calc(100% + 3px);
  }
  50% {
  }
  62% {
  }
  75% {
    width: calc(100% + 3px);
  }
  88% {
    left: auto;
    right: -3px;
    width: 0;
  }
`;

export const borderRight = keyframes`
  38% {
    height: 0;
  }
  50% {
    height: calc(103%);
  }
  62% {
  }
  75% {
  }
  88% {
    height: calc(103%);
  }
  100% {
    top: auto;
    bottom: -3px;
    height: 0;
  }
`;

export const borderBottom = keyframes`
  0% {
    width: 0;
  }
  12% {
    width: calc(100% + 3px);
  }
  25% {
  }
  38% {
  }
  50% {
    width: calc(100% + 3px);
  }
  62% {
    left: -3px;
    width: 0;
  }
  75% {
  }
`;
export const borderLeft = keyframes`
  12% {
    height: 0;
  }
  25% {
    height: calc(100% + 3px);
  }
  38% {
  }
  50% {
  }
  62% {
    height: calc(100% + 3px);
  }
  75% {
    top: -3px;
    height: 0;
  }
  88% {
  }
`;
