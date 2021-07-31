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

  console.log(`Before: ${newDeck.length}`);

  winningCard.length > 1
    ? newDeck.push(...winningCard)
    : newDeck.push(winningCard);

  if (obj) newDeck.push(obj);

  console.log(`After: ${newDeck.length}`);
  return newDeck;
}

/**
 *  Removes the top card from the loser's deck
 * @param {*} deck Losing deck
 */
function punishLoser(deck = [], numCards = 1) {
  return deck.slice(numCards);
}

function outcome(playerDeck, aiDeck, war, overtime) {
  const playerCard = war ? playerDeck[2] : playerDeck[0];
  const aiCard = war ? aiDeck[2] : aiDeck[0];

  console.log(`Player: ${playerCard.name} // AI: ${aiCard.name}`);

  let score = scoring(playerCard.name, aiCard.name);

  console.log(`Score: ${score}`);

  let newPlayerDeck,
    newAiDeck = [];

  if (score === "win") {
    if (war) {
      console.log(`rewarding the winner of war...`);
      newPlayerDeck = rewardWinner(playerDeck, aiCard, 3);
      newAiDeck = punishLoser(aiDeck, 3);
    } else {
      newPlayerDeck = rewardWinner(playerDeck, aiCard);
      newAiDeck = punishLoser(aiDeck);
    }
  } else if (score === "lose") {
    if (war) {
      console.log(`rewarding the winner of war...`);
      newAiDeck = rewardWinner(aiDeck, playerCard, 3);
      newPlayerDeck = punishLoser(playerDeck, 3);
    } else {
      newAiDeck = rewardWinner(aiDeck, playerCard);
      newPlayerDeck = punishLoser(playerDeck);
    }
  } else {
    // WARRRRRR
    if (war) {
      return { war: war, overtime: true };
    } else {
      return { war: !war };
    }
  }

  return { playerDeck: newPlayerDeck, aiDeck: newAiDeck, war: false };
}

export { scoring, rewardWinner, punishLoser, outcome };
