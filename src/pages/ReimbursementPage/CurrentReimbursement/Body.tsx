import { useEffect, useState } from 'react';

import * as S from './style';
import * as St from '../styles';

interface EachAmount {
    userId: number;
    amount: number;
    name: string;
    profileImage: string;
    isPartyOwner: boolean;
}

interface BodyProps {
    reimburseData: {
        EachAmount: EachAmount[];
        isPartyOwner: boolean;
        account: { accountNumber: string; bankName: string };
        postId: number;
        potName: string;
        totalAmount: string;
        totalPeople: number;
    };
    setModalOpen: (value: boolean) => void;
}

function Body({ reimburseData, setModalOpen }: BodyProps) {
    const CurrentReimburseStoreState = JSON.parse(localStorage.getItem('current-reimburse-storage') as string);
    const { CurrentReimbursement } = CurrentReimburseStoreState;
    // const { updatePaymentStatusForUserId } = CurrentReimburseStore();
    const [clickedUsers, setClickedUsers] = useState<number[]>([]);
    const [userIds, setUserIds] = useState<number[]>([]);
    useEffect(() => {
        CurrentReimbursement.forEach((element: any) => {
            if (!userIds.includes(element.isPayed.userId)) setUserIds((prev) => [...prev, element.isPayed.userId]);
            userIds.sort((a, b) => a - b);
            if (element.postId === reimburseData.postId) {
                if (element.isPayed.isPayed) {
                    setClickedUsers((prev) => [...prev, element.isPayed.userId]);
                } else {
                    setClickedUsers((prev) => prev.filter((id) => id !== element.isPayed.userId));
                }
            }
        });
    }, []);

    useEffect(() => {
        let cnt = 0;
        clickedUsers.forEach((userId) => {
            if (userIds.includes(userId)) {
                cnt++;
            }
        });
        if (cnt === reimburseData.totalPeople) {
            setModalOpen(true);
        }
    }, [clickedUsers, userIds, reimburseData.totalPeople, setModalOpen]);
    const isUserClicked = (userId: number) => clickedUsers.includes(userId);
    // const handlePaymentStateChange = (userId: number) => {
    //     const isPayed = !isUserClicked(userId);
    //     updatePaymentStatusForUserId(data.postId, userId, isPayed);
    //     setClickedUsers((prev) => (isPayed ? [...prev, userId] : prev.filter((id) => id !== userId)));
    // };

    const render = () =>
        reimburseData.EachAmount.map((each) => (
            <St.PartyOneRow key={each.userId}>
                <St.MoneyLeft>
                    <St.PartyOneImage src={each.profileImage} />
                    <S.Name>{each.name}</S.Name>
                </St.MoneyLeft>
                <St.MoneyRight>
                    <St.MoneyRight style={{ textDecoration: 'underline' }}>{each.amount}원</St.MoneyRight>
                    {/* {isUserClicked(each.userId) ? (
                        <SvgCheck onClick={() => handlePaymentStateChange(each.userId)} width={24} height={24} />
                    ) : (
                        <SvgNotCheck onClick={() => handlePaymentStateChange(each.userId)} width={24} height={24} />
                    )} */}
                </St.MoneyRight>
            </St.PartyOneRow>
        ));

    useEffect(() => {
        render();
    }, [isUserClicked, clickedUsers]);

    return (
        <S.Wrapper>
            <S.Content>
                <S.PotName>{reimburseData.potName}</S.PotName>
                <S.TotalAmount>{reimburseData.totalAmount}</S.TotalAmount>
                <S.RequestDate>요청일 24.01.17(수) 오후 07:02</S.RequestDate>
                <S.ManagementWrapper>{/* <div>파티원 편집</div> */}</S.ManagementWrapper>
                {render()}
            </S.Content>
            <S.Stroke />
        </S.Wrapper>
    );
}

export default Body;
