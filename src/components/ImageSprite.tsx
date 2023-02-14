import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

const Sprite = styled.img`
  object-fit: none;
  object-position: 0 0;
  width: ${(props) => props.width};
`;

interface IImageSprite {
  imgSrc: string;
  framesTotal: number;
}
const ImageSprite = ({ imgSrc, framesTotal }: IImageSprite) => {
  const [width, setWidth] = useState<number>(0);

  useLayoutEffect(() => {
    const image = new Image();
    image.src = imgSrc;

    image.onload = () => {
      setWidth(image.width);
    };
  }, [imgSrc]);

  return <Sprite src={imgSrc} width={width / framesTotal} />;
};

export default ImageSprite;
