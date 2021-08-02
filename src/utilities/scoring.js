/**
 *  Function takes 2 variables, the player current card value
 *  and the ai current card value.  It checks the index of the value
 *  and will return "win" if the card is of a higher value,
 *  "lose" if it's of a lower value, and "draw" if it's the same.
 */
function scoring(playerVal, aiVal) {
  const indexScoreValues = "A,2,3,4,5,6,7,8,9,10,J,Q,K".split(",");
  const playerIndexScore = indexScoreValues.indexOf(playerVal);
  const aiIndexScore = indexScoreValues.indexOf(aiVal);

  if (playerIndexScore > aiIndexScore) {
    return "win";
  } else if (playerIndexScore < aiIndexScore) {
    return "lose";
  } else {
    return "draw";
  }
}

/**
 *  Takes the top card in the deck and pushes it to the end
 *  of the deck.  Optional obj param to take from the losing
 *  deck.
 * @param {*} deck The winners deck
 * @param {*} obj The losing card
 */
function rewardWinner(deck = [], obj = null, numCards) {
  const winningCard = numCards ? deck.slice(0, numCards) : deck[0];
  let newDeck = numCards ? deck.slice(numCards) : deck.slice(1);

  winningCard.length > 1
    ? newDeck.push(...winningCard)
    : newDeck.push(winningCard);

  if (Array.isArray(obj)) {
    newDeck.push(...obj);
  } else if (obj) {
    newDeck.push(obj);
  }

  return newDeck;
}

/**
 *  Removes the top card from the loser's deck
 * @param {*} deck Losing deck
 */
function punishLoser(deck = [], numCards = 1) {
  return deck.slice(numCards);
}

/**
 *  The backbone of the logic in the game.
 *
 *  Function that determines how the cards are divvied up
 *  amongst the "players".  Default is that the winning player
 *  takes both the loser's card and the winning card.  WAR determines
 *  whether the winning player will take more than a single
 *  card.
 * @param {*} playerDeck
 * @param {*} aiDeck
 * @param {*} war state triggered on first "draw"
 * @param {*} overtime # of overtime rounds if consecutive "draw"s
 */
function outcome(playerDeck, aiDeck, war, overtime) {
  const playerCard = war ? playerDeck[2 + overtime] : playerDeck[0];
  const aiCard = war ? aiDeck[2 + overtime] : aiDeck[0];

  if (playerCard === undefined) return { winner: "ai" };
  if (aiCard === undefined) return { winner: "player" };

  let score = scoring(playerCard.name, aiCard.name);
  let spoils = 3 + overtime; // the spoils of war
  let newPlayerDeck,
    newAiDeck = [];

  if (score === "win") {
    if (war) {
      newPlayerDeck = rewardWinner(playerDeck, aiDeck.slice(0, spoils), spoils);
      newAiDeck = punishLoser(aiDeck, spoils);
    } else {
      newPlayerDeck = rewardWinner(playerDeck, aiCard);
      newAiDeck = punishLoser(aiDeck);
    }
  } else if (score === "lose") {
    if (war) {
      newAiDeck = rewardWinner(aiDeck, playerDeck.slice(0, spoils), spoils);
      newPlayerDeck = punishLoser(playerDeck, spoils);
    } else {
      newAiDeck = rewardWinner(aiDeck, playerCard);
      newPlayerDeck = punishLoser(playerDeck);
    }
  } else {
    // WARRRRRR
    if (war) {
      return { war: war, overtime: overtime + 1 };
    } else {
      return { war: !war };
    }
  }

  return {
    playerDeck: newPlayerDeck,
    aiDeck: newAiDeck,
    war: false,
    overtime: 0
  };
}

export { scoring, rewardWinner, punishLoser, outcome };
