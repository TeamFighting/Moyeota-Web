import styled from "styled-components";
import NaverMap from "./NaverMap/NaverMap";
import { Chevronleft } from "../../../../assets/svg";
import { HEADER_HEIGHT } from "../../../../Constants/constant";
import { useNavigate, useLocation } from "react-router-dom";
import BottomSheet from "./BottomSheet";
import DestinationButton from "../Button/DestinationButtom";

function DestinationPage() {
  const navigate = useNavigate();
  const goToSearchResults = () => {
    navigate("/searchResults");
  };
  const location = useLocation();
  const destination = (new URLSearchParams(location.search).get(
    "destination"
  ) || undefined) as string | undefined;

  return (
    <Container>
      <Header>
        <InputStyle
          type="text"
          placeholder="도착지를 검색해보세요"
          onClick={goToSearchResults}
          value={destination || ""}
          readOnly
        />
        <Chevronleft
          style={{
            width: 24,
            height: 24,
            zIndex: 1,
            position: "absolute",
            paddingLeft: 30,
            paddingTop: 1,
          }}
        />
      </Header>
      <Body>
        <NaverMap destination={destination} />
        <Bottom>
          <BottomSheet destination={destination} />
          <DestinationButton />
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
  background-color: transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1000000;
  position: fixed;
  top: 19px;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
`;

const InputStyle = styled.input`
  background-color: #ffffff;
  border-radius: 12px;
  width: calc(100% - 90px);
  height: 48px;
  flex-shrink: 0;
  margin: 0 auto;
  padding: 0px 20px;

  border: none;
  outline: none;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21.98px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  padding-left: 43px;

  &::placeholder {
    color: var(--Gray-Text-1, #9a9a9a);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 21.98px;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 258px;
  z-index: 999;
`;

const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
`;

export default DestinationPage;
