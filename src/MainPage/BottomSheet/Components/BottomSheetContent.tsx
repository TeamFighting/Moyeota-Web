import * as S from '../../style';
import SingleContent from './SingleContent/SingleContent';
const BottomSheetContent = () => {
  return (
    <S.ModalContent>
      <S.ContentWrapper>
        <SingleContent />
      </S.ContentWrapper>
    </S.ModalContent>
  );
};

export default BottomSheetContent;
