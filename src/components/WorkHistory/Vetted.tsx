import { Text } from "../styled";

const Intro = () => {
  return (
    <ul>
      <li>
        <Text>
          Sean landed at Vetted when an old colleague and friend asked him to
          help him disrupt the world of venture capital. The idea was to use a
          special fund structure to enable fund managers to raise a fund from an
          unlimited amount of investors. Traditional venture capital funds are
          limited to 99 investors. Sean joined Vetted as a Founding Engineer,
          designer, and all-around product guy.
        </Text>
      </li>
      <li>
        <Text>
          Sean led and built multiple features that were critical to onboarding
          new customers and adhering to the company's Anti Money Laundering
          Policy.
        </Text>
      </li>
      <li>
        <Text>
          With only 2 months of runway, Sean and one other engineer designed,
          built and shipped a mobile first web app for investors to discover
          funds.
        </Text>
      </li>
    </ul>
  );
};

const MVP = () => {
  return (
    <>
      <Text>
        <b>Minimum Viable Product</b>
      </Text>

      <ul>
        <li>
          <Text>
            <b>Investor onboarding and KYC</b> - Sean designed and built a
            multi-step investor onboarding and accreditation flow for investors
            to prove their identity and accredition status in order to be
            approved to invest with Vetted.
          </Text>
        </li>
        <li>
          <Text>
            <b>Fund discovery and investing</b> - Approved investors could
            discover relevant funds and request allocation in the fund.
          </Text>
        </li>
        <li>
          <Text>
            <b>Marketing website</b>- A performant and mobile responsive website
            that showcased the Vetted VC brand and its mission.
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
            <b>Frontend</b> - Typescript, Next.js (React), Material UI, Node,
            Cypress
          </Text>
        </li>
        <li>
          <Text>
            <b>Backend</b> - Typescript, Nest.js (Node)
          </Text>
        </li>
        <li>
          <Text>
            <b>Platform</b> - Google Cloud Platform, Terraform
          </Text>
        </li>
      </ul>
    </>
  );
};

const history = [Intro, MVP, Technology];
export default history;
