import * as S from './style';
import CreateHeader from './CreateHeader';
import CreateBody from './CreateBody';
import CreateBottom from './CreateBottom';
import CreatePrice from './CreatePrice';
import CreateDescription from './CreateDescription';
import CreatePotButton from './Components/Button/CreatePotButton';
import CreateNote from './CreateNote';
import { useState, useEffect, SetStateAction } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

function CreatePotPage() {
    const [dividerHeight, setDividerHeight] = useState(6);
    const [scroll, setScroll] = useState(0);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    searchParams.get('destination') || undefined;
    const [totalPeople, setTotalPeople] = useState(1);

    const handleTotalPeopleChange = (count: SetStateAction<number>) => {
        setTotalPeople(count);
    };
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
        if (scroll > 720) {
            setDividerHeight(10);
        } else {
            setDividerHeight(6);
        }
    }, [scroll]);

    return (
        <>
            <S.Container>
                <CreateHeader />
                <CreateBody />
                <Divider style={{ height: '10px' }} />
                <CreateBottom totalPeople={totalPeople} onTotalPeopleChange={handleTotalPeopleChange} />
                <Divider style={{ height: `${dividerHeight}px` }} />
                <CreatePrice totalPeople={totalPeople} />
                <Divider style={{ height: '6px' }} />
                <CreatePotButton totalPeople={totalPeople} />
                <CreateDescription />
                <Divider style={{ height: '6px' }} />
                <CreateNote />
            </S.Container>
        </>
    );
}

const Divider = styled.div`
    width: 100vw;
    background-color: #f5f6f8;
`;

export default CreatePotPage;
