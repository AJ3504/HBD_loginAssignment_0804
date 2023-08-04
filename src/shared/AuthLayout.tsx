import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const AuthLayout = () => {
  // 상단 hooks
  const navigate = useNavigate();
  // useEffect(() => {
  //   // localStorage의 토큰 & 이메일 검색
  //   localStorage.getItem("token", token)
  //   localStorage.getItem("email", email)
  //   // TODO: 토큰 또는 이메일 중 하나라도 없을 경우 "토큰 또는 이메일이 없습니다. 로그인해주세요." alert
  //   if (!token || !email) {
  //     alert("nope");
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("email");
  //   }
  //   // TODO: localStorage에 있는 token, email을 제거
  //   // TODO: "/auth"로 이동
  //   navigate("/auth");
  // }, [navigate]);
  const handleLogoutButtonClick = () => {
    const isConfirmed = window.confirm("진짜 로그아웃?");

    if (isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      alert("로그아웃 완료");
      navigate("/auth");
    } else {
      alert("취소되었습니다");
    }
  };
  return (
    <>
      <StyledHeaderBox>
        <Button onClick={handleLogoutButtonClick}>로그아웃</Button>
      </StyledHeaderBox>
      <Outlet />
    </>
  );
};

export default AuthLayout;

const StyledHeaderBox = styled.div`
  display: flex;
  justify-content: right;
  padding: 10px;
`;
