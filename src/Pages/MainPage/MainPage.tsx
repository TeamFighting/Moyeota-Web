import styled from "styled-components";
import Kakaomap from "./Kakaomap/Kakaomap";
import { useEffect, useRef } from "react";
import { HEADER_HEIGHT } from "../../Constants/constant";
import axios from "axios";
import useStore from "../../zustand/store/ContentStore";
import LocationHeader from "./LocationHeader";
import BottomSheet from "./Components/BottomSheet";
import { Chevronleft } from "../../assets/svg";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const mapRef = useRef<HTMLElement | null>(null);
  const { updateTotalData } = useStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get("http://moyeota.shop/api/posts?page=0");
      if (res.status === 200) {
        updateTotalData(res.data.data.content);
      } else {
        alert(res.status + "에러");
      }
    } catch (e) {
      // alert('서버와의 통신에 실패했습니다.');
      console.log(e);
    }
  }

  const navigateToCreatePot = () => {
    navigate("/createPotPage");
  };

  return (
    <Container>
      <Header>
        <Chevronleft width={24} height={24} />
        <LocationHeader />
      </Header>
      <Body>
        <Kakaomap mapRef={mapRef} />
        <Bottom>
          <BottomSheet />
          <CreatePodButton onClick={navigateToCreatePot}>
            팟 만들기
          </CreatePodButton>
        </Bottom>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Header = styled.div`
  height: ${HEADER_HEIGHT}px;
  position: sticky;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 4%;
  z-index: 1000000;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 258px;
`;

const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
`;

const CreatePodButton = styled.button`
  background-color: #1edd81;
  color: #fff;
  font-size: 16px;
  padding: 12px;
  text-align: center;
  border: none;
  cursor: pointer;
  z-index: 1000001;
  font-family: pretendard;
  font-style: normal;
  font-weight: 800;
  width: 114px;
  height: 48px;
  border-radius: 24px;
  margin-left: 241px;
  margin-top: 178px;
  box-shadow: 0px 4px 4px rgba(171, 171, 171, 0.25);
`;

export default MainPage;