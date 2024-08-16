// import { useEffect, useState } from 'react';
// import instance from '@apis';
import * as S from '../../style';

interface ProfileProps {
    profileImg: string;
    index: number;
    userName: string;
    gender: string;
    ago: string;
    distance: number;
}

function Profile({ profileImg, userName, index, gender, ago, distance }: ProfileProps) {
    return (
        <S.ProfileInfo key={index}>
            <S.ProfileLeft>
                <img src={profileImg} width="24px" height="24px" style={{ borderRadius: '100%' }} />

                <S.ProfileName>{userName}</S.ProfileName>
                <S.ProfileSex>{gender}</S.ProfileSex>
                <S.Dot />
                <S.ProfileTime>{ago}</S.ProfileTime>
            </S.ProfileLeft>
            <S.ProfileDistance>{distance}km</S.ProfileDistance>
        </S.ProfileInfo>
    );
}

export default Profile;
