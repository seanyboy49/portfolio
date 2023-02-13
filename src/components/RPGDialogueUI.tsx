import styled from "styled-components";
import { Content } from "../games/RPG/maps";
import {
  MenuContainer,
  GameUI,
  MenuItem,
  MenuItemsContainer,
  Modal,
  FlexContainer,
} from "./styled";

const DialogueContainer = styled.div`
  padding: 2rem;
`;

interface IPortfolioMenuUI {
  showContent: boolean;
  content?: Content[];
}
const RPGDialogueUI = ({ showContent, content }: IPortfolioMenuUI) => {
  if (!showContent || !content) return null;

  return (
    <GameUI>
      <FlexContainer>
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
      </FlexContainer>
    </GameUI>
  );
};

export default RPGDialogueUI;
