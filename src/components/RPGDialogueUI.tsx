import React, { useState } from "react";
import styled from "styled-components";

import { Content } from "../games/RPG/maps";
import IconButton from "./IconButton";
import PaginationArrows, { PaginationDirection } from "./PaginationArrows";
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
  const [page, setPage] = useState(0);
  if (!showContent || !content) return null;
  const isPaginated = content.length > 1;

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
            {isPaginated ? (
              <PaginationArrows
                page={page}
                pagesLength={content.length - 1}
                handleClick={handleClick}
              >
                <div>{content[page] as React.ReactNode}</div>
              </PaginationArrows>
            ) : (
              <div>{content[page] as React.ReactNode}</div>
            )}
          </Modal>
        </DialogueContainer>
      </FlexContainer>
    </GameUI>
  );
};

export default RPGDialogueUI;
