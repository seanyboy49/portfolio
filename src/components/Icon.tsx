import styled from "styled-components";

const Padding = styled.div`
  margin: 0.5rem;
`;

interface IIcon {
  iconSrc: string;
  href: string;
}
const Icon = ({ iconSrc, href }: IIcon) => {
  return (
    <Padding>
      <a href={href}>
        <img src={iconSrc} alt="" height={50} />
      </a>
    </Padding>
  );
};

export default Icon;
