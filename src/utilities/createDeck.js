/**
 *  Function creates and returns a standard deck of cards.
 */
function createDeck() {
  const names = "A,2,3,4,5,6,7,8,9,10,J,Q,K".split(",");
  const suits = "Hearts,Diamonds,Spades,Clubs".split(",");

  const deck = [];

  for (let suit of suits) {
    for (let name of names) {
      deck.push({
        name: name,
        suit: suit
      });
    }
  }

  return deck;
}

export default createDeck;
