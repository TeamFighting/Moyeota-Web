import styled from "styled-components";
import { HEADER_HEIGHT } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import CheveronLeft from "../../../../assets/svg/Chevronleft";
import My_location from "../../../../assets/svg/My_location";
import MapIcon from "../../../../assets/svg/MapIcon";
import Star from "../../../../assets/svg/Star";
import { useState } from "react";

function SearchResults() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("./DestinationPage");
  };

  const [destination, setDestination] = useState("");

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestination(event.target.value);
  };

  const goTomap = () => {
    if (destination) {
      navigate(`/DestinationPage?destination=${destination}`);
    } else {
      console.log("검색 에러");
    }
  };
  return (
    <Container>
      <Header>
        <Icon onClick={() => goBack}>
          <CheveronLeft width="24" height="24" />
        </Icon>
      </Header>
      <InputStyle
        type="text"
        placeholder="찾고 싶은 장소나 주소를 입력하세요"
        value={destination}
        onChange={handleDestinationChange}
      />
      <My_location
        onClick={goTomap}
        style={{
          width: 18,
          height: 18,
          zIndex: 1,
          position: "absolute",
          right: "35px",
          top: "80px",
        }}
      />
      <Body>
        <Title>최근 검색</Title>
        <Star
          style={{
            width: 8,
            height: 7,
            flexShrink: 0,
            paddingRight: "8px",
            paddingTop: "9px",
          }}
        />
        <Favorite style={{ paddingTop: "2px" }}>즐겨찾기</Favorite>
        <MapIcon
          style={{
            width: 24,
            height: 24,
            flexShrink: 0,
            position: "absolute",
            right: 55,
          }}
        />
      </Body>
      <DividerContainer>
        <Divider />
      </DividerContainer>
      <RecordContainer>
        <Favorite>최근 검색 기록이 없어요</Favorite>
      </RecordContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  height: ${HEADER_HEIGHT}px;
  justify-content: space-between;
  padding: 0 4%;
`;

const Icon = styled.div`
  cursor: pointer;
  align-self: flex-start;
  padding-top: 20px;
`;

const InputStyle = styled.input`
  background-color: #f5f6f8;
  border-radius: 12px;
  width: calc(100% - 80px);
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
  padding-left: 14px;
  &::placeholder {
    color: var(--Gray-Text-1, #9a9a9a);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 21.98px;
  }
`;

const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-left: 23px;
  padding-top: 13px;
`;

const Title = styled.div`
  color: var(--Gray-Text-3, #343434);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 157%; /* 25.12px */
  padding-right: 22px;
`;

const Favorite = styled.div`
  color: var(--Gray-Text-1, #9a9a9a);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 157%; /* 21.98px */
`;

const DividerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const Divider = styled.div`
  width: calc(100% - 50px);
  height: 2px;
  background-color: #e0e0e0;
`;

const RecordContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45vh;
`;

export default SearchResults;
