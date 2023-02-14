import { useLayoutEffect, useState } from "react";
import styled from "styled-components";

const Sprite = styled.img`
  object-fit: none;
  object-position: 0 0;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const UnstyledButton = styled.button`
  border: none;
  cursor: pointer;
  background: none;
`;

interface IImageSprite {
  imgSrc: string;
  framesTotal: number;
  handleClick?: () => void;
}

const ImageSprite = ({ imgSrc, framesTotal, handleClick }: IImageSprite) => {
  const [width, setWidth] = useState<number>(0);

  useLayoutEffect(() => {
    const image = new Image();
    image.src = imgSrc;

    image.onload = () => {
      setWidth(image.width);
    };
  }, [imgSrc]);
  const croppedWidth = width / 2;

  if (handleClick) {
    return (
      <UnstyledButton onClick={handleClick}>
        <Sprite src={imgSrc} width={croppedWidth} height={croppedWidth} />;
      </UnstyledButton>
    );
  }

  return <Sprite src={imgSrc} width={croppedWidth} height={croppedWidth} />;
};

export default ImageSprite;
