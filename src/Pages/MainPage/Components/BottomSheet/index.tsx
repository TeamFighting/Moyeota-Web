import styled from 'styled-components';
import { motion } from 'framer-motion';
import useBottomSheet from '../../../../Hooks/UI/useBottonSheet';
import BottomSheetContent from './BottomSheetContent';
import BottomSheetHandle from './BottomSheetHandle';
import { List } from '../../../../assets/svg';
import { HEADERHEIGHT, WINDOWHEIGHT, BOTTOMBARHEIGHT } from '../../../../Constants/constant';

function BottomSheet() {
    const { sheet, handleUp, content } = useBottomSheet('BottomSheet');
    // bottomBar 없어지면 marginTop 조정
    const refHeight = WINDOWHEIGHT - (HEADERHEIGHT + BOTTOMBARHEIGHT);
    return (
        <Wrapper ref={sheet}>
            <OpenBotton onClick={handleUp}>
                <List style={{ width: '16px', height: '16px', flexShrink: '0' }} />
                <p style={{ paddingTop: '3px' }}> 목록 보기</p>
            </OpenBotton>
            <div
                style={{
                    width: '100%',
                    borderRadius: '26px 26px 0 0',
                    height: '120%',
                    marginTop: '10px',
                }}
            >
                <BottomSheetHandle />
                {/* <ContentHeader /> */}
                <BottomSheetContentWrapper refHeight={refHeight}>
                    <BottomSheetContent content={content} />
                </BottomSheetContentWrapper>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled(motion.div)<{ isMaxHeight: boolean }>`
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100dvh;
    transition: transform 400ms ease-out;
`;
const OpenBotton = styled.div`
    width: 96px;
    height: 36px;
    flex-shrink: 0;
    border-radius: 18px;
    background: var(--Gray-Button-Text, #5d5d5d);
    z-index: 10;
    color: #fff;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 157%; /* 21.98px */
    display: flex;
    justify-content: center;
    align-self: center;
    align-items: center;
    display: flex;
    z-index: 1;
    gap: 5px;
`;
const BottomSheetContentWrapper = styled.div<{ refHeight: number }>`
    width: 100%;
    height: ${(props) => props.refHeight + 15}px;
    overflow-y: scroll;
    background-color: blue;
    z-index: 1;
`;
export default BottomSheet;
