import * as S from '../../style';
import ContentHeader from './SingleContent/ContentHeader';
import SingleContent from './SingleContent/SingleContent';
const BottomSheetContent = () => {
  return (
    <S.ModalContent>
      <S.ContentWrapper>
        <ContentHeader />
        <SingleContent  />
        <SingleContent />
        <SingleContent />
        <SingleContent />
        <SingleContent />
        <SingleContent />
        <SingleContent />
        <SingleContent />
      </S.ContentWrapper>
    </S.ModalContent>
  );
};

export default BottomSheetContent;
