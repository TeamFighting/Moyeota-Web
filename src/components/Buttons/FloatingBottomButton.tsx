import { WhitePlus } from '@assets/svg';
import styled from 'styled-components';

interface FloatingBottomButtonProps {
    message: string;
    onClickFunction: () => void;
}
export const FloatingBottomButton = ({ message, onClickFunction }: FloatingBottomButtonProps) => {
    return (
        <Wrapper onClick={onClickFunction}>
            <WhitePlus style={{ stroke: 'white' }} width={24} />
            <div>{message}</div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    gap: 9px;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.48px;
    color: white;
    background: #73737e;
    border-radius: 99px;
    padding: 10px;
    width: 190px;
    justify-content: center;
    z-index: 10;
    margin: auto;
    position: fixed;
    bottom: 90px;

    svg {
        transition: transform 100ms linear;
    }
    &:active {
        svg {
            rotate: 45deg;
            transition: 100ms linear all;
            -webkit-transition: 100ms linear all;
        }
    }
`;
