interface DetailBottomProps {
    fare: number;
    duration: number;
    splitedTime: string[];
    timePart: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    participants: number;
    recruitment: number;
}
function DetailBottom({ data }: DetailBottomProps) {
    // console.log(data)
    return <></>;
    // return (
    //     <S.Bottom>
    //         <S.DescriptionTag>
    //             <S.Staus>
    //                 <S.Tags>
    //                     <S.Tag>{data.vehicle}</S.Tag>
    //                     {!data.sameGenderStatus && <S.Tag>성별무관</S.Tag>}
    //                     {data.sameGenderStatus && data.userGender && <S.Tag>남자만</S.Tag>}
    //                     {data.sameGenderStatus && !data.userGender && <S.Tag>여자만</S.Tag>}
    //                     <S.Tag>{data.category}</S.Tag>
    //                 </S.Tags>
    //                 <S.GateringTag>
    //                     모집중 {participants}/{recruitment}
    //                 </S.GateringTag>
    //             </S.Staus>
    //         </S.DescriptionTag>
    //         <S.TextDescription>
    //             <div>일정 및 시간</div>
    //             <div
    //                 style={{
    //                     marginTop: '12px',
    //                     fontSize: '14px',
    //                     display: 'flex',
    //                     gap: '10px',
    //                     flexDirection: 'column',
    //                 }}
    //             >
    //                 <div style={{ flexDirection: 'row', display: 'flex', gap: '11px' }}>
    //                     <Calendar width="16" height="16" />
    //                     <div>
    //                         <div>
    //                             {splitedTime[1]}월 {splitedTime[2]}일 ({splitedTime[3]}) {timePart} 출발
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div style={{ flexDirection: 'row', display: 'flex', gap: '11px' }}>
    //                     <Clock width="16" height="16" />
    //                     <div>{Math.floor(duration / 60)}분 소요</div>
    //                 </div>
    //                 <div style={{ flexDirection: 'row', display: 'flex', gap: '11px' }}>
    //                     <Dollar width="16" height="16" />
    //                     <div style={{ flexDirection: 'row', display: 'flex', gap: '5px' }}>
    //                         <div style={{ color: '#7E7E7E' }}>예상 금액</div>총 {fare}원 - 1인당 {fare / recruitment}원
    //                         ({data.numberOfRecruitment}인)
    //                     </div>
    //                 </div>
    //             </div>
    //         </S.TextDescription>
    //     </S.Bottom>
    // )
}

export default DetailBottom;
