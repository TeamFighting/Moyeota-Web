import styled from "styled-components";
import { useEffect } from "react";
import { HEADER_HEIGHT } from "../../Constants/constant";
import axios from "axios";
import useStore from "../../zustand/store/ContentStore";
import LocationHeader from "./LocationHeader";
import BottomSheet from "./Components/BottomSheet";
import { Chevronleft } from "../../assets/svg";
import { useNavigate } from "react-router-dom";
import SvgRefreshButton from "../../assets/svg/RefreshButton";
import SvgBacktoCurrentButton from "../../assets/svg/BacktoCurrentButton";
import { Icon } from "../DetailPage/style";
import NaverMap from "./NaverMap/NaverMap";
import useCurrentLocation from "./Kakaomap/CurrentLocation";

function MainPage() {
  const { updateTotalData } = useStore((state) => state);
  const navigate = useNavigate();

  useCurrentLocation();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get("http://moyeota.shop/api/posts?page=0");
      // console.log(res);
      if (res.status === 200) {
        updateTotalData(res.data.data.content);
        console.log(res.data.data.content);
      } else {
        alert(res.status + "에러");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const navigateToCreatePot = () => {
    navigate("/createPotPage");
  };

  const refresh = () => {
    console.log("refresh");
  };

  const goCurrent = () => {
    console.log("goCurrent");
  };

  return (
    <Container>
      <Header>
        <Chevronleft width={24} height={24} />
        <LocationHeader />
      </Header>
      <Body>
        <Icons>
          <Icon onClick={refresh}>
            <SvgRefreshButton
              style={{
                width: "48px",
                height: "48px",
              }}
            />
          </Icon>
          <Icon onClick={goCurrent}>
            <SvgBacktoCurrentButton
              style={{
                width: "48px",
                height: "48px",
              }}
            />
          </Icon>
        </Icons>
        {/* <Kakaomap mapRef={mapRef} /> */}
        <NaverMap />
        <Bottom>
          <BottomSheet />
          <Buttons>
            <CreatePotButton onClick={() => navigate("/quickMatch")}>
              빠른매칭
            </CreatePotButton>
            <CreatePotButton onClick={navigateToCreatePot}>
              팟 만들기
            </CreatePotButton>
          </Buttons>
        </Bottom>
      </Body>
    </Container>
  );
}

const Icons = styled.div`
  z-index: 10;
  position: absolute;
  top: 58%;
  right: 1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
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

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 15%;
  right: 7%;
  width: 114px;
  height: 100px;
  background-color: black;
  gap: 10px;
`;

const CreatePotButton = styled.button`
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
  right: 7%;
  box-shadow: 0px 4px 4px rgba(171, 171, 171, 0.25);
`;

export default MainPage;
