function Winner({ winner }) {
  const trashTalkArr = [
    "Better luck next time buddy.",
    "It was inevitable.",
    "How do I look from down there?  Like a winner?",
    "Oh snap! - Thanos"
  ];

  const randomTrashTalk = () => {
    const randomIndex = Math.floor(Math.random() * trashTalkArr.length);
    return trashTalkArr[randomIndex];
  };

  const poorWinner = () => {
    if (winner === "ai") {
      return <p className="trash-talk">{randomTrashTalk()}</p>;
    }
  };

  return (
    <div className="podium-finish">
      <h1>
        <span className="text-uppercase">{winner}</span> is the winner!{" "}
      </h1>
      {poorWinner()}
    </div>
  );
}

export default Winner;
