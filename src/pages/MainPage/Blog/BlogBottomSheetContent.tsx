import styled from 'styled-components';

const BlogBottomSheetContent = () => {
  return (
    <ContentWrapper>
      <Content>내용</Content>
      <Content>내용</Content>
      <Content>내용</Content>
      <Content>내용</Content>
      <Content>내용</Content>
      <Content>내용</Content>
      <Content>내용</Content>
      <Content>내용</Content>
      <Content>내용</Content>
      <Content>내용</Content>
      <Content>내용</Content>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 3px black solid;
`;

export default BlogBottomSheetContent;
