import { useEffect } from 'react';
import styled from 'styled-components';

function NotFound() {
    useEffect(() => {
        setTimeout(() => {
            window.location.href = '/mainpage';
        }, 3000);
    }, []);
    return (
        <Wrapper>
            🙀
            <br /> 어머나 잘못 찾아오셨어요 !
            <br />
            <DetailText> 3초 후 메인페이지로 이동합니다...</DetailText>
        </Wrapper>
    );
}

export default NotFound;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: 600;
    z-index: 1;
    width: 100%;
    height: 100dvh;
    text-align: center;
    transition: transform 400ms ease-out;
`;

export const DetailText = styled.div`
    font-size: 20px;
    font-weight: 400;
    margin-top: 10px;
`;
