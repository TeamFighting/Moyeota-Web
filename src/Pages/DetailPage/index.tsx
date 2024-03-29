import * as S from './style';
import DetailBody from './DetailBody';
import DetailBottom from './DetailBottom';
import DetailPartySection from './DetailPartySection';
import MatchApplyButton from '../MainPage/Components/MatchApplyButton/MatchApplyButton';
import { useLocation } from 'react-router';
import MatchApplyModal from '../MainPage/Components/MatchApplyButton/MatchApplyModal';
import ModalStore from '../../state/store/ModalStore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import FixDetailHeader from '../CreatePotPage/Components/DetailPage/DetailHeader';

function DetailPage() {
    const [isFull, setIsFull] = useState(false);
    const location = useLocation();
    const [scroll, setScroll] = useState(0);
    const [dividerHeight, setDividerHeight] = useState(6);
    const { data, splitedTime, timePart } = location.state;
    const { modalOpen } = ModalStore();
    if (data.numberOfParticipants == data.numberOfRecruitment) {
        setIsFull(true);
    }

    useEffect(() => {
        console.log(data);
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
            {/* <DetailHeader /> */}
            <FixDetailHeader postId={data.postId} />
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

            <MatchApplyButton roomId={data.roomId} postId={data.postId} leaderName={data.userName} title={data.title} />
            {modalOpen.isOpen && <MatchApplyModal isFull={isFull} postId={data.postId} />}
        </S.Container>
    );
}
const Divider = styled.div`
    width: 100vw;
    background-color: #f5f6f8;
`;
export default DetailPage;
