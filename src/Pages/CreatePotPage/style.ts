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
  font-family: Pretendard;
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
  color: #343434;
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
  font-size: 18px;
  margin-top: 10px;
  font-family: Pretendard;
  outline: none;
  font-style: normal;
  line-height: 28.26px;
  color: var(--Gray-Text-3, #343434);

  &::placeholder {
    color: var(--placeholder-color, #9a9a9a);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 25.12px;
  }
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  bottom: 0;

  /* width: 100vw; */
  padding: 37px 25px 28px 25px;
  /* border-top : 1px soild #fbfbfb; */
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Description = styled.div`
  font-size: 14px;
  font-family: Pretendard;
  color: #9a9a9a;
  font-weight: 500;
  lineheight: 21.98;
`;
export const BottomTitle = styled.div`
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 700;
  color: black;
  lineheight: 28.26;
  margin-bottom: 10px;
`;

export const PayBox = styled.div`
  width: ${window.innerWidth - 55}px;
  height: 84px;
  align-self: center;
  background: #f5f6f8;
  border-radius: 12px;
  flex-shrink: 0;
  margin: 0 auto;
`;

export const PayBoxTitle = styled.div`
  text-align: center;
  color: #343434;
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 700;
  padding-top: 20px;
`;

export const PayBoxDescription = styled.div`
  text-align: center;
  color: #343434;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 700;
`;

export const Subtitle = styled.div`
  color: black;
  font-size: 18;
  font-family: Pretendard;
  font-weight: 700;
  padding-bottom: 23px;
`;

export const InputDescriptionWrapper = styled.div`
  position: relative;
`;

export const InputDescription = styled.textarea`
  width: ${window.innerWidth - 140}px;
  height: 100px;
  align-self: center;
  flex-shrink: 0;
  border-radius: 12px;
  background: #f5f6f8;
  border: none;
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 500;
  word-wrap: break-word;
  white-space: pre-wrap;
  outline: none;
  margin: 0 auto;
  padding: 22px 61px 30px 28px;
  display: flex;
  justify-content: center;
  &::placeholder {
    color: #9a9a9a;
    font-family: Pretendard;
    font-size: 14;
    white-space: pre-line;
    line-height: 1.8;
    font-weight: 500;
  }
`;

export const NoteDescription = styled.div`
  color:#9A9A9A;
  font-size:14;
  font-family:Pretendard;
  font-weight:500,
  line-height:21.98;
  word-wrap:break-word;
`;

export const NoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 128px;
`;

export const CharacterCount = styled.div`
  color: #9a9a9a;
  position: absolute;
  right: 30px;
  bottom: 16px;
  font-size: 12px;
`;

export const CompleteNote = styled.div`
  color: #9a9a9a;
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 500;
  margin-top: 45px;
  text-align: center;
`;

export const CompleteWrapper = styled.div`
  text-align: center;
`;

export const SelectedInfo = styled.div`
  color: var(--Gray-Text-3, #343434);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 157%; /* 25.12px */
`;
