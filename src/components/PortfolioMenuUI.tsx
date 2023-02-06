import {
  MenuContainer,
  GameUI,
  MenuItem,
  MenuItemsContainer,
  Modal,
} from "./styled";

interface IPortfolioMenuUI {
  isOpen: boolean;
  toggleMenuOpen: () => void;
}
const PortfolioMenuUI = ({ isOpen, toggleMenuOpen }: IPortfolioMenuUI) => {
  if (!isOpen)
    return (
      <GameUI>
        <button onClick={toggleMenuOpen}>Menu</button>
      </GameUI>
    );

  return (
    <GameUI>
      <MenuContainer>
        <Modal>
          <h1>Sean Island</h1>
          <p>Hello and welcome to my portfolio website!</p>
          <p>
            Explore the island to learn a little about me, my experience and
            interests.
          </p>
          <p>
            Click the button in the top left-hand corner at any time to bring up
            this menu.
          </p>
          <p>Desktop instructions</p>
          <button onClick={toggleMenuOpen}>Close</button>
        </Modal>
        <MenuItemsContainer>
          <MenuItem>Resume</MenuItem>
          <MenuItem>Github</MenuItem>
          <MenuItem>LinkedIn</MenuItem>
          <MenuItem>Email</MenuItem>
        </MenuItemsContainer>
      </MenuContainer>
    </GameUI>
  );
};

export default PortfolioMenuUI;
