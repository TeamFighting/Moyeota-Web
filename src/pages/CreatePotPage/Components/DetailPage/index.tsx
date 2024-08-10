import * as S from './style';
import DetailHeader from './DetailHeader';
import DetailBody from './DetailBody';
import DetailBottom from './DetailBottom';
import DetailPartySection from './DetailPartySection';
import usePostDataStore from '../../../../stores/PostDataStore';
import PotCreateStore from '../../../../stores/PotCreateStore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import UpdateButton from '../Button/UpdateButton';
import useModalStore from '../../../../stores/UpdateModalStore';
import instance from '@apis';

function DetailPage() {
    const [scroll, setScroll] = useState(0);
    const [dividerHeight, setDividerHeight] = useState(6);
    const { postId } = PotCreateStore();
    const { setPostData } = usePostDataStore();
    const { isModalOpen } = useModalStore();

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            setScroll(position);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // scroll 값이 변경될 때마다 Divider 컴포넌트의 height 값을 업데이트
        if (scroll > 720) {
            setDividerHeight(10);
        } else {
            setDividerHeight(6);
        }
    }, [scroll]);

    useEffect(() => {
        if (postId) {
            instance
                .get(`/posts/${postId}`)
                .then((fetchedData) => {
                    setPostData(fetchedData.data);
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }, [postId, setPostData]);

    return (
        <S.Container>
            <DetailHeader postId={postId} />
            <DetailBody />
            <Divider style={{ height: '10px' }} />
            <DetailBottom />
            <Divider style={{ height: `${dividerHeight}px` }} />
            <DetailPartySection />
            {!isModalOpen && <UpdateButton postId={postId} />}
        </S.Container>
    );
}

const Divider = styled.div`
    width: 100vw;
    background-color: #f5f6f8;
`;

export default DetailPage;
