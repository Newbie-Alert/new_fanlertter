import styled, { css } from "styled-components";


const MessageContainer = styled.div`
  width: 100%;
  padding: 1rem 3rem;
  /* display: grid;
  grid-template-columns: repeat(6, 1fr); */
`;

const MessageHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MessageTitle = styled.h3`
  width: fit-content;
  font-weight: 600;
  font-size: 2rem;
`;

const MessageFilterBtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MessageFilterBtn = styled.div`
  width: 75px;
  padding: 0.6rem 0.1rem;
  border-radius: 6px;
  ${(props) => {
    if (props.$current === props.children) {
      return css`
        background-color: #9595ff;
      `;
    } else {
      return css`
        background-color: #eee;
      `;
    }
  }}
  color: #1f1f1f;
  font-weight: 800;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.5s ease;
  text-align: center;

  &:hover {
    background: #147ce4;
    color: #ffffff;
  }
`;

const NotLogined = styled.div`
  width: 100%;
  padding: 2rem 1rem 2rem 1rem;
  font-size: 1.5rem;
  text-align: center;
`;

export {
  MessageContainer,
  MessageHeader,
  MessageTitle,
  MessageFilterBtnBox,
  MessageFilterBtn,
  NotLogined,
}