import styled from "styled-components";
import githubSrc from "../images/social/github.png";
import linkedInSrc from "../images/social/linkedIn.png";
import Icon from "./Icon";

const FlexContainer = styled.div`
  display: flex;
`;

const HeroText = styled.h1`
  font-size: 6rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.5rem;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: center;
`;

const socialLinks = [
  { iconSrc: githubSrc, href: "https://github.com/seanyboy49" },
  { iconSrc: linkedInSrc, href: "https://www.linkedin.com/in/seanboramlee/" },
];

const UnderConstruction = () => {
  return (
    <FlexContainer style={{ height: "100vh" }}>
      <Hero>
        <HeroText>COMING SOON</HeroText>
        <Text>My portfolio website is still under construction.</Text>
        <Text>In the mean time, here are some fun links to click.</Text>
        <FlexContainer style={{ justifyContent: "center", marginTop: "1rem" }}>
          {socialLinks.map((link) => {
            return <Icon {...link} />;
          })}
        </FlexContainer>
      </Hero>
    </FlexContainer>
  );
};

export default UnderConstruction;
