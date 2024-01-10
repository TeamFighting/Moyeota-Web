import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import SvgCancelIcon from '../../../../assets/svg/CancelIcon';
import CheveronLeft from '../../../../assets/svg/Chevronleft';
import ThreeDots from '../../../../assets/svg/ThreeDots';
import UploadIcon from '../../../../assets/svg/UploadIcon';
import BottomSheetModal from './BottomSheetModal';
import useUpdateModalStore from '../../../../state/store/UpdateModalStore';

function DetailHeader() {
    const navigate = useNavigate();
    const { isModalOpen, openModal, closeModal } = useUpdateModalStore();

    const goBack = () => {
        navigate('/mainpage');
    };

    return (
        <Header>
            <BottomSheetModal isOpen={isModalOpen} onClose={closeModal}>
                <p>Modal Content</p>
            </BottomSheetModal>
            <Icon style={{ alignSelf: 'center' }} onClick={goBack}>
                <CheveronLeft width="24" height="24" />
            </Icon>
            <Icon style={{ alignSelf: 'center' }}>
                <ThreeDots onClick={openModal} style={{ paddingRight: '16px' }} />
                <UploadIcon style={{ paddingRight: '16px' }} />
                <SvgCancelIcon onClick={goBack} width="24" height="24" />
            </Icon>
        </Header>
    );
}

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
    height: ${HEADER_HEIGHT}px;
    justify-content: space-between;
    position: fixed;
    top: 0;
    align-self: center;
    width: 92.5%;
    padding: 0 3.75%;
    background-color: white;
`;

const Icon = styled.div`
    cursor: pointer;
    align-self: flex-start;
`;

export default DetailHeader;
