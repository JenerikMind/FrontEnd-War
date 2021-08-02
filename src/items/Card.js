function Card({ card }) {
  if (card === undefined) {
    card = {
      name: "loser",
      suit: "loserville"
    };
  }
  return (
    <div className="card col-md-12">
      <h3>{`${card.name} of ${card.suit}`}</h3>
    </div>
  );
}

export default Card;
