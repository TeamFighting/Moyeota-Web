import styled from "styled-components";
import Kakaomap from "../../../MainPage/Kakaomap/Kakaomap";
import { Chevronleft } from "../../../../assets/svg";
import { useRef } from "react";
import { HEADER_HEIGHT } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";

function DestinationPage() {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLElement | null>(null);
  const goBack = () => {
    navigate("/createPotPage");
  };
  return (
    <Container>
      <Header>
        <Chevronleft width={24} height={24} onClick={goBack} />
      </Header>
      <Body>
        <Kakaomap mapRef={mapRef} />
        <Bottom></Bottom>
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
  position: absolute;
  bottom: 15%;
  right: 7%;

  box-shadow: 0px 4px 4px rgba(171, 171, 171, 0.25);
`;

export default DestinationPage;
