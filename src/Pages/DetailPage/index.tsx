import * as S from './style';
import DetailHeader from './DetailHeader';
import DetailBody from './DetailBody';
import DetailBottom from './DetailBottom';
import DetailPartySection from './DetailPartySection';
import ApplyButton from '../MainPage/Components/ApplyButton/ApplyButton';
import { useLocation } from 'react-router';
import ApplyModal from '../MainPage/Components/ApplyButton/ApplyModal';
import ModalStore from '../../zustand/store/ModalStore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function DetailPage() {
  const [isFull, setIsFull] = useState(false);
  const location = useLocation();
  const [scroll, setScroll] = useState(0);
  const [dividerHeight, setDividerHeight] = useState(6); // Divider 컴포넌트의 height 값을 상태로 관리

  const { data, splitedTime, timePart } = location.state;
  const { isOpen, setIsOpen } = ModalStore((state) => state);
  if (data.numberOfParticipants == data.numberOfRecruitment) {
    setIsFull(true);
  }
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScroll(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    // scroll 값이 변경될 때마다 Divider 컴포넌트의 height 값을 업데이트
    if (scroll > 720) {
      setDividerHeight(10);
    } else {
      setDividerHeight(6);
    }
  }, [scroll]);
  return (
    <S.Container>
      <DetailHeader />
      <DetailBody data={data} />
      <Divider style={{ height: '10px' }} />
      <DetailBottom
        fare={data.fare}
        duration={data.duration}
        splitedTime={splitedTime}
        timePart={timePart}
        data={data}
        participants={data.numberOfParticipants}
        recruitment={data.numberOfRecruitment}
      />
      <Divider style={{ height: `${dividerHeight}px` }} />
      <DetailPartySection
        postId={data.postId}
        leaderName={data.userName}
        content={data.content}
        profileImage={data.profileImage}
        gender={data.userGender}
        participants={data.numberOfParticipants}
      />
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
const Divider = styled.div`
  width: 100vw;
  background-color: #f5f6f8;
`;
export default DetailPage;
