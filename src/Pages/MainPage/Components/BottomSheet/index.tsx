import styled from 'styled-components';
import { motion } from 'framer-motion';
import useBottomSheet from '../../../../Hooks/useBottonSheet';
import BottomSheetContent from './BottomSheetContent';
import BottomSheetHandle from './BottomSheetHandle';
import ContentHeader from '../SingleContent/SingleContentHeader';
import { List } from '../../../../assets/svg';
import { WINDOWHEIGHT } from '../../../../Constants/constant';

function BottomSheet() {
    const { sheet, handleUp, content } = useBottomSheet('BottomSheet');
    // bottomBar 없어지면 marginTop 조정
    return (
        <Wrapper ref={sheet}>
            <OpenBotton onClick={handleUp}>
                <List style={{ width: '16px', height: '16px', flexShrink: '0' }} />
                <p style={{ paddingTop: '3px' }}> 목록 보기</p>
            </OpenBotton>
            <div
                style={{
                    width: '100%',
                    marginTop: '7px',
                    borderRadius: '26px 26px 0 0',
                }}
            >
                <BottomSheetHandle />
                <ContentHeader />
                <div ref={content} style={{ width: '100%', overflow: 'scroll' }}>
                    <BottomSheetContentWrapper>
                        <BottomSheetContent />
                    </BottomSheetContentWrapper>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled(motion.div)<{ isMaxHeight: boolean }>`
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 10000;
    width: 100%;
    height: calc(100vh + 164px);
    transition: transform 400ms ease-out;
    background-color: white;
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
    z-index: 1000001;
    gap: 5px;
`;
const BottomSheetContentWrapper = styled.div`
    width: 100%;
    height: ${WINDOWHEIGHT + 64};
`;
export default BottomSheet;
