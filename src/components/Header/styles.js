import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem 3rem;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: #fafafa;
`;

const HeaderTitle = styled.h3`
  font-weight: 600;
  cursor: pointer;
`;

const HeaderBox = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderRegisterBtn = styled.button.attrs((props) => ({
  type: "button",
}))`
  width: fit-content;
  height: fit-content;
  padding: 0.4rem 0.6rem;
  background: #eee;
  color: #1f1f1f;
  font-weight: 800;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background: linear-gradient(#f4f4f7ff, #142e9bff);
    color: white;
  }
`;




export {
  HeaderContainer,
  HeaderTitle,
  HeaderBox,
  HeaderRegisterBtn,
};