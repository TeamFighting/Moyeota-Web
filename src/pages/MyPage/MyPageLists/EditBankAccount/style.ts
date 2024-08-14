import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    align-items: center;
`;

export const BankAccountInfo = styled.div<{ isSelected: boolean }>`
    width: 90%;
    height: 75px;
    display: flex;
    border-radius: 12px;
    background: #f5f6f8;
    margin-bottom: 16px;
    flex-direction: column;
    padding-left: 16px;
    border: 1px solid var(--Green-Button, #f5f6f8);
    border-color: ${(props) => (props.isSelected ? '#1EDD81' : '#f5f6f8')};
    background-color: ${(props) => (props.isSelected ? '#fff' : '#F5F6F8')};
`;
export const BankLogo = styled.image`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #f5f6f8;
    background-color: red;
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
    margin-top: 12px;
    margin-bottom: 6px;
`;
