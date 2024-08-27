import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 20px;
    margin-top: 21px;
`;

export const Explanation = styled.div`
    color: #9a9a9a;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 25.12px */
    margin-top: 15px;
    margin-left: 20px;
    margin-bottom: 24px;
`;

export const LoginButtons = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-color: white;
`;
export const LoginSection = styled.div`
    width: 100%;
    height: 580px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    align-items: center;
    justify-content: center;
`;
export const LoginExplanation = styled.div`
    color: var(--Gray-Text-1, #9a9a9a);
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    margin-top: 20px;
`;
export const Icon = styled.div`
    height: 20px;
    width: 300px;
`;
