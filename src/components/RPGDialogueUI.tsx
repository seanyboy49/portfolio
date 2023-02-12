import { Content } from "../games/RPG/maps";
import {
  MenuContainer,
  GameUI,
  MenuItem,
  MenuItemsContainer,
  Modal,
} from "./styled";

interface IPortfolioMenuUI {
  content?: Content[];
}
const RPGDialogueUI = ({ content }: IPortfolioMenuUI) => {
  console.log("content", content);
  if (!content) return null;

  //   if (typeof content === "string") {
  return (
    <GameUI>
      <MenuContainer>
        <Modal>
          {content.map((c) => {
            if (typeof c === "string") {
              return <div>{c}</div>;
            }
          })}
        </Modal>
      </MenuContainer>
    </GameUI>
  );
  //   }
  //   const Content = content;
  //   return (
  //     <GameUI>
  //       <Content />
  //     </GameUI>
  //   );
};

export default RPGDialogueUI;
