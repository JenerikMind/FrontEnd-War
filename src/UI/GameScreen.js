import "./style.css";

function GameScreen({ checkWinner, playerCardCount, aiCardCount }) {
  return (
    <div className="gameScreen">
      <div className="card-count">
        <p className="player-card-count">Player Cards: {playerCardCount}</p>
        <p className="ai-card-count">AI Cards: {aiCardCount}</p>
      </div>
      <button className="btn btn-warning" onClick={checkWinner}>
        Score Cards
      </button>
    </div>
  );
}

export default GameScreen;
