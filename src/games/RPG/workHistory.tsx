const paysail = {
  id: "Syro (formerly Paysail) - Instant, cross-border payments powered by crypto",
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
  id: "Vetted VC - Disrupting venture capital",
  content: [
    "After 3 years at Scoop, an old colleague and friend of Sean's asked him to help him disrupt the world of venture capital.",
    "Sean joined Vetted VC as a Founding Engineer, designer, and all-around product guy.",
    "With only 3 months of runway, Sean designed, built and shipped an MVP.",
    "Investor onboarding and KYC - A multi-step investor onboarding and accreditation flow.",
    "Fund discovery and investing - A flow for discovering relevant funds and requesting allocation in the fund.",
    "Marketing website - A performant and mobile responsive website that showcased the Vetted VC brand and its mission.",
    "Frontend Technologies - Typescript, Next.js (React), Material UI, Node, Cypress",
    "Backend Technologies - Typescript, Nest.js (Node)",
    "Platform Technologies - Google Cloud Platform, Terraform",
  ],
};

const scoop = {
  id: "Scoop Technologies - Carpooling as a perk",
  content: [
    "Sean joined Scoop at an exciting time. In 2019, Scoop had just raised a Series C funding round and was ready to start scaling its business to hundreds of thousands of users.",
    "Up until this time, Scoop had only hired mobile and backend engineers, as its primary product was a mobile app that was serviced by a couple of mono repos.",
    "Now that Scoop was being adopted by entire company workforces, Sean joined as the company's first frontend engineer to build our its first customer-facing web app.",
    "Over three years, Sean worked on a variety of critical features across the stack",
    "Customer dashboard - A dashboard used by customers to manage their company's carpool program. This scaled to tens of thousands of users. It operated in tandem with the internal dashboard to onboard new customers using Multi-Factor-Authentication",
    "Chrome extension - ",
    "Internal dashboard - ",
    "Microservices - ",
  ],
};

const awayco = {
  id: "Awayco - Outdoor sports and gear rental",
};

const fetch = {
  id: "Fetch - Digital advertising",
};

export const WORK_HISTORY = {
  paysail,
  vetted,
  scoop,
};
