export const paysail = {
  id: "Syro (formerly Paysail)",
  content: [
    "Sean joined Syro (formerly known as Paysail) in August 2022 as a Founding Engineer.",
    "At the time, Syro was focused on building instant, cross-border invoicing and payments through asset backed stablecoins.",
    "Sean led and built multiple features that were critical to onboarding new customers and adhering to the company's Anti Money Laundering Policy.",
    "KYC/KYB (Know Your Customer/Business) - A complex UI with steps that could branch into multiple paths. Syro customers could verify themselves as individuals or businesses and onboard other business owners via email. Web sockets were used to sync server state with a frontend state machine.",
    "AML (Anti-Money Laundering) - Added a layer of monitoring to our transactions. To comply with our new AML Policy, every transaction had to be tagged with metadata that could be vetted by our vendor service. Syro admin users could then manually approve or deny flagged transactions.",
    "Multi-signature wallets - Unlocked a frequently requested feature by customers that wanted multi-signature approval of transactions on the Gnosis Chain. Used long-running jobs to sync transaction status from the Gnosis Chain with other block chains to our systems.",
    "Frontend Technologies - Typescript, React, Material UI, Node, Cypress",
    "Backend Technologies - Typescript, Node, Parse Server",
  ],
};

export const WORK_HISTORY = {
  paysail,
};
