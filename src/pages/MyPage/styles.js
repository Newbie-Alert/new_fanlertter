import styled from "styled-components";

const MyPageContainer = styled.div`
  width: 100%;
  padding-top: 4.1rem;
`;

const MyPageCard = styled.div`
  width: 100%;
  max-width: 600px;
  height: 400px;
  border: 1px solid #1d1d1d;
  border-radius: 6px;
  margin: auto;
  margin-top: 6rem;
`;

const CardTitle = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 1.65rem;
  border-bottom: 1px solid #1d1d1d;
  padding: 2rem;
`;

const ImageInput = styled.input.attrs((props) => ({
  type: "file",
  accept: "image/*",
}))`
  width: 100%;
  text-align: center;
  background-color: gray;
`;

const CardImg = styled.img.attrs((props) => ({}))`
  display: block;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: auto;
  margin-block: 1rem;
`;

const CardNickname = styled.div`
  width: 100%;
  margin-block: 1rem;
  font-weight: 600;
  text-align: center;
  font-size: 1.25rem;
`;

const ButtonBox = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 3rem;
`;

const EditButton = styled.button.attrs((props) => ({
  type: "button",
  disabled: props.$prevImg === props.$userImg ? true : false,
}))`
  width: 120px;
  padding: 0.6rem 0.6rem;
  border-radius: 6px;
  background: ${(props) =>
    props.$prevImg === props.$userImg ? "#eee" : "#147ce4"};
  color: ${(props) =>
    props.$prevImg === props.$userImg ? "#1d1d1d" : "white"};
  font-weight: 800;
  border-radius: 6px;
  border: none;
  cursor: ${(props) =>
    props.$prevImg === props.$userImg ? "not-allowed" : "pointer"};
  transition: all 0.3s ease;
`;

export {
  MyPageContainer,
  MyPageCard,
  CardTitle,
  ImageInput,
  CardImg,
  CardNickname,
  ButtonBox,
  EditButton,
}