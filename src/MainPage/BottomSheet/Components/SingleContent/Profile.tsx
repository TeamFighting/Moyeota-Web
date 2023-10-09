import * as S from '../../../style';
import ProfileSample from '../../../../../public/svg/ProfileSample.svg';

interface ProfileProps {
  index: number;
  userName: string;
  userGender: boolean;
}

function Profile({ userName, index, userGender }: ProfileProps) {
  let gender: string;

  if (userGender) {
    gender = '여';
  } else {
    gender = '남';
  }

  return (
    <S.ProfileInfo key={index}>
      <S.ProfileLeft>
        <ProfileSample />
        <S.ProfileName>{userName}</S.ProfileName>
        <S.ProfileSex>{gender}</S.ProfileSex>
        <S.Dot />
        {/* <S.ProfileTime>{data.createAt}</S.ProfileTime> */}
      </S.ProfileLeft>
      {/* <S.ProfileDistance>{data.fare}원</S.ProfileDistance> */}
    </S.ProfileInfo>
  );
}

export default Profile;
