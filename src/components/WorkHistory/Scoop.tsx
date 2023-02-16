import { Text } from "../styled";

const Intro = () => {
  return (
    <ul>
      <li>
        <Text>
          Sean joined Scoop at an exciting time. In 2019, Scoop had just raised
          a Series C funding round and was ready to start scaling its business
          to hundreds of thousands of users.
        </Text>
      </li>
      <li>
        <Text>
          Up until this time, Scoop had only hired mobile and backend engineers,
          as its primary product was a mobile app that was serviced by a couple
          of mono repos.
        </Text>
      </li>
      <li>
        <Text>
          Now that Scoop was being adopted by entire company workforces, Sean
          joined as the company's first frontend engineer to build its first
          customer-facing web app. During his time at Scoop, Sean worked on a
          variety of features across the stack
        </Text>
      </li>
    </ul>
  );
};

const DashboardManagedCarpoolProgram = () => {
  return (
    <>
      <Text>
        <b>Customer Dashboard - Managed Carpool Program</b>
      </Text>
      <ul>
        <li>
          <Text>
            Sean worked with a team of 15 engineers to build and ship the MVP of
            Scoop’s customer facing dashboard — a web app used by customers to
            manage their company’s carpool program.
          </Text>
        </li>
        <li>
          <Text>
            This scaled to tens of thousands of users. It operated in tandem
            with the internal dashboard to onboard new customers using
            Multi-Factor-Authentication.
          </Text>
        </li>
      </ul>
    </>
  );
};

const DashboardHybridWork = () => {
  return (
    <>
      <Text>
        <b>Customer Dashboard - Hybrid Work</b>
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
            Sean worked on and led a number of new features to get Scoop’s new
            product to market as quickly as possible.
          </Text>
        </li>
        <li>
          <Text>
            Roster CSV ingestion - customers could easily sync their existing
            employee roster with Scoop’s internal systems.
          </Text>
        </li>
        <li>
          <Text>
            Desk and floor plan management - customers could define the physical
            characteristics of their in-office experience so that employees
            could choose their ideal floor/area/desk combination from Scoop’s
            mobile apps or Chrome extension (see Chrome Extension - Hybrid
            work).
          </Text>
        </li>
        <li>
          <Text>
            Data visualization - Sean led data visualization efforts, building
            beautiful and accessible charts to support a growing number of
            performance metrics. Charting components were designed to be as
            modular and flexible as possible to support an arbitrary number of
            filters, date ranges, non-homogenous data types, and incomplete sets
            of data.
          </Text>
        </li>
        <li>
          <Text>
            Geo-spatial visualization- Sean built a geo-spatial editing tool for
            customers to define their office work location on a map. Performant
            UX like editing hints and error boundaries were achieved with
            memoization to limit the number of expensive computations. Sean used
            open sourced technologies like mapbox, deckGL and h3.
          </Text>
        </li>
      </ul>
    </>
  );
};

const ExtensionHybridWork = () => {
  return (
    <>
      <Text>
        <b>Chrome Extension - Hybrid Work</b>
      </Text>
      <ul>
        <li>
          <Text>
            With the pivot to building a hybrid work product, Sean and two
            frontend engineers built a Chrome Extension that allowed employees
            to interface with their employers’ hybrid work policies.
          </Text>
        </li>
        <li>
          <Text>
            Desk and building selection - if an employee chose to go into the
            office, they could choose from a combination of floor/area/desk
            combinations.
          </Text>
        </li>
        <li>
          <Text>
            Proof of vaccination upload - employees could upload proof of
            vaccination when going into offices that required it.
          </Text>
        </li>
        <li>
          <Text>
            Proof of test upload - employees could upload proof of a negative
            test when going into offices that required it.
          </Text>
        </li>
      </ul>
    </>
  );
};

const MicroservicesPlatform = () => {
  return (
    <>
      <Text>
        <b>Microservices and Platform</b>
      </Text>
      <ul>
        <li>
          <Text>
            After two years of leading many frontend efforts, Sean branched out
            to other areas of the stack.
          </Text>
        </li>
        <li>
          <Text>
            He built APIs, converted huge swaths of legacy code to Typescript,
            and wrote a guide on how to deploy new microservices at Scoop on
            Kubernetes and Docker with all resources provisioned with Terraform.
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
            <b>Frontend</b> - Typescript, React, Bootstrap, SaSS, Redux, D3,
            ReCharts, DeckGL, h3.
          </Text>
        </li>
        <li>
          <Text>
            <b>Backend</b> - Typescript, Hapi.js (Node), Nest.js (Node),
            Bookshelf, Postgres, mocha.
          </Text>
        </li>
        <li>
          <Text>
            <b>Platform</b> - Terraform, AWS, Segment analytics, DataDog,
            SumoLogic.
          </Text>
        </li>
        <li>
          <Text>
            <b>Testing</b> - cypress, jest, mocha.
          </Text>
        </li>
      </ul>
    </>
  );
};

const history = [
  Intro,
  DashboardManagedCarpoolProgram,
  DashboardHybridWork,
  ExtensionHybridWork,
  MicroservicesPlatform,
  Technology,
];
export default history;
