function GameScreen({ nextCard, checkWinner }) {
  return (
    <div className="gameScreen">
      <button onClick={nextCard}>Next Card</button>
      <button onClick={checkWinner}>Score Cards</button>
    </div>
  );
}

export default GameScreen;
