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
  const winningGame = () => {
    if (winViaRow() === true || winViaColumn() === true || winViaDiagonal() === true) {
      return true;
    } else {
      return false;
    }
  }
  const winViaRow = () => {
    let winOrNot = false;
    for (let i = 0; i < 9; i += 3) {
      if (boardController.gameBoard[i] != ""
          && boardController.gameBoard[i] === boardController.gameBoard[i + 1]
          && boardController.gameBoard[i + 1] === boardController.gameBoard[i + 2]) {
        winOrNot = true;
      }
    }
    return winOrNot;
  }
  const winViaColumn = () => {
    let winOrNot = false;
    for (let i = 0; i < 3; i += 1) {
      if (boardController.gameBoard[i] != ""
          && boardController.gameBoard[i] === boardController.gameBoard[i + 3]
          && boardController.gameBoard[i + 3] === boardController.gameBoard[i + 6]) {
        winOrNot = true;
      }
    }
    return winOrNot;
  }
  const winViaDiagonal = () => {
    if (boardController.gameBoard[0] != ""
          && boardController.gameBoard[0] === boardController.gameBoard[4]
          && boardController.gameBoard[4] === boardController.gameBoard[8]
        || boardController.gameBoard[2] != ""
            && boardController.gameBoard[2] === boardController.gameBoard[4]
            && boardController.gameBoard[4] === boardController.gameBoard[6]) {
      return true;
    }
  }
  const switchCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };
  return { winningGame, winViaRow, winViaColumn, winViaDiagonal, switchCurrentPlayer };
})();

const Player = (name, symbol) => {
  const playMove = (space) => {
    space = parseInt(space);
    if (boardController.gameBoard[space - 1] === "") {
      boardController.gameBoard[space - 1] = symbol;
    }
    if (gameController.winningGame() === true) {
      boardController.displayBoard();
      alert(currentPlayer.name + " wins!");
    } else {
    }
    gameController.switchCurrentPlayer();
    boardController.displayBoard();
  }
  return { name, symbol, playMove };
};

const player1 = Player("mike", "X");
const player2 = Player("katie", "O");
currentPlayer = player1;
