import Gameboard from "./Gameboard";
import createDeck from "../utilities/createDeck";
import { outcome } from "../utilities/scoring";
import { useEffect, useState } from "react";

/**
 * The gamecontroller that will have control over both the player side
 * and the AI side.  It will keep track of the score, and will create
 * and send the current card to the player components.
 */
function GameController() {
  // create the deck
  let deck = createDeck();

  // initialize a master state that keeps track of the game
  const initState = {
    score: 0,
    playerDeck: ["loading"],
    aiDeck: ["loading"],
    war: false,
    overtime: false
  };

  const [state, setState] = useState(initState);
  let firstSet,
    secondSet = [];

  // a simple shuffle arrow func
  const shuffle = (arr) => {
    arr.sort(() => Math.random() - 0.5);
  };

  /////////// GAME CONTROL ////////////////////
  function checkWinner() {
    const { playerDeck, aiDeck, war, overtime } = outcome(
      state.playerDeck,
      state.aiDeck,
      state.war,
      state.overtime
    );

    if (playerDeck === undefined) {
      if (war) setState({ ...state, war: war });
      if (overtime) setState({ ...state, overtime: overtime });
      return 0;
    }

    setState({ ...state, playerDeck: playerDeck, aiDeck: aiDeck, war: war });
  }
  //////////////////////////////////////////////

  /////////// GAME INITIALIZATION //////////////
  // initialize the game and assign each player a set of cards
  function initializeGame() {
    // shuffle the deck then split the deck in half
    shuffle(deck);

    // assign the cards
    firstSet = deck.slice(0, 26);
    secondSet = deck.slice(26);

    // update the state
    setState({ ...state, playerDeck: firstSet, aiDeck: secondSet });
  }

  // use a hook to initialize the game
  // and prevent the rerender loop error
  useEffect(() => {
    initializeGame();
  }, []);

  /////////////////////////////////////////////////

  return (
    <div className="gamespace">
      <Gameboard
        war={state.war}
        playerCards={state.playerDeck}
        aiCards={state.aiDeck}
        checkWinner={checkWinner}
        overtime={state.overtime}
      />
    </div>
  );
}

export default GameController;
