import {
  DashboardHybridWork,
  DashboardManagedCarpoolProgram,
  ExtensionHybridWork,
  Intro,
  MicroservicesPlatform,
  Technology,
} from "./ScoopWorkHistory";

const paysail = {
  title:
    "Syro (formerly Paysail) - Instant, cross-border payments powered by crypto",
  content: [
    "Sean joined Syro (formerly known as Paysail) in August 2022 as a Founding Engineer.",
    "At the time, Syro was focused on building instant, cross-border invoicing and payments through asset backed stablecoins.",
    "Sean led and built multiple features that were critical to onboarding new customers and adhering to the company's Anti Money Laundering Policy.",
    "KYC/KYB (Know Your Customer/Business) - A complex UI with steps that could branch into multiple paths. Syro customers could verify themselves as individuals or businesses and onboard other business owners via email. Web sockets were used to sync server state with a frontend state machine.",
    "AML (Anti-Money Laundering) - Transactions monitoring. To comply with our new AML Policy, every transaction had to be tagged with metadata that could be vetted by our vendor service. Syro admin users could then manually approve or deny flagged transactions.",
    "Multi-signature wallets - A frequently requested feature by customers that wanted multi-signature approval of transactions on the Gnosis Chain. Used long-running jobs to sync transaction status from the Gnosis Chain with other block chains to our systems.",
    "Frontend Technologies - Typescript, React, Material UI, Node, Cypress",
    "Backend Technologies - Typescript, Node, Parse Server",
  ],
};

const vetted = {
  title: "Vetted VC - Disrupting venture capital",
  content: [
    "Sean landed at Vetted when an old colleague and friend asked him to help him disrupt the world of venture capital. The idea was to use a special fund structure to enable fund managers to raise a fund from an unlimited amount of investors. Traditional venture capital funds are limited to 99 investors.",
    "Sean joined Vetted as a Founding Engineer, designer, and all-around product guy.",
    "With only 3 months of runway, Sean and one other engineer designed, built and shipped a web app",
    "Investor onboarding and KYC - A multi-step investor onboarding and accreditation flow.",
    "Fund discovery and investing - Enabled investors to discover relevant funds and requesting allocation in the fund.",
    "Marketing website - A performant and mobile responsive website that showcased the Vetted VC brand and its mission.",
    "Frontend Technologies - Typescript, Next.js (React), Material UI, Node, Cypress",
    "Backend Technologies - Typescript, Nest.js (Node)",
    "Platform Technologies - Google Cloud Platform, Terraform",
  ],
};

const scoop = {
  title: "Scoop Technologies - Carpooling as a perk",
  content: [
    Intro,
    DashboardManagedCarpoolProgram,
    DashboardHybridWork,
    ExtensionHybridWork,
    MicroservicesPlatform,
    Technology,
  ],
};

const awayco = {
  title: "Awayco - Outdoor sports and gear rental",
  content: [""],
};

const fetch = {
  title: "Fetch - Digital advertising",
  content: [""],
};

export const WORK_HISTORY = {
  paysail,
  vetted,
  scoop,
  awayco,
  fetch,
};
