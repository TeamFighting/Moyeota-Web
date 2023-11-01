import DetailHeader from "../DetailPage/DetailHeader";
import { ContentDetail, Title } from "../DetailPage/style";
import styled from "styled-components";
import { HEADER_HEIGHT } from "../../Constants/constant";
import { DeleteButton } from "../../assets/svg";
import { Icon } from "../CreatePotPage/style";

function QuickMatch() {
  return (
    <div>
      <DetailHeader />
      <Container>
        <Discription>
          <Title>
            어디로 <br />
            떠날까요?
          </Title>
          <ContentDetail>출발시간 및 도착지를 입력해주세요</ContentDetail>
        </Discription>
        <Inputs>
          <Text>출발시간</Text>
          <Wrapper>
            <StyledInput placeholder="예) 오전 11시" />
            <Icon
              style={{
                zIndex: 100,
                marginTop: "15px",
                marginLeft: "-30px",
              }}
            >
              {" "}
              <DeleteButton
                style={{ width: "18px", zIndex: 100, position: "absolute" }}
              />
            </Icon>
          </Wrapper>

          <Text>도착지</Text>
          <Wrapper>
            <StyledInput placeholder="예) 모여타역 모여타선"></StyledInput>
            <Icon
              style={{
                zIndex: 100,
                marginTop: "15px",
                marginLeft: "-30px",
              }}
            >
              <DeleteButton
                style={{
                  width: "18px",
                }}
              />
            </Icon>
          </Wrapper>
        </Inputs>

        <Submit>완료</Submit>
      </Container>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Submit = styled.button`
  width: 335px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--Green-Button, #1edd81);
  border: none;
  color: #fff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.54px;
  justify-self: center;
  align-self: center;
  position: fixed;
  bottom: 0;
  margin-bottom: 40px;
`;
const Text = styled.div`
  color: var(--Gray-Text-3, #343434);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 157%; /* 25.12px */
  margin-bottom: 8px;
  white-space: nowrap;
`;
const Discription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 25px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: ${HEADER_HEIGHT + 9}px;
  gap: 57px;
`;

const Inputs = styled.div`
  margin: 0 5% 0 5%;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  width: 95%;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #f5f6f8;
  border: none;
  padding-left: 14px;
  margin-bottom: 34px;
`;

export default QuickMatch;
