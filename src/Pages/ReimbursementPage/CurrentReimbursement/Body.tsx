import * as S from './style';
import * as St from '../styles';
import SvgNotCheck from '../../../assets/svg/NotCheck';
import { useEffect, useState } from 'react';
import SvgCheck from '../../../assets/svg/Check';
import { CurrentReimburseStore } from '../../../state/store/CurrentReimburseStore';
import { set } from 'firebase/database';
import styled from 'styled-components';

interface EachAmount {
    userId: number;
    amount: number;
    name: string;
    profileImage: string;
    isPartyOwner: boolean;
}

interface BodyProps {
    data: {
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

function Body({ data, setModalOpen }: BodyProps) {
    const CurrentReimburseStoreState = JSON.parse(localStorage.getItem('current-reimburse-storage') as string);
    const { CurrentReimbursement } = CurrentReimburseStoreState.state;
    const { updatePaymentStatusForUserId } = CurrentReimburseStore();
    const [clickedUsers, setClickedUsers] = useState<number[]>([]);

    useEffect(() => {
        CurrentReimbursement.forEach((element: any) => {
            if (element.postId === data.postId) {
                if (element.isPayed.isPayed) {
                    setClickedUsers((prev) => [...prev, element.isPayed.userId]);
                } else {
                    setClickedUsers((prev) => prev.filter((id) => id !== element.isPayed.userId));
                }
            }
        });
    }, []);
    const isUserClicked = (userId: number) => clickedUsers.includes(userId);
    const handlePaymentStateChange = (userId: number) => {
        const isPayed = !isUserClicked(userId);
        updatePaymentStatusForUserId(data.postId, userId, isPayed);
        setClickedUsers((prev) => (isPayed ? [...prev, userId] : prev.filter((id) => id !== userId)));
        if (clickedUsers.length === data.totalPeople - 1) {
            setModalOpen(true);
        }
    };
    const render = () =>
        data.EachAmount.map((each) => (
            <St.PartyOneRow key={each.userId}>
                <St.MoneyLeft>
                    <St.PartyOneImage src={each.profileImage} />
                    <S.Name>{each.name}</S.Name>
                </St.MoneyLeft>
                <St.MoneyRight>
                    <St.MoneyRight style={{ textDecoration: 'underline' }}>{each.amount}원</St.MoneyRight>
                    {isUserClicked(each.userId) ? (
                        <SvgCheck onClick={() => handlePaymentStateChange(each.userId)} width={24} height={24} />
                    ) : (
                        <SvgNotCheck onClick={() => handlePaymentStateChange(each.userId)} width={24} height={24} />
                    )}
                </St.MoneyRight>
            </St.PartyOneRow>
        ));
    useEffect(() => {
        render();
    }, [isUserClicked, clickedUsers]);
    return (
        <S.Wrapper>
            <S.Content>
                <S.PotName>{data.potName}</S.PotName>
                <S.TotalAmount>{data.totalAmount}</S.TotalAmount>
                <S.RequestDate>요청일 24.01.17(수) 오후 07:02</S.RequestDate>
                <S.ManagementWrapper>
                    <div>파티원</div>
                </S.ManagementWrapper>
                {render()}
            </S.Content>
        </S.Wrapper>
    );
}

export default Body;
