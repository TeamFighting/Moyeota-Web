import * as S from './style';
import DetailHeader from './DetailHeader';
import DetailBody from './DetailBody';
import DetailBottom from './DetailBottom';
import DetailPartySection from './DetailPartySection';
import ApplyButton from '../BottomSheet/Components/ApplyButton/ApplyButton';
import { Divider } from '../../assets/svg';

function DetailPage() {
  return (
    <>
      <S.Container>
        <DetailHeader />
        <DetailBody />
        <Divider width="100%" height="10" />
        <DetailBottom />
        <Divider width="100%" height="10" />
        <DetailPartySection />
        <ApplyButton />
      </S.Container>
    </>
  );
}

export default DetailPage;
