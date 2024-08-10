import * as S from '../CreatePotPage/style';
import UpdateHeader from './UpdateHeader';
import UpdateBody from './UpdateBody';
import UpdateBottom from './UpdateBottom';
import UpdatePrice from './UpdatePrice';
import UpdateDescription from './UpdateDescription';
import UpdatePotButton from './Button/UpdatePotButton';
import UpdateNote from './UpdateNote';
import type { SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import instance from '@apis';
// import { useLocation } from 'react-router-dom';
// import instance from '@apis';

interface PostProps {
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
    userGender: boolean;
    userName: string;
    vehicle: string;
    view: number;
    longitude: string;
    latitude: string;
    roomId: string;
}

function UpdatePotPage() {
    const [dividerHeight, setDividerHeight] = useState(6);
    const [scroll, setScroll] = useState(0);
    const { postId } = useParams();
    const [, setNewDestination] = useState('');
    const [totalPeople, setTotalPeople] = useState(0);
    const [postInfo, setPostInfo] = useState<PostProps | null>(null);
    const getPostInfo = async () => {
        try {
            const res = await instance.get(`/posts/${postId}`);
            console.log('UPDATE POST INFO', res.data.data);
            setPostInfo(res.data.data);
        } catch (e) {
            console.log(e);
        }
    };
    const handleTotalPeopleChange = (count: SetStateAction<number>) => {
        setTotalPeople(count);
    };
    const newD = (new URLSearchParams(location.search).get('destination') || undefined) as string;

    useEffect(() => {}, []);
    useEffect(() => {
        setNewDestination(newD);
        const handleScroll = () => {
            const position = window.pageYOffset;
            setScroll(position);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [newD]);

    useEffect(() => {
        if (scroll > 720) {
            setDividerHeight(10);
        } else {
            setDividerHeight(6);
        }
    }, [scroll]);
    useEffect(() => {
        getPostInfo();
    }, []);
    if (postInfo == null) return;
    return (
        <>
            <S.Container>
                <UpdateHeader />
                <UpdateBody {...postInfo} />
                <Divider style={{ height: '10px' }} />
                <UpdateBottom data={postInfo} totalPeople={totalPeople} onTotalPeopleChange={handleTotalPeopleChange} />
                <Divider style={{ height: `${dividerHeight}px` }} />
                <UpdatePrice totalPeople={totalPeople} />
                <Divider style={{ height: '6px' }} />
                <UpdatePotButton postId={postInfo.postId} roomId={postInfo.roomId} totalPeople={totalPeople} />
                <UpdateDescription />
                <Divider style={{ height: '6px' }} />
                <UpdateNote />
            </S.Container>
        </>
    );
}

const Divider = styled.div`
    width: 100vw;
    background-color: #f5f6f8;
`;

export default UpdatePotPage;
