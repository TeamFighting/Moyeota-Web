import * as S from "../../style";

function CreateNote() {
  return (
    <S.Bottom>
      <S.Subtitle>유의사항</S.Subtitle>
      <S.NoteWrapper>
        <S.NoteDescription>
          • 해당 서비스는 택시 호출 서비스와 함께 이동할 <br />
          파티원을 찾는 커뮤니티 서비스입니다.
        </S.NoteDescription>
        <S.NoteDescription>
          • 부득이하게 탑승을 하지 못할 경우 반드시 <br />
          채팅을 통해 파티원에게 미리 알려주세요.
        </S.NoteDescription>
        <S.NoteDescription>
          • 연락두절, 상대방에게 피해를 주는 경우 신고를 통해 <br />
          이용에 제재를 받을 수 있습니다.
        </S.NoteDescription>
        <S.NoteDescription>
          • 기사님을 위해 경유를 지양하고 지정된
          <br /> 목적지에서 하차해주세요.
        </S.NoteDescription>
      </S.NoteWrapper>
    </S.Bottom>
  );
}

export default CreateNote;
