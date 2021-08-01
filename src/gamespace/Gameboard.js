import Card from "../items/Card";
import GameScreen from "../UI/GameScreen";
import "./style.css";

/**
 * The gameboard will contain the two different players
 * and handle which cards are thrown out
 */
function Gameboard({ playerCards, aiCards, checkWinner, war, overtime }) {
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

  // deal out the armaments... its WARRRRRRRRRRRRRRRRRRRRR
  const wartime = () => {
    return (
      <>
        <div className="playerSpace">
          <Card player="player" card={playerCards[0]} />
          <Card player="player" card={playerCards[1]} />
          <Card player="player" card={playerCards[2]} />
          {overtimeRounds("player")}
        </div>
        <div className="aiSpace">
          <Card player="AI" card={aiCards[0]} />
          <Card player="AI" card={aiCards[1]} />
          <Card player="AI" card={aiCards[2]} />
          {overtimeRounds("ai")}
        </div>
      </>
    );
  };

  // we were more evenly matched than I thought... until now! (hopefully)
  const overtimeRounds = (player) => {
    let overtimeArr = [];
    for (let i = 0; i < overtime; i++) {
      let card = null;
      if (player === "player") {
        card = <Card player="player" card={playerCards[2 + i]} />;
      } else {
        card = <Card player="AI" card={aiCards[2 + i]} />;
      }
      overtimeArr.push(card);
    }

    return overtimeArr;
  };

  return (
    <div className="gameboard">
      <GameScreen
        className="col-md-12"
        checkWinner={checkWinner}
        playerCardCount={playerCards.length}
        aiCardCount={aiCards.length}
      />
      <div className="warzone">{war === false ? normalPlay() : wartime()}</div>
    </div>
  );
}

export default Gameboard;
