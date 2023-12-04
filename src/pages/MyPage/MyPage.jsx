import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as St from "./styles";
import {
  __editUserData,
  __fetchUserInfo,
} from "../../shared/redux/modules/auth";

export default function MyPage() {
  const [userInfo, setUserInfo] = useState();
  const [userImg, setUserImg] = useState(userInfo?.avartar);
  const prevImg = useRef(userImg);
  const dispatch = useDispatch();
  const { user, error, info } = useSelector((state) => state.auth);

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
    <St.MyPageContainer>
      <St.MyPageCard>
        <St.CardTitle>프로필 관리</St.CardTitle>
        <St.ImageInput onChange={(e) => onUpload(e)} />
        <St.CardImg src={userImg} />
        <St.CardNickname>{userInfo?.nickname}</St.CardNickname>
        <St.ButtonBox>
          <St.EditButton
            onClick={() => onEdit()}
            $prevImg={prevImg.current}
            $userImg={userImg}>
            수정하기
          </St.EditButton>
        </St.ButtonBox>
      </St.MyPageCard>
    </St.MyPageContainer>
  );
}
