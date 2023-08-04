import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../redux/modules/usersSlice";

const Logout = () => {
  // 상단 hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Event Handler
  const handleLogoutButtonClick = () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");

    if (isConfirmed) {
      // 로그아웃 할 경우, 토큰과 이메일 제거 (dB에는 그대로 남아있음)
      localStorage.removeItem("token");
      localStorage.removeItem("email");

      dispatch(logout);
      alert("로그아웃 완료");

      navigate("/");
    } else {
      alert("취소되었습니다");
    }
  };
  return (
    <>
      <StyledHeaderBox>
        <Button onClick={handleLogoutButtonClick}>로그아웃</Button>
      </StyledHeaderBox>
    </>
  );
};

export default Logout;

const StyledHeaderBox = styled.div`
  display: flex;
  justify-content: right;
  padding: 10px;
`;
