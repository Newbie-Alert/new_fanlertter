import styled from "styled-components";
import { css, keyframes } from "styled-components";


// STYLED COMPONENTS
const FadeAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10%)
  }

  100% {
    opacity: 1;
    transform: translateY(0%)
  }
`;

const BannerContainer = styled.div`
  width: 100vw;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const BannerCarouselContainer = styled.div`
  width: 500vw;
  display: flex;
  align-items: center;
  border: 1px solid black;
  transition: transform 0.4s ease;
  transform: ${(props) => `translateX(${props.$position}vw)`};
`;

const BannerImg = styled.img.attrs((props) => ({
  src: props.$source,
}))`
  width: 100vw;

  & img {
    max-width: 100vw;
  }
`;

const Title = styled.h1`
  position: absolute;
  bottom: 2%;
  left: 2%;
  z-index: 1;
  font-size: 3rem;
  opacity: 0.9;
  color: #1b1b1b;
  letter-spacing: -0.08rem;
`;

const CarouselBtn = styled.button.attrs((props) => ({
  type: "button",
}))`
  width: 50px;
  height: 50px;
  border: none;
  font-weight: 700;
  font-size: 2rem;
  border-radius: 50%;
  background-color: aliceblue;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  ${(props) => {
    if (props.children === "<") {
      return css`
        left: 3%;
      `;
    } else {
      return css`
        right: 3%;
      `;
    }
  }}
`;


export {
  FadeAnimation, BannerContainer, BannerCarouselContainer, BannerImg, Title, CarouselBtn,
};