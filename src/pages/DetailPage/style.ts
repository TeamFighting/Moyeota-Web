import { HEADER_HEIGHT } from '@constants';
import styled from 'styled-components';

export const PartyoneText = styled.div`
    color: var(--Gray-Text-1, #9a9a9a);
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 21.98px */
    align-items: center;
    justify-content: center;
    margin-top: 47px;
    background-color: none;
`;

export const PartyOne = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const Icon = styled.div`
    cursor: pointer;
    align-self: flex-start;
`;

export const Description = styled.div`
    align-self: center;
    height: fit-content;
    flex-shrink: 0;
    border-radius: 12px;
    margin: 13px 20px 0 20px;
    background: var(--Gray-Icon-Solid, #f5f6f8);
    display: flex;
    padding: 15px 20px 15px 20px;
    font-family: pretendard;
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 156%; /* 24.96px */
    width: ${window.innerWidth * 0.8}px;
`;

export const Name = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 157%; /* 25.12px */
    margin-right: 7px;
`;

export const Leader = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 28.26px */
    margin-top: 32px;
    margin-left: 28px;
    margin-bottom: 13px;
`;

export const Party = styled.div`
    min-height: 74.3vh;
    height: 810px;
    display: flex;
    flex-direction: column;
`;

export const TextDescription = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    margin-top: 28px;
`;

export const GateringTag = styled.div<{ isFull: boolean }>`
    border-radius: 4px;
    border: 1px solid #ebebeb;
    background-color: #ffffff;
    width: 74px;
    height: 25px;
    flex-shrink: 0;
    color: ${({ isFull }) => (isFull ? '#ff0000' : '#139b59')};
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 18.84px */
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Staus = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Tags = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
`;

export const Tag = styled.div`
    font-size: 10px;
    font-weight: 600;
    color: #7e7e7e;
    display: flex;
    margin-right: 9px;
    border-radius: 4px;
    background-color: #f5f6f8;
    padding: 2px 4px;
`;

export const DescriptionTag = styled.div``;

export const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    bottom: 0;
    padding: 37px 25px 28px 25px;
`;

export const Text = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 3px;
    padding-left: 7px;
`;

export const StartPoint = styled.div`
    color: var(--Gray-Text-1, #9a9a9a);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
`;

export const StartPointLocation = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    flex-direction: column;
`;

export const From = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-right: 10px;
    justify-content: space-between;
`;

export const Route = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding-bottom: 18px;
`;

export const Explanation = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const MapSample = styled.div`
    display: flex;
    flex-direction: column;
    height: 130px;
    width: 100%;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100dvw;
    height: 100dvh;
    overflow: scroll;
`;

export const Content = styled.div`
    padding-top: 17px;
    display: flex;
    flex-direction: column;
    gap: 47px;
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

export const ContentDetail = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--Gray-Text-1, #9a9a9a);
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
`;

export const Body = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: ${HEADER_HEIGHT}px;
    margin: 0 25px;
    height: 603px;
`;

export const Profile = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 86px;
    width: 100%;
`;
