import { useState, useEffect, useRef } from "react";
import "./styles.css";

// UI Tasks
// Create score, play again and timeleft components - Done;
// Create the grid, with terrain - Done;
// Create the mole, inside the hole, and make it clickable - Done;

// Functionality Tasks
// Only show selected moles;
// Perfurm
// Make the mole transition smoothly

const ROWS = 3;
const COLUMNS = 3;
const TOTAL_MOLES = ROWS * COLUMNS;
const MOLES_TO_SHOW = 2;

// Mole <img src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png" />
// Terrain <img src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png" />

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
const fisherYatesShuffle = (array) => {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Create a new array with all the possible numbers;
// Shuffle the array (mutate it);
// Slice only the numbers that you want;
// Return a new unique set of array of numbers;
const randomizer = () => {
  const indexes = Array.from({ length: TOTAL_MOLES }).map((_, index) => index);

  fisherYatesShuffle(indexes);

  const randomized = indexes.slice(0, MOLES_TO_SHOW);

  return new Set(randomized);
};

export default function App() {
  const [score, setScore] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15);

  const [visibleMoles, setVisibleMoles] = useState(new Set());

  const countdownTimerId = useRef(null);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(15);
    setScore(0);

    // Keeps the track of the time without the need of an useEffect
    countdownTimerId.current = setInterval(() => {
      setTimeLeft((prev) => {
        const nextTime = prev - 1;

        if (nextTime <= 0) {
          setIsPlaying(false);
          clearInterval(countdownTimerId.current);
        }

        return nextTime;
      });
    }, 1000);
  };

  const whackAMole = (index) => {
    // If the user has already clicked on this index
    // the index will be excluded from the list
    // This is to avoid multiple clicks, or clicks in an
    // unexistent index and scores.
    if (!visibleMoles.has(index)) {
      return;
    }

    // Create a new copy of the visible moles
    const newVisibleMoles = new Set(visibleMoles);

    // Delete the one that the user already clicked
    newVisibleMoles.delete(index);

    // Update the visible moles set
    setVisibleMoles(newVisibleMoles);

    // Update user score
    setScore(score + 1);
  };

  useEffect(() => {
    let molesTimer = null;

    // If the game is running
    // the moles will be auto generated every 1.5 seconds
    if (isPlaying) {
      molesTimer = setInterval(() => {
        setVisibleMoles(randomizer());
      }, 1500);
    }

    return () => {
      // Clears the interval on component unmount
      // To avoid side effects and errors.
      clearInterval(molesTimer);
      setVisibleMoles(new Set());
    };
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      // Clear countdown timer on unmount if it's running.
      clearInterval(countdownTimerId.current);
    };
  }, []);

  return (
    <main className="whack-a-mole">
      <header className="header">
        {score !== null ? (
          <>
            <p>Score: {score}</p>

            {!isPlaying && (
              <button onClick={startGame} aria-label="Reset Game">
                Try again
              </button>
            )}

            <p>Time left: {timeLeft}</p>
          </>
        ) : (
          <button onClick={startGame} aria-label="Start Game">
            Start Game
          </button>
        )}
      </header>

      <section
        className="game"
        style={{
          gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {Array(TOTAL_MOLES)
          .fill(null)
          .map((_, index) => {
            return (
              <div key={`column-${index}`} className="game-column">
                <button
                  onClick={() => whackAMole(index)}
                  className={["mole", visibleMoles.has(index) && "active-mole"]
                    .filter(Boolean)
                    .join(" ")}
                  aria-label={`mole-${index}`}
                >
                  <img
                    src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png"
                    width="100%"
                  />
                </button>
                <img
                  className="terrain"
                  src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png"
                  width="100%"
                />
              </div>
            );
          })}
      </section>
    </main>
  );
}
