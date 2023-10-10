import styled from 'styled-components';
import { motion } from 'framer-motion';

import useBottomSheet from '../../BottomSheetHook/useBottonSheet';
import BottomSheetContent from './BottomSheetContent';
import BottomSheetHandle from './BottomSheetHandle';
import ContentHeader from '../SingleContent/ContentHeader';
import ApplyButton from '../ApplyButton/ApplyButton';

import {
  BOTTOM_SHEET_HEIGHT,
  WINDOWHEIGHT,
} from '../../../../Constants/constant';
import ModalStore from '../../../../zustand/store/ModalStore';
import ApplyModal from '../ApplyButton/ApplyModal';

function BottomSheet() {
  const { sheet, content } = useBottomSheet();
  const { isOpen, setIsOpen } = ModalStore((state) => state);

  return (
    <Wrapper ref={sheet}>
      <BottomSheetHandle />
      <ContentHeader />
      <BottomSheetContentWrapper ref={content}>
        <BottomSheetContent />
        <ApplyButton />
        {isOpen && <ApplyModal setIsOpen={setIsOpen} />}
      </BottomSheetContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)<{ isMaxHeight: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: ${WINDOWHEIGHT}px;
  border-radius: 26px 26px 0 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  height: ${BOTTOM_SHEET_HEIGHT}px;
  transition: transform 400ms ease-out;
  background-color: white;
`;
const BottomSheetContentWrapper = styled.div`
  width: 100%;
  background-color: white;
  overflow-y: scroll;
  height: 100%;
`;

export default BottomSheet;
