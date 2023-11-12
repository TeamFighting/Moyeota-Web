import axios from 'axios'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import ContentStore from '../../../zustand/store/ContentStore'

export default function InfiniteScroll() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [page, setPage] = useState(1) // 현재 페이지 번호 (페이지네이션)
    const [ref, inView] = useInView()
    const { updateTotalData } = ContentStore()

    const productFetch = () => {
        axios
            .get(`"http://moyeota.shop/api/posts?page=${page}`)
            .then((res) => {
                console.log(res.data)
                updateTotalData(res.data)
                setPage((page) => page + 1)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        // inView가 true 일때만 실행한다.
        if (inView) {
            console.log(inView, '무한 스크롤 요청')
            productFetch()
        }
    }, [inView])
}
