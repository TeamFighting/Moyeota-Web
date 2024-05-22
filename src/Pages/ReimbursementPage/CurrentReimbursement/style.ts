import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;
    justify-content: center;
    background-color: #f5f6f8;
    padding: 20px;
`;

export const PotName = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 25.12px */
`;

export const TotalAmount = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

export const RequestDate = styled.div`
    color: var(--Gray-Text-2, #7e7e7e);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 18.84px */
`;

export const Name = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 25.12px */
`;
export const Management = styled.div`
    color: var(--Green-Text, #139b59);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 21.98px */
    text-decoration-line: underline;
`;

export const ManagementWrapper = styled.div`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    gap: 10px;
`;
