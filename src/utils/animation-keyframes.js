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
