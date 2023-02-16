import React, { useState } from "react";
import styled from "styled-components";

import { Content, Dialogue } from "../games/RPG/maps";
import PaginationArrows, { PaginationDirection } from "./PaginationArrows";
import { GameUI, Modal, FlexContainer, Text } from "./styled";
import cancelSrc from "../images/RPG/cancel.png";
import ImageSprite from "./ImageSprite";

const CancelButtonContainer = styled.div`
  position: relative;
  top: -50px;
  left: -50px;
  height: 50px;
`;

const DialogueContainer = styled.div`
  padding: 2rem;
`;

interface IPortfolioMenuUI {
  showDialogue: boolean;
  dialogue?: Dialogue;
  handleClose: () => void;
}
const RPGDialogueUI = ({
  showDialogue,
  dialogue,
  handleClose,
}: IPortfolioMenuUI) => {
  const [page, setPage] = useState(0);
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
            <CancelButtonContainer>
              <ImageSprite
                imgSrc={cancelSrc}
                framesTotal={2}
                handleClick={handleClose}
              />
            </CancelButtonContainer>
            <div>{dialogue.title}</div>
            {isPaginated ? (
              <PaginationArrows
                page={page}
                pagesLength={content.length - 1}
                handleClick={handleClick}
              >
                <Text>{content[page] as React.ReactNode}</Text>
              </PaginationArrows>
            ) : (
              <Text>{content[page] as React.ReactNode}</Text>
            )}
          </Modal>
        </DialogueContainer>
      </FlexContainer>
    </GameUI>
  );
};

export default RPGDialogueUI;
