import styled from "styled-components";
import { useRef } from "react";
import { HEADER_HEIGHT } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import CheveronLeft from "../../../../assets/svg/Chevronleft";
import My_location from "../../../../assets/svg/My_location";

function SearchResults() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/DestinationPage");
  };

  return (
    <Container>
      <Header>
        <Icon onClick={goBack}>
          <CheveronLeft width="24" height="24" />
        </Icon>
      </Header>
      <InputStyle
        type="text"
        placeholder="찾고 싶은 장소나 주소를 입력하세요"
      />
      <My_location
        style={{
          width: 18,
          height: 18,
          zIndex: 1,
          position: "absolute",
          right: "35px",
          top: "80px",
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: scroll;
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

export default SearchResults;
