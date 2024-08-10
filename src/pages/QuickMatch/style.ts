import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../constants';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;
export const Submit = styled.button`
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
export const Text = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 25.12px */
    margin-bottom: 8px;
    white-space: nowrap;
`;
export const Discription = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 25px;
`;
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-top: ${HEADER_HEIGHT + 9}px;
    gap: 57px;
`;

export const Inputs = styled.div`
    margin: 0 5% 0 5%;
    display: flex;
    flex-direction: column;
`;

export const StyledInput = styled.input`
    width: 95%;
    height: 48px;
    flex-shrink: 0;
    border-radius: 12px;
    background: #f5f6f8;
    border: none;
    padding-left: 14px;
    margin-bottom: 34px;
`;
