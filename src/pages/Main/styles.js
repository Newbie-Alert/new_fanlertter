import styled, { keyframes } from "styled-components";

const Fade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10%)
  }

  100% {
    opacity: 1;
    transform: translateY(0%)
  }
`;

const MainContainer = styled.div`
  width: 100%;
  padding-top: 4rem;
  animation: ${Fade} 0.4s forwards;
`;

export {
  Fade, MainContainer
}