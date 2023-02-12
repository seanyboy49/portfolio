import { Content } from "../games/RPG/maps";
import {
  MenuContainer,
  GameUI,
  MenuItem,
  MenuItemsContainer,
  Modal,
} from "./styled";

interface IPortfolioMenuUI {
  showContent: boolean;
  content?: Content[];
}
const RPGDialogueUI = ({ showContent, content }: IPortfolioMenuUI) => {
  if (!showContent || !content) return null;

  return (
    <GameUI>
      <MenuContainer>
        <Modal>
          {content.map((c) => {
            if (typeof c === "string") {
              return <div key={c}>{c}</div>;
            }
            return null;
          })}
        </Modal>
      </MenuContainer>
    </GameUI>
  );
};

export default RPGDialogueUI;
