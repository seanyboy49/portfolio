import styled from "styled-components";

import { Content } from "../games/RPG/config";
import { Text } from "./styled";

interface IPageContent {
  content: Content;
}

const OverflowContainer = styled.div`
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  margin-top: 2rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const PageContent = ({ content }: IPageContent) => {
  if (typeof content === "string") {
    return (
      <OverflowContainer>
        <TextContainer>
          <Text>{content}</Text>;
        </TextContainer>
      </OverflowContainer>
    );
  }
  const C = content;

  return (
    <OverflowContainer>
      <TextContainer>
        <C />
      </TextContainer>
    </OverflowContainer>
  );
};

export default PageContent;
