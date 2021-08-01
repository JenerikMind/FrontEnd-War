function GameScreen({ nextCard, checkWinner, playerCardCount, aiCardCount }) {
  return (
    <div className="gameScreen">
      <div className="player-card-count">
        <p>Player Cards: {playerCardCount}</p>
        <p>AI Cards: {aiCardCount}</p>
      </div>
      <button onClick={nextCard}>Next Card</button>
      <button onClick={checkWinner}>Score Cards</button>
    </div>
  );
}

export default GameScreen;
