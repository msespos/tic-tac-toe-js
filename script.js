const boardController = (() => {
  let gameBoard = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["X", "O", "X"]
  ];
  return { gameBoard };
})();

const gameController = (() => {
})();

const Player = (name) => {
  return { name };
};
