import "./style.css";

function MainMenu({ startGame }) {
  return (
    <button className="btn btn-warning start-btn" onClick={startGame}>
      Cry Havoc, and let slip the cards of WARRRRRR!
    </button>
  );
}
export default MainMenu;
