import styled from 'styled-components';

interface BottomButtonProps {
    isDisabled?: boolean;
    text: string;
    onClick: () => void;
}

const BottomButton: React.FC<BottomButtonProps> = ({ isDisabled, text, onClick: clickFun }) => {
    const handleClickAbliity = () => {
        if (isDisabled) {
            clickFun();
        } else {
            alert('모든 항목을 입력해주세요');
            return;
        }
    };
    return (
        <Wrapper>
            <Button
                isDisabled={isDisabled}
                type="button"
                onClick={() => {
                    handleClickAbliity();
                }}
            >
                {text}
            </Button>
        </Wrapper>
    );
};

export default BottomButton;

const Wrapper = styled.div`
    width: 100%;
    height: 64px;
    background-color: white;
    bottom: 0;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    z-index: 2;
`;

const Button = styled.button<{ isDisabled?: boolean }>`
    width: 90%;
    max-width: 335px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 12px;
    background-color: ${(props) => (props.isDisabled ? 'var(--Gray-Button, #1edd81)' : 'var(--Green-Button, #9e9d9d)')};
    border: none;
    font-size: 16px;
    color: white;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.54px;
    z-index: 2;
`;
