import { ChevronRight } from '../../../assets/svg';
import SvgBell from '../../../assets/svg/Bell';
import SvgCreditcard from '../../../assets/svg/Creditcard';
import SvgSpeakerphone from '../../../assets/svg/Speakerphone';
import SvgStar from '../../../assets/svg/Star';
import SvgTaxi from '../../../assets/svg/Taxi';
import SvgUser from '../../../assets/svg/User';
import * as S from '../MyPage_styles';
function Lists() {
    const lists1 = [
        { id: 1, title: '계정 관리', icon: <SvgUser width={24} />, link: '/mypage' },
        { id: 2, title: '계좌 관리', icon: <SvgCreditcard width={24} />, link: '/mypage' },
        { id: 3, title: '팟 이용내역', icon: <SvgTaxi width={24} />, link: '/mypage' },
    ];
    const lists2 = [
        { id: 4, title: '즐겨찾는 장소 설정', icon: <SvgStar width={24} />, link: '/mypage' },
        { id: 5, title: '알림 설정', icon: <SvgBell width={24} />, link: '/mypage' },
        { id: 6, title: '공지사항', icon: <SvgSpeakerphone width={24} />, link: '/mypage' },
    ];
    const RenderList1 = lists1.map((list) => {
        return (
            <S.List key={list.id}>
                <S.ListLeft>
                    {list.icon}
                    <S.ListText>{list.title}</S.ListText>
                </S.ListLeft>
                <ChevronRight width={24} />
            </S.List>
        );
    });
    const RenderList2 = lists2.map((list) => {
        return (
            <S.List key={list.id}>
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
            {RenderList1}
            <div style={{ width: '100%', height: '6px', backgroundColor: '#F5F6F8' }} />
            {RenderList2}
        </S.ListWrapper>
    );
}

export default Lists;
