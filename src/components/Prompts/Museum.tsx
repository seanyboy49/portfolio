import { SubTitle, Text } from "../styled";

export const WelcomeSign = () => {
  return (
    <>
      <SubTitle>Welcome to the museum of Sean!</SubTitle>
      <ul>
        <li>
          <Text>
            In the left hall, you can learn a little about Sean's major life
            events.
          </Text>
        </li>
        <li>
          <Text>
            In the right hall, you can learn about Sean's work history.
          </Text>
        </li>
      </ul>
    </>
  );
};
