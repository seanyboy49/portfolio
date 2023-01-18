import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background: lightblue;
  height: 100vh;
`;

const HeroText = styled.h1`
  font-size: 6rem;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: center;
`;

const UnderConstruction = () => {
  return (
    <Container>
      <Hero>
        <HeroText>COMING SOON</HeroText>
        <p>My portfolio website is still under construction.</p>
        <p>In the mean time, here are some fun links to click</p>
      </Hero>
    </Container>
  );
};

export default UnderConstruction;
