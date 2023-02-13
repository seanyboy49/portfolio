import { Content } from "../games/RPG/maps";
import {
  MenuContainer,
  GameUI,
  MenuItem,
  MenuItemsContainer,
  DialogueContainer,
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
      <DialogueContainer>
        <Modal>
          {content.map((c) => {
            if (typeof c === "string") {
              return <div key={c}>{c}</div>;
            }
            return null;
          })}
        </Modal>
      </DialogueContainer>
    </GameUI>
  );
};

export default RPGDialogueUI;
