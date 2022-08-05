// contains board array and board display method
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

// contains game logic
const gameController = (() => {
  // check if a game has been won - called by playMove every time it is triggered
  const winningGame = () => {
    if (winViaRow() === true || winViaColumn() === true || winViaDiagonal() === true) {
      return true;
    } else {
      return false;
    }
  }
  // called by winningGame
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
  // called by winningGame
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
  // called by winningGame
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
  // switch the current player - called by playMove each time it is triggered
  const switchCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };
  return { winningGame, winViaRow, winViaColumn, winViaDiagonal, switchCurrentPlayer };
})();

// game player objects - two will be created below
const Player = (name, symbol) => {
  // play a move - triggered by an onClick in index.html
  const playMove = (space) => {
    space = parseInt(space);
    if (boardController.gameBoard[space] === "") {
      boardController.gameBoard[space] = symbol;
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

// initialization of players / current player
const player1 = Player("mike", "X");
const player2 = Player("katie", "O");
currentPlayer = player1;
