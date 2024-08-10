import styled from 'styled-components';
export const Title = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 28.26px */
    background-color: white;
    width: 90%;
    margin-left: 5px;
    margin-top: 32px;
`;

export const SubTitle = styled.div`
    color: var(--Gray-Text-2, #7e7e7e);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 21.98px */
`;

export const Info = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 28.26px */
`;

export const BasicInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 88%;
    padding-left: 20px;
    background-color: white;
    gap: 36px;
`;

export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;
export const ManageAccountWrapper = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    background-color: white;
    justify-content: center;
    align-items: center;
    margin-bottom: 36px;
`;

export const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #9a9a9a;
`;

export const ManageAccount = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: white;
    justify-content: center;
    align-items: center;
`;
export const EmailInput = styled.input`
    border-radius: 12px;
    width: 90%;
    height: 40px;
    background: #f5f6f8;
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 28.26px */
    &:focus {
        outline: none;
        background-size: 100% 2px;
        border: none;
    }
    border: none;
    margin-left: 16px;
`;

export const BTN = styled.div`
    color: var(--Gray-Button-Text, #5d5d5d);
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.54px;
    border-radius: 12px;
    background: var(--Gray-Icon-Solid, #f5f6f8);
    height: 48px;
    width: 335px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
