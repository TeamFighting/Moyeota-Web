import * as S from './style';
import DetailHeader from './DetailHeader';
import DetailBody from './DetailBody';
import DetailBottom from './DetailBottom';
import DetailPartySection from './DetailPartySection';
import { Divider } from '../../assets/svg';
import ApplyButton from '../MainPage/Components/ApplyButton/ApplyButton';
import { useLocation } from 'react-router';
import useStore from '../../zustand/store/ContentStore';
import ApplyModal from '../MainPage/Components/ApplyButton/ApplyModal';
import ModalStore from '../../zustand/store/ModalStore';

function DetailPage() {
  const location = useLocation();
  const { id } = location.state;
  console.log('id', id);
  const { totalData } = useStore((state) => state);
  console.log('Totaldata', totalData);
  const { isOpen, setIsOpen } = ModalStore((state) => state);

  return (
    <S.Container>
      <DetailHeader />
      <DetailBody />
      <Divider width="100%" height="10" />
      <DetailBottom />
      <Divider width="100%" height="10" />
      <DetailPartySection />
      <ApplyButton />
      {isOpen && <ApplyModal setIsOpen={setIsOpen} />}
    </S.Container>
  );
}

export default DetailPage;
