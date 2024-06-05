import styled from 'styled-components';
export const Header = styled.div`
    display: flex;
    width: 100%;
    height: 84px;
    justify-content: center;
    align-items: center;
    border-bottom: 9px solid #f5f6f8;
`;

export const HeaderText = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

export const ProfileWrapper = styled.div`
    width: 100%;
    height: 104px;
    display: flex;
    flex-direction: row;
    margin-left: 20px;
    margin-top: 32px;
    gap: 14px;
`;

export const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #f5f6f8;
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 8px;
    height: 60px;
    justify-content: center;
    background-color: #fff;
`;

export const ProfileName = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    white-space: nowrap;
`;
export const ProfileNameRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

export const Tags = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

export const Tag = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0px 4px;
    height: 20px;
    border-radius: 4px;
    background-color: #f5f6f8;
    color: var(--Gray-Text-2, #7e7e7e);
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: 157%; /* 15.7px */
`;
