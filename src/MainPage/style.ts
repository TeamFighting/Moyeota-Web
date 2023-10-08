import styled from 'styled-components';

export const ModalContent = styled.div`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-family: Pretendard;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: center;
  gap: 20px;
  padding-top: 20px;
  scroll-behavior: smooth;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

export const ContentHeader = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  gap: 50%;
  width: 100vw;
  position: sticky;
  background-color: white;
  margin-bottom: 17px;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 5px;
`;

export const HeaderP = styled.span`
  color: #7e7e7e;
  font-family: pretendard;
  font-size: 14px;
  margin-left: 3px;
  display: flex;
  align-self: center;
  justify-content: center;
  margin-top: 1px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const SingleContent = styled.div`
  border-radius: 12px;
  display: flex;
  border: 2px solid #ebebeb;
  flex-direction: column;
  width: 335px;
  height: 200px;
`;

export const ContentTitle = styled.span`
  color: #343434;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  width: 100%;
  margin-left: 16px;
  margin-bottom: 10px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */
  margin-left: 20px;
  gap: 6px;
`;

export const Route = styled.div`
  display: flex;
  flex-direction: columnn;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;

export const From = styled.span`
  color: #343434;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: #7e7e7e;
`;
export const To = styled.span`
  color: #343434;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: #7e7e7e;
`;

export const Time = styled.span`
  color: #343434;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin-left: 2.5px;
  color: #7e7e7e;
`;
export const StartTime = styled.span`
  color: #343434;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  justify-content: flex-start;
  font-weight: 500;
  margin-left: 7px;
  color: #7e7e7e;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  margin-top: 15px;
  margin-left: 16px;
`;

export const ProfileLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
export const ProfileImg = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: black;
`;

export const ProfileName = styled.span`
  color: #9a9a9a;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
`;
export const ProfileSex = styled.span`
  color: #9a9a9a;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
`;
export const Dot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: #9a9a9a;
`;
export const ProfileTime = styled.span`
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  font-weight: 500;
  color: #9a9a9a;
`;
export const ProfileRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
export const ProfileDistance = styled.span`
  color: #9a9a9a;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  margin-right: 15px;
`;
export const Line = styled.div`
  width: 304px;
  height: 1px;
  background-color: #ebebeb;
  margin-top: 14px;
  /* margin-top: 100px; */
  align-self: center;
`;
