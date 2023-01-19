import TopDownGameBoard from "./components/TopDownGameBoard";
import UnderConstruction from "./components/UnderConstruction";

const underConstruction = true;
function App() {
  if (underConstruction) return <UnderConstruction />;

  return <TopDownGameBoard />;
}

export default App;
