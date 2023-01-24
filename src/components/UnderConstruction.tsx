import { useState } from "react";
import styled from "styled-components";
import githubSrc from "../images/social/github.png";
import linkedInSrc from "../images/social/linkedIn.png";
import meteorSrc from "../images/meteor.png";
import Icon from "./Icon";
import SpaceShooterGameBoard from "./SpaceShooterGame";

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

const GameButton = styled.button`
  border: none;
  cursor: pointer;
  background: none;
`;

const socialLinks = [
  { iconSrc: githubSrc, href: "https://github.com/seanyboy49" },
  { iconSrc: linkedInSrc, href: "https://www.linkedin.com/in/seanboramlee/" },
];

const UnderConstruction = () => {
  const [playGame, setPlayGame] = useState(false);
  if (playGame) {
    return <SpaceShooterGameBoard handleBack={() => setPlayGame(false)} />;
  }
  return (
    <FlexContainer style={{ height: "100vh" }}>
      <Hero>
        <HeroText>COMING SOON</HeroText>
        <Text>My portfolio website is still under construction.</Text>
        <Text>In the mean time, here are some fun things to click.</Text>
        <FlexContainer style={{ justifyContent: "center", marginTop: "1rem" }}>
          {socialLinks.map((link) => {
            return <Icon {...link} />;
          })}

          <GameButton onClick={() => setPlayGame(true)}>
            <img src={meteorSrc} alt="icon of meteor" height={50} />
          </GameButton>
        </FlexContainer>
      </Hero>
    </FlexContainer>
  );
};

export default UnderConstruction;
