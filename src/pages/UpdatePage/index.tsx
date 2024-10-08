import instance from '@apis';
import PotCreateStore from '@stores/PotCreateStore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import UpdatePotButton from './Button/UpdatePotButton';
import UpdateBody from './UpdateBody';
import UpdateBottom from './UpdateBottom';
import UpdateDescription from './UpdateDescription';
import UpdateHeader from './UpdateHeader';
import UpdateNote from './UpdateNote';
import UpdatePrice from './UpdatePrice';
import * as S from '../CreatePotPage/style';

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
    const [postInfo, setPostInfo] = useState<PostProps | null>(null);
    const {
        setTitle,
        setPotCreateStore,
        setDestination: setNewDestination,
        destination: newDestination,
        setTotalPeople,
        totalPeople,
        setVehicleType,
        setSameGenderStatus,
        setLatitude,
        setLongitude,
        setDeparture,
    } = PotCreateStore();
    const getPostInfo = async () => {
        try {
            const res = await instance.get(`/posts/${postId}`);
            setPotCreateStore(res.data.data);
            setPostInfo(res.data.data);
            setTotalPeople(res.data.data.numberOfRecruitment);
            setTitle(res.data.data.title);
            setNewDestination(res.data.data.destination);
            setVehicleType(res.data.data.vehicle);
            setSameGenderStatus(res.data.data.sameGenderStatus);
            setLatitude(res.data.data.latitude);
            setLongitude(res.data.data.longitude);
            setDeparture(res.data.data.departure);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setNewDestination(newDestination);
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
                <UpdateBottom data={postInfo} />
                <Divider style={{ height: `${dividerHeight}px` }} />
                <UpdatePrice totalPeople={totalPeople} />
                <Divider style={{ height: '6px' }} />
                <UpdatePotButton postId={postInfo.postId} roomId={postInfo.roomId} />
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
