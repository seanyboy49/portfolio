import { Content } from "../games/RPG/maps";
import { Text } from "./styled";

interface IPageContent {
  content: Content;
}
const PageContent = ({ content }: IPageContent) => {
  if (typeof content === "string") {
    return <Text>{content}</Text>;
  }
  const C = content;

  return <C />;
};

export default PageContent;
