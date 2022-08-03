const boardController = (() => {
  let gameBoard = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"]
  ];
  const displayBoard = (board) => {
    console.log(this);
    const boardDisplay = document.getElementById("board");
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

const gameController = (() => {
})();

const Player = (name, symbol) => {
  const playMove = (board, space) => {
    if ([1, 2, 3].includes(parseInt(space))) {
      board[0][parseInt(space) - 1] = symbol;
    }
    return board;
  }
  return { name, symbol, playMove };
};

let player1 = Player("mike", "X");
boardController.gameBoard = player1.playMove(boardController.gameBoard, "3")
boardController.displayBoard(boardController.gameBoard);
