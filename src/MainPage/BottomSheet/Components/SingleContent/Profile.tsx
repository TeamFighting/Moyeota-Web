import * as S from '../../../style';
import ProfileSample from '../../../../../public/svg/ProfileSample.svg';

interface ProfileProps {
  index: number;
  userName: string;
  userGender: boolean;
  splitedTime: string[];
  createAt: string;
}

function Profile({ userName, index, userGender, createAt }: ProfileProps) {
  let gender: string;
  if (userGender) {
    gender = '여';
  } else {
    gender = '남';
  }
  const now = new Date();
  const createAtDate = new Date(createAt);
  const timeDiff = now.getTime() - createAtDate.getTime();
  console.log('now.getTime', now.getTime());
  console.log('createAtDate.getTime', createAtDate.getTime());
  // console.log('timeDiff', timeDiff);
  const millisecondsMonth = 1000 * 60 * 60 * 24 * 30;
  const millisecondsDay = 1000 * 60 * 60 * 24;
  const millisecondsHour = 1000 * 60 * 60;
  const millisecondsMinute = 1000 * 60;

  const monthDifference = Math.floor(timeDiff / millisecondsMonth);
  const daysDifference = Math.floor(timeDiff / millisecondsDay);
  const hoursDifference = Math.floor(
    (timeDiff % millisecondsDay) / millisecondsHour
  );
  const minutesDifference = Math.floor(
    (timeDiff % millisecondsHour) / millisecondsMinute
  );
  let ago: string;
  if (monthDifference > 0 && monthDifference < 12) {
    ago = monthDifference + '달 전';
  } else if (daysDifference > 0 && daysDifference < 30) {
    ago = daysDifference + '일 전';
  } else if (hoursDifference > 0 && hoursDifference < 24) {
    ago = hoursDifference + '시간 전';
  } else if (minutesDifference > 0 && minutesDifference < 60) {
    ago = minutesDifference + '분 전';
  } else {
    ago = '방금 전';
  }
  console.log('ago', ago);
  return (
    <S.ProfileInfo key={index}>
      <S.ProfileLeft>
        <ProfileSample />
        <S.ProfileName>{userName}</S.ProfileName>
        <S.ProfileSex>{gender}</S.ProfileSex>
        <S.Dot />
        <S.ProfileTime>{ago}</S.ProfileTime>
      </S.ProfileLeft>
      {/* <S.ProfileDistance>{data.fare}원</S.ProfileDistance> */}
    </S.ProfileInfo>
  );
}

export default Profile;
