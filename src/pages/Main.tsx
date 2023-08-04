import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import axios from "axios";
import Logout from "../components/auth/Logout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";

const Main: React.FC<any> = () => {
  // 상단 hooks
  const [data, setData] = useState([]);
  const [contents, setContents] = useState<string>("");
  const isLogin = useSelector((state: RootState) => state.users.isLogin);

  // functions & Event Handler
  const fetchData = async () => {
    try {
      // 데이터베이스에서 boards 리스트 가져오기
      const response = await axios.get("http://localhost:4000/boards");
      // 가져온 결과 배열을 data state에 set
      setData(response.data);
    } catch (error) {
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
      return false;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBoardSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // post요청 등록
      await axios.post("http://localhost:4000/boards", {
        email: localStorage.getItem("email"),
        contents,
        isDeleted: false,
      });
      alert("방명록 작성 완료!");
      // 새로고침
      window.location.reload();
    } catch (error) {
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
      return false;
    }
  };

  const handleInputChange = (e: any) => {
    setContents(e.target.value);
  };

  return (
    <>
      {/* 로그아웃 */}
      {isLogin ? <>로그아웃되었습니다</> : <Logout />}
      {/* 방명록 */}
      <MainWrapper>
        <h1>메인 리스트 페이지</h1>
        <StyledForm onSubmit={handleBoardSubmit}>
          <StyledInput
            placeholder="방명록을 입력해주세요."
            value={contents}
            onChange={handleInputChange}
          />
        </StyledForm>
        <ListWrapper>
          {data.map((item: any, index) => (
            <ListItem key={item.id}>
              <span>
                {index + 1}. {item.contents}
              </span>
              {/* 로그인 한 user의 이메일(로컬스토리지의 email)과 일치하는 경우에만 삭제버튼 보이도록 제어 */}
              {item.email === localStorage.getItem("email") && (
                <Button>삭제</Button>
              )}
            </ListItem>
          ))}
        </ListWrapper>
      </MainWrapper>
    </>
  );
};

export default Main;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListWrapper = styled.div`
  width: 50%;
  padding: 10px;
`;

const ListItem = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled(Input)`
  width: 50%;
`;

const StyledForm = styled.form`
  width: 100%;
  text-align: center;
`;
