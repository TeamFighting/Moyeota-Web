import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function CreatePotButton() {
  const navigate = useNavigate();

  const createPost = async () => {
    try {
      const token = import.meta.env.VITE_AUTH_BEARER_TOKEN;
      const response = await fetch("http://moyeota.shop:80/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: "LIFE",
          content: "같이 갈 사람 참가 신청 ㄱㄱ",
          createdDate: "2023-11-06T14:17:41.502Z",
          departure: "공릉역 7호선",
          departureTime: "2023-11-06T14:17:41.502Z",
          destination: "서울과학기술대학교 어의관",
          distance: 0.5,
          duration: 313,
          fare: 5200,
          modifiedDate: "2023-11-06T14:17:41.502Z",
          numberOfRecruitment: 4,
          sameGenderStatus: "YES",
          title: "공릉역에서 어의관 갈사람?",
          vehicle: "일반",
        }),
      });

      const data = await response.json();
      console.log("responseData", data);

      if (data.status === "SUCCESS") {
        navigate("/createComplete");
        console.log("res", response);
      } else {
        alert("실패");
        console.error("API 요청 실패");
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <Wrapper>
      <Button type="button" onClick={createPost}>
        팟 생성 완료
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 128px;
  background-color: white;
  bottom: 0;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Button = styled.button`
  width: 335px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--Green-Button, #1edd81);
  border: none;
  font-size: 16px;
  color: white;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.54px;
`;

export default CreatePotButton;
