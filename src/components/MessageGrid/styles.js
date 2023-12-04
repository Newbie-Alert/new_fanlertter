import styled from "styled-components";
import { FadeAnimation } from "../Banner/styles";

const MessageGridContainer = styled.div`
  width: 100%;
  height: 350px;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  padding: 1rem 0;
`;

const MessageBox = styled.div`
  width: 100%;
  min-width: 150px;
  height: 150px;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  cursor: pointer;
  animation: ${FadeAnimation} 0.4s forwards;

  &:hover {
    background-color: aliceblue;
  }
`;

const MessageTo = styled.div`
  width: 100%;
  padding-bottom: 0.3rem;
  padding-left: 0.3rem;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MessageName = styled.div`
  width: 100%;
  border-bottom: 1px solid #eee;
  padding-left: 0.3rem;
  padding-bottom: 0.3rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MessageContentBox = styled.div`
  width: 100%;
  height: 100%;
  line-break: normal;
  text-overflow: ellipsis;
  background-color: #eee;
  border-radius: 6px;
  line-height: 1.36;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const MessageContent = styled.div`
  height: 100%;
  padding: 0.1rem 0.3rem;
`;

export {
  MessageGridContainer,
  MessageBox,
  MessageTo,
  MessageName,
  MessageContentBox,
  MessageContent,
}