import useStore from '../../stores/DurationFareStore';
import * as S from '../CreatePotPage/style';

function UpdatePrice({ totalPeople }: { totalPeople: number }) {
    const { estimatedFare } = useStore();

    const totalAmount = estimatedFare !== null ? estimatedFare : 0;

    const farePerPerson = totalPeople > 0 && estimatedFare !== null ? estimatedFare / totalPeople : totalAmount;

    return (
        <S.Bottom>
            <S.PayBox>
                <S.PayBoxTitle>예상금액</S.PayBoxTitle>
                <S.PayBoxDescription>
                    총 {totalAmount.toLocaleString()}원 /{' '}
                    {totalPeople > 0
                        ? `1인당 ${farePerPerson.toLocaleString()}원`
                        : `1인당 ${totalAmount.toLocaleString()}원`}{' '}
                    (현재시간 기준)
                </S.PayBoxDescription>
            </S.PayBox>
        </S.Bottom>
    );
}

export default UpdatePrice;
