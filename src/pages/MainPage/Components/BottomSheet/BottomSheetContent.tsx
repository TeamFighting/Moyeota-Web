import useStore from '../../../../stores/ContentStore';
import * as S from '../../style';
import SingleContent from '../SingleContent';

interface BottomSheetContentProps {
    content: any;
}
const BottomSheetContent = ({ content }: BottomSheetContentProps) => {
    const { totalData } = useStore((state) => state);
    console.log(totalData);
    if (totalData.length === 0) {
        return (
            <div
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '50px',
                    marginTop: '100px',
                }}
            >
                <img src="/public/png/Simbol.png" />
                <p
                    style={{
                        fontSize: '24px',
                        fontFamily: 'pretendard',
                        color: ' #9A9A9A',
                        fontWeight: 500,
                        textAlign: 'center',
                    }}
                >
                    아직 팟이 없어요 ! <br />
                    팟을 만들어 택시비를 아껴보세요 :)
                </p>
            </div>
        );
    } else {
        return (
            <S.ModalContent ref={content}>
                <S.ContentWrapper>
                    <SingleContent from={'BottomSheet'} />
                </S.ContentWrapper>
            </S.ModalContent>
        );
    }
};

export default BottomSheetContent;
