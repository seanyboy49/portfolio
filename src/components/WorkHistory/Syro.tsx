import { Text } from "../styled";

const Intro = () => {
  return (
    <ul>
      <li>
        <Text>
          Sean joined Syro (formerly known as Paysail) in August 2022 as a
          Founding Engineer.
        </Text>
      </li>
      <li>
        <Text>
          Sean led and built multiple features that were critical to onboarding
          new customers and adhering to the company's Anti Money Laundering
          Policy.
        </Text>
      </li>
    </ul>
  );
};

export const Projects = () => {
  return (
    <>
      <Text>
        <b>Work across the stack</b>
      </Text>

      <ul>
        <li>
          <Text>
            <b>KYC/KYB (Know Your Customer/Business)</b> - A complex UI with
            steps that could branch into multiple paths. Syro customers could
            verify themselves as individuals or businesses and onboard other
            business owners via email. Web sockets were used to sync server
            state with a frontend state machine.
          </Text>
        </li>
        <li>
          <Text>
            <b>AML (Anti-Money Laundering)</b> - Transactions monitoring. To
            comply with our new AML Policy, every transaction had to be tagged
            with metadata that could be vetted by our vendor service. Syro admin
            users could then manually approve or deny flagged transactions.
          </Text>
        </li>
        <li>
          <Text>
            <b>Multi-signature wallets</b> - A frequently requested feature by
            customers that wanted multi-signature approval of transactions on
            the Gnosis Chain. Used long-running jobs to sync transaction status
            from the Gnosis Chain with other block chains to our systems.
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
            <b>Frontend</b> - Typescript, React, Material UI, Node, Cypress
          </Text>
        </li>
        <li>
          <Text>
            <b>Backend</b> - Typescript, Node, Parse Server
          </Text>
        </li>
      </ul>
    </>
  );
};

const history = [Intro, Projects, Technology];
export default history;
