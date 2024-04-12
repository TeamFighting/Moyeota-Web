import { useParams } from 'react-router';
import { instance } from '../../../axios';
import * as S from '../styles';
import { useEffect, useState } from 'react';
import { useMyInfoStore } from '../../../state/store/MyInfo';
import { PotOwnerCrown } from '../../../assets/svg';
import styled from 'styled-components';

interface PartyOneProps {
    userId: number;
    nickname: string;
    profileImage: string;
    potOwner: boolean;
    distance: number;
    price: number;
}

function Body() {
    const width = window.innerWidth - 40;
    const [partyOne, setPartyOne] = useState<PartyOneProps[]>([]);
    const { postId } = useParams();
    const { id } = useMyInfoStore();
    console.log(id);
    const getPartyOne = async () => {
        const result = await instance.get(`posts/${postId}/members`);
        const partyOneData = result.data.data;
        const updatedPartyOne = await Promise.all(
            partyOneData.map(async (party: PartyOneProps) => {
                const result = await instance.get(
                    `participation-details/payment/users/${party.userId}/posts/${postId}`,
                );
                const money = result.data.data;
                return {
                    ...party,
                    distance: money.distance,
                    price: money.price,
                };
            }),
        );

        setPartyOne(updatedPartyOne);
    };

    console.log(partyOne);

    const render = partyOne.map((party) => {
        const isMyPayment = party.userId === id;
        return (
            <S.PartyOneRow>
                <S.MoneyLeft>
                    {party.potOwner && (
                        <Icon
                            style={{
                                width: '24px',
                                height: '24px',
                                backgroundColor: 'none',
                                position: 'absolute',
                                marginBottom: '30px',
                                marginRight: '15px',
                            }}
                        >
                            <PotOwnerCrown width={24} height={24} />
                        </Icon>
                    )}
                    <S.PartyOneImage src={party.profileImage} />
                    {isMyPayment && <S.PotOwner>나</S.PotOwner>}
                    <S.PartyOneName>{party.nickname}</S.PartyOneName>
                </S.MoneyLeft>
                <S.MoneyRight>
                    <S.EachMoney isMyPayment={isMyPayment} style={{ textDecorationLine: 'none' }}>
                        {party.price}원 / {party.distance}km
                    </S.EachMoney>
                </S.MoneyRight>
            </S.PartyOneRow>
        );
    });

    useEffect(() => {
        getPartyOne();
    }, []);

    return (
        <div
            style={{
                width: width,
                marginLeft: '20px',
                marginRight: '20px',
                backgroundColor: 'white',
            }}
        >
            <S.Title>팟장에게 송금해주세요 !</S.Title>
            <S.Content>
                팟장이 전체금액 선결제 후, <br /> 파티원들에게 거리별 비용금액을 송금 받을 수 있어요
            </S.Content>
            <S.Money>
                <S.PartyOne>{render}</S.PartyOne>
            </S.Money>
        </div>
    );
}

const Icon = styled.div``;
export default Body;
