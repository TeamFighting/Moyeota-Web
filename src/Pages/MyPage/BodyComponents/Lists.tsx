import { useNavigate } from 'react-router';
import { ChevronRight } from '../../../assets/svg';
import SvgCreditcard from '../../../assets/svg/Creditcard';
import SvgTaxi from '../../../assets/svg/Taxi';
import SvgUser from '../../../assets/svg/User';
import * as S from '../MyPage_styles';

interface Props {
    userId: number;
}

function Lists({ userId }: Props) {
    console.log('userId: ', userId);
    const navigate = useNavigate();
    const lists1 = [
        { id: 1, title: '계정 관리', icon: <SvgUser width={24} />, link: `/mypage/manageprofile/${userId}` },
        { id: 2, title: '계좌 관리', icon: <SvgCreditcard width={24} />, link: `/mypage/editAccount/${userId}` },
        { id: 3, title: '팟 이용내역', icon: <SvgTaxi width={24} />, link: '' },
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

    return <S.ListWrapper>{RenderList1}</S.ListWrapper>;
}

export default Lists;
