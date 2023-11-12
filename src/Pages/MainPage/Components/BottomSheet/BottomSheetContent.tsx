import * as S from '../../style'
import SingleContent from '../SingleContent'
import useStore from '../../../../zustand/store/ContentStore'
const BottomSheetContent = () => {
    const { totalData } = useStore((state) => state)

    if (totalData === undefined || null) {
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
                <img src="../../../../../public/png/Simbol.png" />
                <p
                    style={{
                        fontSize: '32px',
                        fontFamily: 'pretendard',
                        color: ' #9A9A9A',
                        fontWeight: 500,
                    }}
                >
                    데이터가 없습니다 :(
                </p>
            </div>
        )
    } else {
        return (
            <>
                <S.ModalContent>
                    <S.ContentWrapper>
                        <SingleContent />
                    </S.ContentWrapper>
                </S.ModalContent>
            </>
        )
    }
}

export default BottomSheetContent
