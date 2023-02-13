import styled from "styled-components";

const GameButton = styled.button`
  border: none;
  cursor: pointer;
  background: none;
`;

interface IIconButton {
  handleClick: () => void;
  iconSrc: string;
  height?: number;
  alt: string;
}
const IconButton = ({ handleClick, alt, height, iconSrc }: IIconButton) => {
  return (
    <GameButton onClick={handleClick}>
      <img src={iconSrc} alt={alt} height={height || 50} />
    </GameButton>
  );
};

export default IconButton;
