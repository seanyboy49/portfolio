import { SubTitle, Text } from "../styled";

export const WelcomeSign = () => {
  return (
    <>
      <SubTitle>Welcome to the museum of Sean!</SubTitle>
      <ul>
        <li>
          <Text>
            Visit the right hall to see Sean's work history as a software
            engineer, starting with his most recent work.
          </Text>
        </li>
        <li>
          <Text>
            The left hall is currently under construction. Check back soon to
            view exhibits about major milestones in Sean's life!
          </Text>
        </li>
      </ul>
    </>
  );
};
