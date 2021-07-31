import Card from "../items/Card";
import GameScreen from "../UI/GameScreen";

/**
 * The gameboard will contain the two different players
 * and handle which cards are thrown out
 */
function Gameboard({ playerCards, aiCards, checkWinner, war }) {
  // the JSX element for normal play time (aka when its not WARRRRRRRRRRRR)
  const normalPlay = () => {
    return (
      <>
        <div className="playerSpace">
          <Card player="player" card={playerCards[0]} />
        </div>
        <div className="aiSpace">
          <Card player="AI" card={aiCards[0]} />
        </div>
      </>
    );
  };

  const wartime = () => {
    return (
      <>
        <div className="playerSpace">
          <Card player="player" card={playerCards[0]} />
          <Card player="player" card={playerCards[1]} />
          <Card player="player" card={playerCards[2]} />
        </div>
        <div className="aiSpace">
          <Card player="AI" card={aiCards[0]} />
          <Card player="AI" card={aiCards[1]} />
          <Card player="AI" card={aiCards[2]} />
        </div>
      </>
    );
  };

  return (
    <div className="gameboard">
      <GameScreen checkWinner={checkWinner} />
      {war === false ? normalPlay() : wartime()}
    </div>
  );
}

export default Gameboard;
