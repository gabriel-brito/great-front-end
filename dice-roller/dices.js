const diceOne = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
const diceTwo = [
  [0, 0, 1],
  [0, 0, 0],
  [1, 0, 0],
];
const diceThree = [
  [0, 0, 1],
  [0, 1, 0],
  [1, 0, 0],
];
const diceFour = [
  [1, 0, 1],
  [0, 0, 0],
  [1, 0, 1],
];
const diceFive = [
  [1, 0, 1],
  [0, 1, 0],
  [1, 0, 1],
];
const diceSix = [
  [1, 1, 1],
  [0, 0, 0],
  [1, 1, 1],
];

export const dicePatterns = {
  1: diceOne,
  2: diceTwo,
  3: diceThree,
  4: diceFour,
  5: diceFive,
  6: diceSix,
};
