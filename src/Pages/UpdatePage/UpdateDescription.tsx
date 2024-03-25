import { ChangeEvent } from 'react';
import usePostDataStore from '../../state/store/PostDataStore';
import * as S from '../CreatePotPage/style';

function CreateDescription() {
    const { data, setPostData } = usePostDataStore();

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;

        if (inputValue.length <= 100) {
            setPostData({ content: inputValue });
        } else {
            setPostData({ content: inputValue.slice(0, 100) });
        }
    };

    return (
        <S.Bottom>
            <S.Subtitle>팟 설명을 작성해주세요 (선택)</S.Subtitle>
            <S.InputDescriptionWrapper>
                <S.InputDescription
                    placeholder={`팟 설명을 자유롭게 작성해주세요
구체적일수록 매칭 확률이 올라가요
(예시: 콘서트, 등하교, 출퇴근, 공항이동 등)`}
                    value={data.content}
                    onChange={handleDescriptionChange}
                />
                <S.CharacterCount>{data.content.length}/100</S.CharacterCount>
            </S.InputDescriptionWrapper>
        </S.Bottom>
    );
}

export default CreateDescription;
