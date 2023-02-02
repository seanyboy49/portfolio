import RPGGameBoard from "./components/RPGGameBoard";
import UnderConstruction from "./components/UnderConstruction";

const underConstruction = false;
function App() {
  if (underConstruction) return <UnderConstruction />;

  return <RPGGameBoard />;
}

export default App;
