import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
`;
export const Title = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

export const SubTitle = styled.div`
    color: var(--Gray-Text-2, #7e7e7e);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 21.98px */
    margin-top: 16px;
    margin-left: 16px;
`;

export const RadioButtonWrap = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 25.12px */
    margin-top: 20px;
    gap: 30px;
    margin-left: 16px;
    margin-bottom: 14px;
`;

export const BirthInputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 25.12px */
    border-radius: 12px;
    background: #f5f6f8;
    width: 90%;
    height: 48px;
    flex-shrink: 0;
    padding: 0 10px;
    height: 48px;
    box-sizing: border-box;
`;
export const Input = styled.input`
    text-align: end;
    background: none;
    border: none;
    width: 28px;
    background-color: none;
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 25.12px */
    &:focus {
        outline: none;
    }
`;

export const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;
`;
