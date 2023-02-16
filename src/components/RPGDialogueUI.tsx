import { useEffect, useState } from "react";
import styled from "styled-components";

import { GameMap } from "../games/RPG/types";
import PaginationArrows, { PaginationDirection } from "./PaginationArrows";
import { GameUI, Modal, FlexContainer, SubTitle } from "./styled";
import cancelSrc from "../images/RPG/cancel.png";
import ImageSprite from "./ImageSprite";
import PageContent from "./PageContent";

const OffsetContainer = styled.div`
  position: absolute;
  top: -25px;
  left: -25px;
  height: 50px;
  display: flex;
`;

const DialogueContainer = styled.div`
  padding: 2rem;
`;

const SubtitleContainer = styled.div`
  margin-left: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  align-items: center;
  background: paleturquoise;
  border: 5px lightgray solid;
  border-radius: 15px;
`;

interface IPortfolioMenuUI {
  showDialogue: boolean;
  dialogue?: GameMap.Dialogue;
  handleClose: () => void;
}
const RPGDialogueUI = ({
  showDialogue,
  dialogue,
  handleClose,
}: IPortfolioMenuUI) => {
  const [page, setPage] = useState(0);

  // Reset page to 0
  useEffect(() => {
    if (!dialogue) {
      setPage(0);
    }
  }, [dialogue]);

  if (!showDialogue || !dialogue) return null;

  const isPaginated = dialogue.content.length > 1;
  const { content } = dialogue;

  function handleClick(direction: PaginationDirection) {
    if (direction === PaginationDirection.forward) {
      setPage((prev) => prev + 1);
    } else {
      setPage((prev) => prev - 1);
    }
  }

  return (
    <GameUI>
      <FlexContainer>
        <DialogueContainer>
          <Modal>
            <OffsetContainer>
              <ImageSprite
                imgSrc={cancelSrc}
                framesTotal={2}
                handleClick={handleClose}
              />
              <SubtitleContainer>
                <SubTitle>{dialogue.title}</SubTitle>
              </SubtitleContainer>
            </OffsetContainer>

            {isPaginated ? (
              <PaginationArrows
                page={page}
                pagesLength={content.length - 1}
                handleClick={handleClick}
              >
                <PageContent content={content[page]} />
              </PaginationArrows>
            ) : (
              <PageContent content={content[page]} />
            )}
          </Modal>
        </DialogueContainer>
      </FlexContainer>
    </GameUI>
  );
};

export default RPGDialogueUI;
