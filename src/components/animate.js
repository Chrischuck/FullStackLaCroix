import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
from {
  opacity: .0;
}
to {
  opacity 1;
}
`;

export const FadeIn = styled.div`
  animation: ${fadeIn} 1.3s;
`;

const fadeInFromLeft = keyframes`
from {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`;

export const FadeInFromLeft = styled.div`
  animation: ${fadeInFromLeft} .8s;
`;

const pulse = keyframes`
from {
  transform: scale3d(1, 1, 1);
}

50% {
  transform: scale3d(1.05, 1.05, 1.05);
}

to {
  transform: scale3d(1, 1, 1);
}
`;

export const Pulse = styled.div`
  animation: ${pulse} 1s;
  display: flex;
`;

const fadeInFromTop = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}

to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`;

export const FadeInFromTop = styled.div`
  animation: ${fadeInFromTop} .8s;
`;