import * as S from '../../style';
import ProfileSample from '../../../../../public/svg/ProfileSample.svg';
import createAgo from './createAgo';

interface ProfileProps {
  index: number;
  userName: string;
  gender: string;
  ago: string;
  distance: number;
}

function Profile({ userName, index, gender, ago, distance }: ProfileProps) {
  return (
    <S.ProfileInfo key={index}>
      <S.ProfileLeft>
        <ProfileSample />
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
