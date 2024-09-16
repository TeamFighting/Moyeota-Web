import instance from '@apis';
import MatchApplyButton from '@pages/MainPage/Components/MatchApplyButton/MatchApplyButton';
import ModalStore from '@stores/ModalStore';
import { useMyPotContentStore } from '@stores/MyPotContentStore';
import getDays from '@utils/getDays';
import ISOto12 from '@utils/ISOto12';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';

import DetailHeader from './components/DetailHeader';
import FixDetailHeader from './components/FixDetailHeader';
import * as S from './style';
import DetailBody from './views/DetailBody';
import DetailBottom from './views/DetailBottom';
import DetailPartySection from './views/DetailPartySection';
import MatchApplyModal from '../MainPage/Components/MatchApplyButton/MatchApplyModal';

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
    latitude: string;
    longitude: string;
}

function DetailPage() {
    const [isFull, setIsFull] = useState(false);
    const [scroll, setScroll] = useState(0);
    const [dividerHeight, setDividerHeight] = useState(6);
    const { modalOpen } = ModalStore();
    const [data, setData] = useState<DetailPageProps>({} as DetailPageProps);
    const [isLoading, setLoading] = useState(false);
    const [isFixDetailHeader, setIsFixDetailHeader] = useState(false);
    const [splitedTime, setSplitedTime] = useState(['', '', '', '']);
    const [timePart, setTimePart] = useState('');
    const { postId } = useParams();
    const { MyPotContent } = useMyPotContentStore();
    const location = useLocation();
    const routeState = location.state;
    const getDetailData = async () => {
        try {
            setLoading(true);
            const res = await instance.get(`/posts/${postId}`);
            setData(res.data.data);
            if (res.data.data.numberOfParticipants == res.data.data.numberOfRecruitment) {
                setIsFull(true);
            }
            if (res.data.data.departureTime !== undefined) {
                setSplitedTime(getDays(res.data.data.departureTime));
                setTimePart(ISOto12(res.data.data.departureTime));
            }
            MyPotContent.forEach((element: any) => {
                if (element.postId == parseInt(postId!)) {
                    setIsFixDetailHeader(true);
                }
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDetailData();
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

    return isLoading ? (
        <S.Container>
            {isFixDetailHeader ? <FixDetailHeader postId={data.postId} /> : <DetailHeader from={routeState.from} />}
            <Loading />
        </S.Container>
    ) : (
        <S.Container>
            {isFixDetailHeader ? <FixDetailHeader postId={data.postId} /> : <DetailHeader from={routeState.from} />}
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

const Loading = styled.div`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 48px;
    height: 48px;
    background-image: url('/png/loading.png');
    background-size: cover;
    background-position: center;
    animation: spin 1s infinite ease-in-out;

    @keyframes spin {
        0% {
            transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
`;
