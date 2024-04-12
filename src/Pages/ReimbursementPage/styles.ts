import styled from 'styled-components';

export const PotOwner = styled.div`
    width: 22px;
    height: 22px;
    white-space: nowrap;
    border-radius: 50%;
    background-color: #5d5d5d;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-family: Pretendard;
    font-weight: 700;
`;

export const MoneyLeft = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
`;
export const MoneyRight = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
`;
export const EachMoney = styled.div<{ isMyPayment: boolean }>`
    color: var(--Gray-Text-3, #343434);
    text-align: right;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: ${(props) => (props.isMyPayment ? 700 : 400)};
    line-height: normal;
    text-decoration-line: underline;
`;
export const PartyOneRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: space-between;
`;
export const PartyOneImage = styled.img`
    object-fit: cover;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid white;
`;
export const PartyOneName = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 25.12px */
`;
export const Content = styled.div`
    margin-top: 15px;
    color: var(--Gray-Text-1, #9a9a9a);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 25.12px */
`;
export const Money = styled.div`
    margin: 20px 19px;
    padding: 19px 20px;
    width: width;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #f5f6f8;
    border-radius: 12px;
`;
export const MoneyInput = styled.input<{ inputName?: string }>`
    width: 100%;
    height: 50px;
    border: none;
    background-color: transparent;
    color: ${(props) => (props.inputName === 'default' ? '#9A9A9A' : '#343434')};
    font-family: Pretendard;
    font-size: ${(props) => (props.inputName === 'default' ? '24px' : '32px')};
    font-style: normal;
    font-weight: ${(props) => (props.inputName === 'default' ? '500' : '700')};
    line-height: 157%;
    &:focus {
        outline: none;
    }
`;
export const MoneyText = styled.div`
    color: #9a9a9a;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 18.84px */
`;

export const PartyText = styled.div`
    margin-top: 32px;
    color: var(--Gray-Text-2, #7e7e7e);
    font-family: Pretendard;
    font-size: 14px;
    gap: 8px;
    font-style: normal;
    font-weight: 500;
    display: flex;
    flex-direction: row;
`;

export const PartyOne = styled.div`
    margin-top: 16px;
    gap: 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
`;
export const Icon = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #9a9a9a;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Title = styled.div`
    font-size: 22px;
    font-weight: 700;
    font-family: Pretendard;
`;
