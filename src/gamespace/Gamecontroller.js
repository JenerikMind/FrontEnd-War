import { useEffect, useState } from "react";
import { outcome } from "../utilities/scoring";

import Gameboard from "./Gameboard";
import Winner from "../UI/Winner";
import MainMenu from "../UI/MainMenu";
import createDeck from "../utilities/createDeck";

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
    playerDeck: [{ name: "2", suit: "Diamonds" }],
    aiDeck: [{ name: "3", suit: "Diamonds" }],
    war: false,
    overtime: 0,
    isRunning: false,
    winner: ""
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
    const { playerDeck, aiDeck, war, overtime, winner } = outcome(
      state.playerDeck,
      state.aiDeck,
      state.war,
      state.overtime
    );

    if (playerDeck === undefined) {
      if (war) setState({ ...state, war: war });
      if (overtime) setState({ ...state, overtime: overtime });
      if (winner) {
        setState({
          ...state,
          isRunning: false,
          winner: state.playerDeck.length === 0 ? "ai" : "player"
        });
      }
      return 0;
    }

    setState({
      ...state,
      playerDeck: playerDeck,
      aiDeck: aiDeck,
      war: war,
      overtime: overtime
    });
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
    setState({
      ...state,
      playerDeck: firstSet,
      aiDeck: secondSet,
      isRunning: true
    });
  }

  // use a hook to initialize the game
  // and prevent the rerender loop error
  // useEffect(() => {
  //   initializeGame();
  // }, []);

  /////////////////////////////////////////////////

  /////////// GAME //////////////

  // Changes component based on game state
  // if game is not active, and no winner, game will
  // display main menu.  If active, display game, and
  // if inactive + winner, display winner component.
  const gameDisplay = () => {
    if (state.isRunning) {
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
    } else {
      if (state.winner.length > 0) {
        return <Winner winner={state.winner} />;
      } else {
        return <MainMenu startGame={initializeGame} />;
      }
    }
  };

  return (
    <>
      <section className="welcome-to-war">
        <h1 className="title text-warning">WAR</h1>
        <ol className="rules-list">
          <li>Each player throws out a card, highest wins.</li>
          <li>
            Equal cards means a draw, and a draw means...{" "}
            <span className="text-warning">WAR</span>.
          </li>
          <li>During WAR, draw 2 more cards. The final card is judged.</li>
          <li>If another draw is the outcome, continue until someone wins.</li>
          <li>
            WAR ends "with no survivors" (Bane, 2012).
            <br /> The game ends when there are no more cards in a player's
            deck.
          </li>
        </ol>
      </section>
      {gameDisplay()}
    </>
  );
}

export default GameController;
