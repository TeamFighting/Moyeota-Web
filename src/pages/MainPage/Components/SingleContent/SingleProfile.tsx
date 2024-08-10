// import { useEffect, useState } from 'react';
// import { instance } from '../../../../axios';
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
  console.log('Profile', profileImg);
  // const [resizedImg, setResizedImg] = useState<string>('');

  // const getResizedImg = async (img: string) => {
  //   // const encodedImgUrl = encodeURIComponent(img);

  //   const res = await instance.get('/users/image-resizing', {
  //     params: {
  //       imageUrl: img,
  //     },
  //   });
  //   setResizedImg(res.data);
  // };

  // useEffect(() => {
  //   getResizedImg(profileImg);
  // }, []);
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
