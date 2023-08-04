import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Logout from "../components/auth/Logout";

const AuthLayout = () => {
  // 상단 hooks
  const navigate = useNavigate();

  // fetching data
  useEffect(() => {
    // 저장해둔 토큰 & 이메일 가져오기
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    // 둘 중 하나라도 없을 경우
    if (!token || !email) {
      alert("회원가입/로그인해주세요!");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }

    // 토큰과 이메일 제거후, 회원가입/로그인할 수 있도록 "/auth"로 이동
    // navigate("/auth");
  }, [navigate]);

  return (
    <>
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
