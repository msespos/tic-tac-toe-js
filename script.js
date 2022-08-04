const boardController = (() => {
  let gameBoard = ["", "", "", "","", "", "", "", ""];
  const displayBoard = () => {
    for (i = 0; i < 9; i++) {
      const box = document.getElementById("box-" + (i + 1));
      box.textContent = "";
      const token = document.createTextNode(gameBoard[i]);
      box.appendChild(token);
    }
  };
  return { gameBoard, displayBoard };
})();

const gameController = (() => {
  const switchCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };
  return { switchCurrentPlayer };
})();

const Player = (name, symbol) => {
  const playMove = (space) => {
    space = parseInt(space);
    if (boardController.gameBoard[space - 1] === "") {
      boardController.gameBoard[space - 1] = symbol;
      gameController.switchCurrentPlayer();
    }
    boardController.displayBoard();
  }
  return { name, symbol, playMove };
};

const player1 = Player("mike", "X");
const player2 = Player("katie", "O");
currentPlayer = player1;
