import Card from "../items/Card";
import GameScreen from "../UI/GameScreen";
import "./style.css";

/**
 * The gameboard will contain the two different players
 * and handle which cards are thrown out
 */
function Gameboard({ playerCards, aiCards, checkWinner, war, overtime }) {
  if (playerCards[0] === undefined || aiCards[0] === undefined) checkWinner();

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
    let cardsToDraw = 2;

    if (aiCards[cardsToDraw] === undefined) {
      cardsToDraw = aiCards.length - 1;
    } else if (playerCards[cardsToDraw] === undefined) {
      cardsToDraw = playerCards.length - 1;
    }

    return (
      <>
        <div className="playerSpace">
          {createRounds("player", cardsToDraw + overtime)}
        </div>
        <div className="aiSpace">
          {createRounds("ai", cardsToDraw + overtime)}
        </div>
      </>
    );
  };

  // function to create Rounds for war!
  const createRounds = (player, rounds) => {
    let overtimeArr = [];
    for (let i = 0; i <= rounds; i++) {
      let card = null;
      if (player === "player") {
        card = <Card player="player" card={playerCards[i]} />;
      } else {
        card = <Card player="AI" card={aiCards[i]} />;
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
