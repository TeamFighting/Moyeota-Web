import { useNavigate } from 'react-router';
import { Creditcard, Taxi, User, ChevronRight } from '@assets/svg';
import * as S from '../MyPage_styles';

interface Props {
    userId: number;
}

function Lists({ userId }: Props) {
    console.log('userId: ', userId);
    const navigate = useNavigate();
    const lists1 = [
        { id: 1, title: '계정 관리', icon: <User width={24} />, link: `/mypage/manageprofile/${userId}` },
        { id: 2, title: '계좌 관리', icon: <Creditcard width={24} />, link: `/mypage/editAccount/${userId}` },
        { id: 3, title: '팟 이용내역', icon: <Taxi width={24} />, link: '' },
    ];

    const navigateTo = (link: string) => {
        if (link === '') return alert('준비중인 서비스입니다.');
        navigate(link);
    };
    const RenderList1 = lists1.map((list) => {
        return (
            <S.List onClick={() => navigateTo(list.link)} key={list.id}>
                <S.ListLeft>
                    {list.icon}
                    <S.ListText>{list.title}</S.ListText>
                </S.ListLeft>
                <ChevronRight width={24} />
            </S.List>
        );
    });

    return (
        <S.ListWrapper>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#F5F6F8' }} />
            {RenderList1}
        </S.ListWrapper>
    );
}

export default Lists;
