import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  __editUserData,
  __fetchUserInfo,
  __setUserData,
} from "../../shared/redux/modules/auth";
import { Toast } from "../Login/Login";

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

export default function MyPage() {
  const [userInfo, setUserInfo] = useState();
  const [userImg, setUserImg] = useState(userInfo?.avartar);
  const prevImg = useRef(userImg);
  const dispatch = useDispatch();
  const { user, error, isError, isLoading, avatar, info } = useSelector(
    (state) => state.auth
  );

  const formData = new FormData();

  const onUpload = (e) => {
    const file = e.target.files[0];
    formData.append("nickname", userInfo?.nickname);
    formData.append("avatar", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setUserImg(reader.result); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  const refresh = async () => {
    dispatch(__fetchUserInfo());
    if (error) {
      console.log(error);
    } else {
      console.log(user);
    }
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("info")));
    refresh();
    console.log(info);
    console.log(avatar);
  }, []);

  const onEdit = () => {
    dispatch(__editUserData(formData));
    if (error !== null) {
      console.log(info);
    } else {
      return;
    }
  };

  return (
    <MyPageContainer>
      <MyPageCard>
        <CardTitle>프로필 관리</CardTitle>
        <ImageInput onChange={(e) => onUpload(e)} />
        <CardImg src={userImg} />
        <CardNickname>{userInfo?.nickname}</CardNickname>
        <ButtonBox>
          <EditButton
            onClick={() => onEdit()}
            $prevImg={prevImg.current}
            $userImg={userImg}>
            수정하기
          </EditButton>
        </ButtonBox>
      </MyPageCard>
    </MyPageContainer>
  );
}
