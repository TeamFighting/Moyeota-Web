import styled from 'styled-components';
import { motion } from 'framer-motion';
import useBottomSheet from '../../../../Hooks/useBottonSheet';
import BottomSheetContent from './BottomSheetContent';
import BottomSheetHandle from './BottomSheetHandle';
import ContentHeader from '../SingleContent/SingleContentHeader';
import { List } from '../../../../assets/svg';
import { BOTTOM_SHEET_HEIGHT, WINDOWHEIGHT } from '../../../../Constants/constant';

function BottomSheet() {
    const { sheet, content, handleUp } = useBottomSheet();

    return (
        <Wrapper ref={sheet}>
            <OpenBotton onClick={handleUp}>
                <List style={{ width: '16px', height: '16px', flexShrink: '0' }} />
                <p style={{ paddingTop: '3px' }}> 목록 보기</p>
            </OpenBotton>
            <div
                style={{
                    marginTop: '17px',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    borderRadius: '26px 26px 0 0',
                    overflow: 'scroll',
                }}
            >
                <BottomSheetHandle />
                <ContentHeader />
                <BottomSheetContentWrapper ref={content}>
                    <BottomSheetContent />
                </BottomSheetContentWrapper>
            </div>
        </Wrapper>
    );
}
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
const Wrapper = styled(motion.div)<{ isMaxHeight: boolean }>`
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 10000;
    width: 100%;
    border-radius: 26px 26px 0 0;
    height: ${BOTTOM_SHEET_HEIGHT}px;
    transition: transform 400ms ease-out;
`;
const BottomSheetContentWrapper = styled.div`
    width: 100%;
    overflow: auto;
    height: ${WINDOWHEIGHT};
    -webkit-overflow-scrolling: touch;
`;

export default BottomSheet;
