const boardController = (() => {
  let gameBoard = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["X", "O", "X"]
  ];

  const displayBoard = (board) => {
    const boardDisplay = document.getElementById("board");
    console.log(boardDisplay);
    board.forEach((row) => {
      const rowDisplay = document.createElement("div");
      boardDisplay.appendChild(rowDisplay);
      row.forEach((box) => {
        const boxDisplay = document.createTextNode(box);
        rowDisplay.appendChild(boxDisplay);
      });
    });
  };

  return { gameBoard, displayBoard };
})();

boardController.displayBoard(boardController.gameBoard);

const gameController = (() => {
})();

const Player = (name) => {
  return { name };
};
