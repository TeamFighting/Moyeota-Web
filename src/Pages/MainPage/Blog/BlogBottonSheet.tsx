import styled from 'styled-components';
import BlogBottomSheetHandle from './BottomSheetHandler';
import { motion } from 'framer-motion';
import BlogBottomSheetContent from './BlogBottomSheetContent';
import useBottomSheet from '../../../Hooks/useBottonSheet';

function BlogBottomSheet() {
  // const { sheet, handleUp, content } = useBlogBottomSheet();
  const { sheet, handleUp, content } = useBottomSheet('mainpage');
  return (
    <Wrapper ref={sheet}>
      <OpenButton onClick={handleUp}>
        <p style={{ paddingTop: '3px' }}> 목록 보기</p>
      </OpenButton>
      <BlogBottomSheetHandle />
      <BottomSheetContentWrapper ref={content}>
        <BlogBottomSheetContent />
      </BottomSheetContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)<{ isMaxHeight: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  transition: transform 400ms ease-out;
`;
const OpenButton = styled.div`
  margin-bottom: 10px;
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
  z-index: 2;
  gap: 5px;
`;
const BottomSheetContentWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  overflow: scroll;
`;

export default BlogBottomSheet;
