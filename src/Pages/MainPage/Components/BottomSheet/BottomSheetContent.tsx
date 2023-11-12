import * as S from '../../style'
import SingleContent from '../SingleContent'
import useStore from '../../../../zustand/store/ContentStore'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
const BottomSheetContent = () => {
    const { totalData } = useStore((state) => state)
    // const [ref, inView] = useInView()
    // const [page, setPage] = useState(1) // 현재 페이지 번호 (페이지네이션)

    // const { updateTotalData } = useStore((state) => state)

    // const productFetch = () => {
    //     axios
    //         .get(`http://moyeota.shop/api/posts?page=${page}`)
    //         .then((res) => {
    //             console.log(res.data.data.content)
    //             updateTotalData(res.data.data.content)
    //             setPage((page) => page + 1)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     console.log('page', page)
    // }

    // useEffect(() => {
    //     if (inView) {
    //         console.log(inView, '무한 스크롤 요청')
    //         productFetch()
    //     }
    //     if (!inView) {
    //         console.log(inView, '무한 스크롤 요청 안함')
    //     }
    // }, [inView])

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
