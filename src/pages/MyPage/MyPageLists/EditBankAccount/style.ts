import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    align-items: center;
`;
export const BankListWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 16px;
    padding-bottom: 120px;
`;
export const BankAccountInfo = styled.div`
    width: 90%;
    height: 75px;
    display: flex;
    border-radius: 12px;
    flex-direction: column;
    margin-bottom: 16px;
    padding-left: 16px;
    padding: 12px 0 8px 16px;
    background-color: #f5f6f8;
    justify-content: center;
    box-sizing: border-box;
`;
export const BankLogo = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #f5f6f8;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-right: 8px;
`;
export const BankName = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%;
`;

export const BankAccountNumber = styled.div`
    color: var(--Gray-Text-1, #9a9a9a);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%;
`;

export const BankInfoTop = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: cetner;
    width: 100%;
    margin-bottom: 6px;
    box-sizing: border-box;
`;
