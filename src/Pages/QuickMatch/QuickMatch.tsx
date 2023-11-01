import React from "react";
import DetailHeader from "../DetailPage/DetailHeader";
import { Explanation, Title } from "../DetailPage/style";
import styled from "styled-components";
import { HEADER_HEIGHT } from "../../Constants/constant";

function QuickMatch() {
  return (
    <div>
      <DetailHeader />
      <Container>
        <Title style={{ marginLeft: "25px" }}>
          어디로 <br />
          떠날까요?
        </Title>
        <Detail>출발시간 및 도착지를 입력해주세요</Detail>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  margin-top: ${HEADER_HEIGHT + 9}px;
`;

export default QuickMatch;
