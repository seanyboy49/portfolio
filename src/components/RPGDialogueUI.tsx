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
  /* width: 100%; */
  /* height: 100%; */
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: end; */
  /* align-items: center; */
  /* position: absolute; */
  /* bottom: 5%; */

  padding: 1rem;
  /* background: rgba(120, 83, 212, 0.772); */
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
