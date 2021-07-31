function Card({ card: { suit, name } }) {
  return (
    <div className="card">
      <h3>{`${name} of ${suit}`}</h3>
    </div>
  );
}

export default Card;
