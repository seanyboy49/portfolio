import GameBoard from "./components/GameBoard";
import UnderConstruction from "./components/UnderConstruction";

const underConstruction = true;
function App() {
  if (underConstruction) return <UnderConstruction />;

  return <GameBoard />;
}

export default App;
