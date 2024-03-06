import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../Constants/constant';

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: ${HEADER_HEIGHT}px;
    justify-content: space-between;
    text-align: center;
    position: fixed;
    top: 0;
    background-color: white;
    width: 92%;
    padding-right: 4%;
    padding-left: 4%;
    border-bottom: 6px solid #f5f6f8;
`;
export const Icon = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const Body = styled.div`
    height: calc(100vh - ${HEADER_HEIGHT}px - 100);
    padding-top: ${HEADER_HEIGHT + 20}px;
    padding-bottom: 100px;
    overflow-y: scroll;
    width: 100vw;
    flex-direction: column;
    display: flex;
`;
export const TimeWrapper = styled.div`
    gap: 8px;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: fit-content;
    margin-right: 25px;
    margin-bottom: 10px;
    margin-left: 16px;
`;
export const Time = styled.div`
    font-size: 10px;
    color: var(--Gray-Text-3, #7e7e7e);
    height: 100%;
    vertical-align: bottom;
    display: flex;
    align-items: end;
    white-space: nowrap;
`;
export const MyMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-right: 16px;
    margin-left: 9px;
    padding: 10px 16px;
    border-radius: 99px;
    height: fit-content;
    width: fit-content;
    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 21.98px */
    background: var(--Gray-Button, #f1f1f1);
`;
export const YourMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px 16px;
    margin-left: 9px;
    border-radius: 99px;
    background: #1edd81;
    height: fit-content;
    width: fit-content;
    color: #fff;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 21.98px */
`;
export const Profile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    border: 2.56px solid #f5f6f8;
    object-fit: cover;
    overflow: hidden;
`;
export const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
export const ProfileName = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 25.12px */
    letter-spacing: -0.54px;
    text-align: center;
    margin-top: 14px;
`;
export const Title = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%;
`;
export const Description = styled.div`
    color: var(--Gray-Text-2, #7e7e7e);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 21.98px */
    margin-top: 10px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;
export const Bottom = styled.div`
    position: fixed;
    display: flex;
    bottom: 0;
    height: 100px;
    width: 100vw;
    align-items: center;
    background-color: white;
`;
export const InputWrapper = styled.div`
    margin: 0 20px;
    width: calc(100% - 40px);
    box-sizing: border-box;
    border: 2px solid #f5f6f8;
    border-radius: 99px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
`;
export const StyledInput = styled.input`
    background-color: #5d5d5d;
    width: 100%;
    height: 42px;
    border: none;
    outline: none;
    font-size: 18px;
    margin: 0 30px;
    box-sizing: border-box;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.54px;
    color: #5d5d5d;
    background-color: white;
`;
