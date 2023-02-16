import { Text } from "../styled";

const Intro = () => {
  return (
    <ul>
      <li>
        <Text>
          Awayco was the product of a group of Silicon Valley veterans with a
          passion for surfing who knew that the rental and demo industry for
          extreme sports was ripe for innovation.
        </Text>
      </li>
      <li>
        <Text>
          As both a burgeoning surfer and engineer, it was the perfect
          opportunity for Sean to join his first software engineering team and
          ship real products to tens of thousands of surf and snow enthusiasts
          world wide.
        </Text>
      </li>
    </ul>
  );
};

const Projects = () => {
  return (
    <>
      <Text>
        <b>Work across the stack</b>
      </Text>
      <ul>
        <li>
          <Text>
            At the start of the pandemic in 2020, Scoop pivoted away from
            carpooling by adding features to enable teams to easily organize
            around the new world of hybrid and remote work.
          </Text>
        </li>
        <li>
          <Text>
            <b>Reservation system</b> - A mobile-first web app that allowed
            users to browse and reserve their favorite adventure gear. Sean
            designed and built key improvements to the datepicker, filters and
            search capabilities, enabling faster product searches.
          </Text>
        </li>
        <li>
          <Text>
            <b>Affiliate portal</b> - A web app for surf/ski shops to manage
            their own reservations. Previously, this was an Android app. Sean
            pitched and designed a web based alternative in order to create
            faster and cheaper release cycles.
          </Text>
        </li>
        <li>
          <Text>
            <b>Admin dashboard</b> - An internal web app used by Awayco staff to
            manage members, inventory and visualize data.
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
            <b>Frontend</b> - React, Redux, Flow, Ramda, GraphQL
          </Text>
        </li>
      </ul>
    </>
  );
};
const history = [Intro, Projects, Technology];
export default history;
