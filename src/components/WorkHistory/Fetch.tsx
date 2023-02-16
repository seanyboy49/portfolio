import { Text } from "../styled";

const Intro = () => {
  return (
    <ul>
      <li>
        <Text>
          Fresh out of coding bootcamp, Sean joined Fetch, an online advertising
          agency to enhance their creative ads with interactive and rich media
          and bring automation to labor intensive processes.
        </Text>
      </li>
    </ul>
  );
};

const Projects = () => {
  return (
    <>
      <Text>
        <b>Creative work and development</b>
      </Text>
      <ul>
        <li>
          <Text>
            <b>Dynamic advertising</b> - Sean developed Fetch’s first Dynamic
            Advertising Solution, using React/Redux, Google Apps, Google Ads’
            retargeting data and weather APIs to generate over 4,000 unique
            creative ads for Lululemon across the US and Canada. Creative was
            generated based on a user’s local weather conditions to deliver them
            the most relevant messaging.
          </Text>
        </li>
        <li>
          <Text>
            <b>Automation</b> - Sean wrote google sheet scripts, built web apps,
            and wrote Photoshop scripts to streamline workflows for account
            executives, marketers and designers, saving hundreds of hours of
            manual work a year.
          </Text>
        </li>
        <li>
          <Text>
            <b>Facebook messenger bot</b> - Sean designed and built a facebook
            messenger bot to pitch to Hulu’s user acquisition team.
          </Text>
        </li>
      </ul>
    </>
  );
};

const Technology = () => {
  return (
    <>
      <Text>
        <b>Technologies and Skills</b>
      </Text>
      <ul>
        <li>
          <Text>
            <b>Frontend</b> - React, Redux
          </Text>
        </li>
      </ul>
    </>
  );
};
const history = [Intro, Projects, Technology];
export default history;
