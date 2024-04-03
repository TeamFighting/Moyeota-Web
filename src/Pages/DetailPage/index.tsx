import * as S from './style';
import DetailBody from './DetailBody';
import DetailBottom from './DetailBottom';
import DetailPartySection from './DetailPartySection';
import MatchApplyButton from '../MainPage/Components/MatchApplyButton/MatchApplyButton';
import { useLocation, useParams } from 'react-router';
import MatchApplyModal from '../MainPage/Components/MatchApplyButton/MatchApplyModal';
import ModalStore from '../../state/store/ModalStore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import FixDetailHeader from '../CreatePotPage/Components/DetailPage/DetailHeader';
import { useMyPotStore } from '../../state/store/MyPotStore';
import DetailHeader from './DetailHeader';
import { instance } from '../../axios';
import getDays from '../util/getDays';
import ISOto12 from '../util/ISOto12';

interface DetailPageProps {
    category: string;
    content: string;
    createAt: string;
    departure: string;
    departureTime: string;
    destination: string;
    distance: number;
    duration: number;
    fare: number;
    numberOfParticipants: number;
    numberOfRecruitment: number;
    postId: number;
    profileImage: string;
    sameGenderStatus: string;
    status: string;
    title: string;
    userGender: string;
    userName: string;
    vehicle: string;
    view: number;
    roomId: string;
}

function DetailPage() {
    const [isFull, setIsFull] = useState(false);
    const [scroll, setScroll] = useState(0);
    const [dividerHeight, setDividerHeight] = useState(6);
    const { modalOpen } = ModalStore();
    const { MyPot } = useMyPotStore();
    const [data, setData] = useState<DetailPageProps>({} as DetailPageProps);
    const [isFixDetailHeader, setIsFixDetailHeader] = useState(false);
    const [splitedTime, setSplitedTime] = useState(['', '', '', '']);
    const [timePart, setTimePart] = useState('');

    const { postId } = useParams();
    const getDetailData = async () => {
        const res = await instance.get(`/posts/${postId}`);
        setData(res.data.data);
        if (res.data.data.numberOfParticipants == res.data.data.numberOfRecruitment) {
            setIsFull(true);
        }
        if (res.data.data.departureTime !== undefined) {
            setSplitedTime(getDays(res.data.data.departureTime));
            setTimePart(ISOto12(res.data.data.departureTime));
        }
        MyPot.forEach((element) => {
            if (element === res.data.data.postId) {
                setIsFixDetailHeader(true);
            }
        });
        console.log(res);
    };

    useEffect(() => {
        getDetailData();

        console.log(data.postId);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            setScroll(position);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scroll]);

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
            {isFixDetailHeader ? <FixDetailHeader postId={data.postId} /> : <DetailHeader />}
            <DetailBody {...data} />
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
            <MatchApplyButton roomId={data.roomId} postId={data.postId} leaderName={data.userName} title={data.title} />{' '}
            {modalOpen.isOpen && <MatchApplyModal isFull={isFull} postId={data.postId} />}
        </S.Container>
    );
}
const Divider = styled.div`
    width: 100vw;
    background-color: #f5f6f8;
`;
export default DetailPage;
