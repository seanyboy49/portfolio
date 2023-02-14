import styled from "styled-components";

const UnstyledButton = styled.button`
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
    <UnstyledButton onClick={handleClick}>
      <img src={iconSrc} alt={alt} height={height || 50} />
    </UnstyledButton>
  );
};

export default IconButton;
