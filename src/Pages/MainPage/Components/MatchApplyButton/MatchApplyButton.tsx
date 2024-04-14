import styled from 'styled-components';
import ModalStore from '../../../../state/store/ModalStore';
import { useNavigate } from 'react-router';
import { useMyPotContentStore } from '../../../../state/store/MyPotPage';
import { useAppliedPartyStore } from '../../../../state/store/AppliedPartyStore';
interface ApplyButtonProps {
    postId: number;
    title: string;
    leaderName: string;
    roomId: string;
}

function MatchApplyButton({ roomId, postId }: ApplyButtonProps) {
    const { setIsModalOpen } = ModalStore();
    const navigate = useNavigate();
    const handleApply = () => {
        setIsModalOpen(true, 'apply');
    };
    const handleCancel = () => {
        setIsModalOpen(true, 'cancel');
    };
    // const chatRoomsRef = ref(db, 'chatRooms');
    const handleChat = async () => {
        navigate(`/chat/${postId}`, { state: { roomId: roomId, postId: postId } });
    };
    const { MyPotContent, MyAppliedPotContent } = useMyPotContentStore();
    const { appliedParty } = useAppliedPartyStore();

    // const {appliedParty} = useAppliedPartyStore();
    const result = appliedParty.find((party) => party.postId === postId);
    const MyPotResult = MyPotContent.find((party) => party.postId === postId);
    if (MyPotResult !== undefined) {
        return null;
    } else if (result !== undefined) {
        return (
            <Wrapper>
                <ButtonCancel
                    style={{ backgroundColor: '#1edd81', color: 'white' }}
                    onClick={() => {
                        handleChat();
                    }}
                    type="button"
                >
                    채팅하기
                </ButtonCancel>
                <ButtonCancel
                    onClick={() => {
                        handleCancel();
                    }}
                    type="button"
                >
                    신청 취소하기
                </ButtonCancel>
            </Wrapper>
        );
    } else if (result === undefined) {
        return (
            <Wrapper>
                <Button onClick={handleApply} type="button">
                    매칭 신청하기
                </Button>
            </Wrapper>
        );
    }
}

const ButtonCancel = styled.button`
    background: #f1f1f1;
    width: 335px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 12px;
    border: none;
    font-size: 16px;
    color: #5d5d5d;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.54px;
`;
const Wrapper = styled.div`
    width: 100%;
    height: 120px;
    background-color: white;
    bottom: 0;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
`;

const Button = styled.button`
    width: 335px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--Green-Button, #1edd81);
    border: none;
    font-size: 16px;
    color: white;
    color: #fff;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.54px;
`;

export default MatchApplyButton;
