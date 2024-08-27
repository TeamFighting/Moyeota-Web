import styled from 'styled-components';

export const ModifyNicknameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;
export const BodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
export const BodyExplain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    gap: 16px;
`;
export const Title = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

export const Text = styled.div`
    color: var(--Gray-Text-1, #9a9a9a);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 25.12px */
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    gap: 16px;
    margin-top: 32px;
`;

export const Icon = styled.div`
    display: flex;
    border-radius: 50%;
    border: 8px solid #f5f6f8;
`;

export const Tags = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

export const Tag = styled.div`
    height: 20px;
    color: #7e7e7e;
    font-family: Pretendard;
    color: var(--Gray-Text-2, #7e7e7e);
    border-radius: 4px;
    background: var(--Gray-Icon-Solid, #f5f6f8);
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: 157%; /* 15.7px */
    padding: 2px 6px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledInputWrapper = styled.div`
    width: 85%;
    height: 48px;
    border-radius: 8px;
    background: #f5f6f8;
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
`;

export const StyledInput = styled.input`
    border: none;
    background: none;
    width: 100%;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 25.12px */
    color: #000;

    &:focus {
        outline: none;
    }
`;

export const ButtonWrapper = styled.div`
    width: 85%;
    height: 48px;
    margin-top: 32px;
    border-radius: 12px;
    background: var(--Green-Button, #1edd81);
    color: #fff;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.54px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 16px;
    cursor: pointer;
    &:active {
        filter: brightness(0.9);
    }
`;
