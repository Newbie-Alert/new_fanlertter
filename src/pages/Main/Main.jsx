import React from "react";
import Banner from "../../components/Banner/Banner";
import styled, { keyframes } from "styled-components";
import Input from "../../components/Input/Input";
import Message from "../../components/Message/Message";

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

export default function Main() {
  return (
    <MainContainer>
      <Banner />
      <Input />
      <Message />
    </MainContainer>
  );
}
