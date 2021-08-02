function Card({ card: { suit, name }, checkWinner }) {
  if (suit === undefined) checkWinner;

  return (
    <div className="card col-md-12">
      <h3>{`${name} of ${suit}`}</h3>
    </div>
  );
}

export default Card;
