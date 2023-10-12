import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: scroll;
`;

export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 4px;
  margin: 0 25px;
  height: 603px;
`;

export const Content = styled.div`
  padding-top: 17px;
  display: flex;
  flex-direction: column;
  gap: 47px;
`;

export const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
`;
export const MapSample = styled.img``;

export const Route = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding-bottom: 18px;
`;
export const From = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-right: 10px;
  justify-content: space-between;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3px;
  padding-left: 7px;
`;
export const StartPointLocation = styled.div`
  color: var(--Gray-Text-3, #343434);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  flex-direction: column;
`;
export const StartPoint = styled.div`
  color: var(--Gray-Text-1, #9a9a9a);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;
export const Icon = styled.div`
  cursor: pointer;
  align-self: flex-start;
`;

export const InputStyle = styled.input`
  border: none;
  border-bottom: 2px #e0e0e0 solid;
  padding: 8px;
  border-radius: 4px;
  width: 95%;
  font-size: 16px;
  margin-top: 10px;
  font-family: Pretendard;
`;
