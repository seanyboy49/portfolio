import styled from "styled-components";

import arrowRightSrc from "../images/RPG/arrow-right.png";
import arrowLeftSrc from "../images/RPG/arrow-left.png";
import IconButton from "./IconButton";

const OverflowContainer = styled.div`
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  margin-top: 2rem;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TextContainer = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Spacer = styled.div`
  width: 50px;
`;

export enum PaginationDirection {
  forward = "forward",
  backward = "backward",
}
interface IPagination {
  page: number;
  pagesLength: number;
  handleClick: (direction: PaginationDirection) => void;
  children: React.ReactNode;
}
const PaginationArrows = ({
  page,
  pagesLength,
  handleClick,
  children,
}: IPagination) => {
  return (
    <FlexContainer>
      {page !== 0 ? (
        <IconButton
          handleClick={() => handleClick(PaginationDirection.backward)}
          iconSrc={arrowLeftSrc}
          alt="Arrow pointed left"
        />
      ) : (
        <Spacer />
      )}
      <OverflowContainer>
        <TextContainer>{children}</TextContainer>
      </OverflowContainer>
      {page !== pagesLength ? (
        <IconButton
          handleClick={() => handleClick(PaginationDirection.forward)}
          iconSrc={arrowRightSrc}
          alt="Arrow pointed right"
        />
      ) : (
        <Spacer />
      )}
    </FlexContainer>
  );
};

export default PaginationArrows;
