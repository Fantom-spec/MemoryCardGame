import { useState, useEffect } from "react";

const allEmojis = [
  "🍎","🍌","🍇","🍉","🍒","🥝","🍍","🍑",
  "🍋","🍊","🥥","🥭","🍓","🫐","🥕","🌽",
  "🍆","🥔","🍅","🥦","🧄","🧅","🥜","🌰"
];

function shuffle(array) {
  return [...array]
    .concat(array)
    .sort(() => Math.random() - 0.5)
    .map((item, index) => ({
      id: index,
      value: item,
      flipped: false,
      matched: false
    }));
}

const STORAGE_KEY = "memory_leaderboard";

export default function MemoryGame() {
  const [loading, setLoading] = useState(true);
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false); // Start paused until name entered
  const [won, setWon] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState({ 4: [], 6: [], 8: [] });
  const [gameStarted, setGameStarted] = useState(false);

  // ✅ Proper initialization (no flicker)
  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || { 4: [], 6: [], 8: [] };
    setLeaderboard(data);

    const size = 4;
    const totalPairs = (size * size) / 2;
    const chosen = allEmojis.slice(0, totalPairs);

    setCards(shuffle(chosen));
    setGridSize(size);
    setMoves(0);
    setTime(0);
    setRunning(false);
    setWon(false);

    setLoading(false);
  }, []);

  // ⏱ Timer
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [running]);

  // 🎯 Matching logic
  useEffect(() => {
    if (selected.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = selected;

      if (a.value === b.value) {
        setCards((prev) =>
          prev.map((card) =>
            card.value === a.value ? { ...card, matched: true } : card
          )
        );
        setSelected([]);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === a.id || card.id === b.id
                ? { ...card, flipped: false }
                : card
            )
          );
          setSelected([]);
        }, 600);
      }
    }
  }, [selected]);

  // 🏆 Win + leaderboard
  useEffect(() => {
    if (cards.length && cards.every((c) => c.matched)) {
      setRunning(false);
      setWon(true);

      const newEntry = {
        name: playerName || "Anonymous",
        moves,
        time
      };

      const updatedSection = [...leaderboard[gridSize], newEntry]
        .sort((a, b) => a.time - b.time || a.moves - b.moves)
        .slice(0, 5);

      const updated = {
        ...leaderboard,
        [gridSize]: updatedSection
      };

      setLeaderboard(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  }, [cards]);

  // 🖱 Click handler
  const handleClick = (card) => {
    if (!playerName.trim()) return; // Block if no name entered
    
    // Start the timer on first card click
    if (!gameStarted) {
      setGameStarted(true);
      setRunning(true);
    }
    
    if (card.flipped || card.matched || selected.length === 2) return;

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    );

    setSelected((prev) => [...prev, { ...card, flipped: true }]);
  };

  // 🔁 Reset game
  const resetGame = (size = gridSize) => {
    const totalPairs = (size * size) / 2;
    const chosen = allEmojis.slice(0, totalPairs);

    setCards(shuffle(chosen));
    setSelected([]);
    setMoves(0);
    setTime(0);
    setRunning(false);
    setWon(false);
    setGridSize(size);
    setGameStarted(false);
  };

  // 🚫 Prevent flicker
  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <div className="title">Memory Game</div>

      <input
        className="name-input"
        placeholder="Enter your name to play"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{
          borderColor: !playerName.trim() ? '#ff4444' : undefined,
          outline: !playerName.trim() ? '2px solid rgba(255, 68, 68, 0.3)' : undefined
        }}
      />

      {!playerName.trim() && (
        <div style={{
          color: '#ff4444',
          fontSize: '14px',
          marginTop: '-8px',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          Please enter your name before playing
        </div>
      )}

      <div className="stats">
        <div>Moves: {moves}</div>
        <div>Time: {time}s</div>
      </div>

      <div className="controls">
        {[4, 6, 8].map((size) => (
          <button key={size} onClick={() => resetGame(size)}>
            {size}x{size}
          </button>
        ))}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(50px, 80px))`,
          opacity: !playerName.trim() ? 0.5 : 1,
          pointerEvents: !playerName.trim() ? 'none' : 'auto'
        }}
      >
        {cards.map((card) => (
          <div key={card.id} className="card" onClick={() => handleClick(card)}>
            <div
              className={`inner ${
                card.flipped || card.matched ? "flipped" : ""
              }`}
            >
              <div className="face front"></div>
              <div className="face back">{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 🏆 ALL LEADERBOARDS */}
      <div className="leaderboards">
        {[4, 6, 8].map((size) => (
          <div key={size} className="leaderboard">
            <h3>{size}x{size}</h3>
            {leaderboard[size].length === 0 ? (
              <p>No scores</p>
            ) : (
              leaderboard[size].map((e, i) => (
                <div key={i}>
                  #{i + 1} {e.name} - {e.time}s / {e.moves}
                </div>
              ))
            )}
          </div>
        ))}
      </div>

      {won && (
        <div className="popup">
          <div className="popup-box">
            <h2>You Won 🎉</h2>
            <p>{playerName || "Anonymous"}</p>
            <p>Moves: {moves}</p>
            <p>Time: {time}s</p>
            <button onClick={() => resetGame()}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}