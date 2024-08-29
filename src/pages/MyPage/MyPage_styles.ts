import { BOTTOM_NAV_HEIGHT, HEADER_HEIGHT, WINDOW_HEIGHT } from '@constants/index';
import styled from 'styled-components';
export const Header = styled.div`
    display: flex;
    width: 100%;
    height: 84px;
    justify-content: center;
    align-items: center;
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
    height: 94px;
    display: flex;
    flex-direction: row;
    padding-left: 20px;
    padding-top: 32px;
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

export const FavoritePotWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const FavoritePot = styled.div`
    border-radius: 12px;
    background: var(--Gray-Icon-Solid, #f5f6f8);
    width: 90%;
    height: 75px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    align-items: center;
    flex-direction: column;
    gap: 6px;
`;

export const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 32px;
    align-items: center;
    padding-top: 16px;
    height: 100%;
    /* height: ${WINDOW_HEIGHT - HEADER_HEIGHT - BOTTOM_NAV_HEIGHT}px; */
    overflow-y: scroll;
`;
export const List = styled.div`
    display: flex;
    flex-direction: row;
    width: 90%;
    background-color: white;
    justify-content: space-between;
    align-items: center;
    text-align: center;
`;

export const ListLeft = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
`;
export const ListText = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    white-space: nowrap;
`;
