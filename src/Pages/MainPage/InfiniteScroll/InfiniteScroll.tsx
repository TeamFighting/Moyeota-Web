import { useInView } from 'react-intersection-observer'
export default function InfiniteScroll() {
    const [ref, inView] = useInView({
        threshold: 0,
    })
}
