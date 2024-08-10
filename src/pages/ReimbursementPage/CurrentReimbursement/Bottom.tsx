import { useParams } from 'react-router';
import instance from '@apis/index';
import * as S from '../../DetailPage/style';
import * as ST from './style';
import { useEffect, useState } from 'react';
import SvgDollar from '../../../assets/svg/Dollar';
import SvgClock from '../../../assets/svg/Clock';
import SvgCalendar from '../../../assets/svg/Calendar';
import getDays from '../../../utils/getDays';
import ISOto12 from '../../../utils/ISOto12';

function Bottom({ reimburseData }: any) {
    const { postId } = useParams();

    const [data, setData] = useState({} as any);
    const [splitedTime, setSplitedTime] = useState(['', '', '', '']);
    const [timePart, setTimePart] = useState('');
    console.log(reimburseData);
    const getDetailData = async () => {
        const res = await instance.get(`/posts/${postId}`);
        setData(res.data.data);

        if (res.data.data.departureTime !== undefined) {
            setSplitedTime(getDays(res.data.data.departureTime));
            setTimePart(ISOto12(res.data.data.departureTime));
        }
    };

    useEffect(() => {
        getDetailData();
    }, []);

    return (
        <S.Bottom>
            <ST.Title>이용정보</ST.Title>
            <S.DescriptionTag>
                <S.Staus>
                    <S.Tags>
                        <S.Tag>{data.vehicle}</S.Tag>
                        {!data.sameGenderStatus && <S.Tag>성별무관</S.Tag>}
                        {data.sameGenderStatus && data.userGender == 'M' && <S.Tag>남자만</S.Tag>}
                        {data.sameGenderStatus && data.userGender == 'F' && <S.Tag>여자만</S.Tag>}
                        <S.Tag>{data.category}</S.Tag>
                    </S.Tags>
                </S.Staus>
            </S.DescriptionTag>
            <S.TextDescription>
                <div>일정 및 시간</div>
                <div
                    style={{
                        marginTop: '12px',
                        fontSize: '14px',
                        display: 'flex',
                        gap: '10px',
                        flexDirection: 'column',
                    }}
                >
                    <div style={{ flexDirection: 'row', display: 'flex', gap: '11px' }}>
                        <SvgCalendar width="16" height="16" />
                        <div>
                            <div>
                                {splitedTime[1]}월 {splitedTime[2]}일 ({splitedTime[3]}) {timePart} 출발
                            </div>
                        </div>
                    </div>
                    <div style={{ flexDirection: 'row', display: 'flex', gap: '11px' }}>
                        <SvgClock width="16" height="16" />
                        <div>{Math.floor(data.duration / 60)}분 소요</div>
                    </div>
                    <div style={{ flexDirection: 'row', display: 'flex', gap: '11px' }}>
                        <SvgDollar width="16" height="16" />
                        <div style={{ flexDirection: 'row', display: 'flex', gap: '5px' }}>
                            총금액 {reimburseData.totalAmount}
                        </div>
                    </div>
                </div>
            </S.TextDescription>
        </S.Bottom>
    );
}

export default Bottom;
