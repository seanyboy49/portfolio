import syroHistory from "../../components/WorkHistory/Syro";
import scoopHistory from "../../components/WorkHistory/Scoop";

const paysail = {
  title: "Syro (formerly Paysail) - Instant, cross-border payments",
  content: syroHistory,
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
  content: scoopHistory,
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
