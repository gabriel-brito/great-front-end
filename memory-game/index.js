import { useState } from "react";

const emojis = [
  "🐵",
  "🐶",
  "🦊",
  "🐱",
  "🦁",
  "🐯",
  "🐴",
  "🦄",
  "🦓",
  "🦌",
  "🐮",
  "🐷",
  "🐭",
  "🐹",
  "🐻",
  "🐨",
  "🐼",
  "🐽",
  "🐸",
  "🐰",
  "🐙",
];

const CARDS_QUANTITY = 8;
const ROWS = CARDS_QUANTITY / 2;
const COLUMNS = CARDS_QUANTITY / 2;
const SELECTED_EMOJIS = emojis.slice(0, CARDS_QUANTITY);

// UI Tasks
// Develop a grid 4x4; - Done;
// Create a grid that wrapps the emoji and centralize it - Done;

const fisherYatesShuffle = (array) => {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[j], array[i]] = [array[i], array[j]];
  }

  return array;
};

const generateEmojis = (() => {
  const randomize = () => {
    const emojis = [...SELECTED_EMOJIS, ...SELECTED_EMOJIS];

    fisherYatesShuffle(emojis);

    return emojis;
  };

  return {
    emojis: randomize(),
    randomize,
  };
})();

export default function App() {
  const [emojiProvider, setEmojiProvider] = useState(generateEmojis);
  const [firstMatch, setFirstMatch] = useState(null);
  const [secondMatch, setSecondMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const { emojis, randomize } = emojiProvider;
  const endGame = matches.length === emojis.length;

  const handleCardSelection = (index) => {
    if (!firstMatch) {
      setFirstMatch(index);
      return;
    }

    setSecondMatch(index);

    if (emojis[index] === emojis[firstMatch]) {
      const newMatches = matches.slice();
      newMatches.push(index);
      newMatches.push(firstMatch);
      setMatches(newMatches);
    }

    setTimeout(() => {
      setFirstMatch(null);
      setSecondMatch(null);
    }, [1000]);
  };

  const resetGame = () => {
    setFirstMatch(null);
    setSecondMatch(null);
    setMatches([]);
    setEmojiProvider({
      emojis: randomize(),
      randomize: randomize,
    });
  };

  return (
    <>
      <div
        className="game-grid"
        style={{ gridTemplateColumns: `repeat(${COLUMNS}, 1fr)` }}
      >
        {Array.from({ length: ROWS * COLUMNS })
          .fill(null)
          .map((_, index) => {
            const isMatch = matches.includes(index);
            const isSelected = firstMatch === index || secondMatch === index;
            const isVisible = isSelected || isMatch;

            return (
              <button
                aria-label={`card-${index}`}
                className={[
                  "game-grid__card",
                  isVisible && "game-grid__card--visible",
                  isMatch && "game-grid__card--match",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={`card-${index}`}
                onClick={() => {
                  if (isVisible) return;

                  handleCardSelection(index);
                }}
              >
                {emojis[index]}
              </button>
            );
          })}
      </div>

      {endGame && (
        <div style={{ textAlign: "center" }}>
          <button onClick={resetGame} aria-label="Play again">
            Play Again
          </button>
        </div>
      )}
    </>
  );
}
