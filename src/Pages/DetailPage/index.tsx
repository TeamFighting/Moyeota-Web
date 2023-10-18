import * as S from './style';
import DetailHeader from './DetailHeader';
import DetailBody from './DetailBody';
import DetailBottom from './DetailBottom';
import DetailPartySection from './DetailPartySection';
import { Divider } from '../../assets/svg';
import ApplyButton from '../MainPage/Components/ApplyButton/ApplyButton';
import { useLocation } from 'react-router';
import ApplyModal from '../MainPage/Components/ApplyButton/ApplyModal';
import ModalStore from '../../zustand/store/ModalStore';
import { useEffect, useState } from 'react';

function DetailPage() {
  const [isFull, setIsFull] = useState(false);
  const location = useLocation();
  const { data, splitedTime, timePart } = location.state;
  const { isOpen, setIsOpen } = ModalStore((state) => state);
  if (data.numberOfParticipants == data.numberOfRecruitment) {
    setIsFull(true);
  }
  useEffect(() => {
    console.log('hi');
  }, []);

  return (
    <S.Container>
      <DetailHeader />
      <DetailBody data={data} />
      <Divider width="100%" height="10" />
      <DetailBottom
        fare={data.fare}
        duration={data.duration}
        splitedTime={splitedTime}
        timePart={timePart}
        data={data}
      />
      <Divider width="100%" height="10" />
      <DetailPartySection />
      <ApplyButton />
      {isOpen && (
        <ApplyModal
          setIsOpen={setIsOpen}
          isFull={isFull}
          postId={data.postId}
        />
      )}
    </S.Container>
  );
}

export default DetailPage;
