import * as S from '../../style';
import UpdateHeader from './UpdateHeader';
import UpdateBody from './UpdateBody';
import UpdateBottom from './UpdateBottom';
import UpdatePrice from './UpdatePrice';
import UpdateDescription from './UpdateDescription';
import UpdatePotButton from './Button/UpdatePotButton';
import UpdateNote from './UpdateNote';
import { useState, useEffect, SetStateAction } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

function UpdatePotPage() {
    const [dividerHeight, setDividerHeight] = useState(6);
    const [scroll, setScroll] = useState(0);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const destination = searchParams.get('destination') || undefined;
    const [totalPeople, setTotalPeople] = useState(0);

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
                <UpdateHeader />
                <UpdateBody destination={destination} />
                <Divider style={{ height: '10px' }} />
                <UpdateBottom totalPeople={totalPeople} onTotalPeopleChange={handleTotalPeopleChange} />
                <Divider style={{ height: `${dividerHeight}px` }} />
                <UpdatePrice totalPeople={totalPeople} />
                <Divider style={{ height: '6px' }} />
                <UpdatePotButton totalPeople={totalPeople} />
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
