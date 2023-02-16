import syroHistory from "../../components/WorkHistory/Syro";
import scoopHistory from "../../components/WorkHistory/Scoop";
import vettedHistory from "../../components/WorkHistory/Vetted";
import awaycoHistory from "../../components/WorkHistory/Awayco";
import fetchHistory from "../../components/WorkHistory/Fetch";

const paysail = {
  title: "Syro (formerly Paysail) - Instant, cross-border payments",
  content: syroHistory,
};

const vetted = {
  title: "Vetted VC - Disrupting venture capital",
  content: vettedHistory,
};

const scoop = {
  title: "Scoop Technologies - Carpooling as a perk",
  content: scoopHistory,
};

const awayco = {
  title: "Awayco - Outdoor sports and gear rental",
  content: awaycoHistory,
};

const fetch = {
  title: "Fetch - Digital advertising",
  content: fetchHistory,
};

export const WORK_HISTORY = {
  paysail,
  vetted,
  scoop,
  awayco,
  fetch,
};
