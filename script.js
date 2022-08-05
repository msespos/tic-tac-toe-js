// contains board array and board display method
const boardController = (() => {
  let gameBoard = ["", "", "", "","", "", "", "", ""];
  // called by playMove Player method
  const placeSymbol = (space, symbol) => {
    gameBoard[space] = symbol;
  };
  // called by playMove Player method
  const checkForAndDisplayEnd = () => {
    if (gameController.gameOver() === "win") {
      disableGrid();
      displayBoard();
      alert("Game Over - " + currentPlayer.name + " wins!");
    } else if (gameController.gameOver() === "tie") {
      disableGrid();
      displayBoard();
      alert("Game Over - Tie");
    }
  };
  const disableGrid = () => {
    for (i = 0; i < 9; i++) {
      const box = document.getElementById("box-" + (i + 1));
      box.style.pointerEvents = 'none';
    }
  }
  const displayBoard = () => {
    for (i = 0; i < 9; i++) {
      const box = document.getElementById("box-" + (i + 1));
      box.textContent = "";
      const token = document.createTextNode(gameBoard[i]);
      box.appendChild(token);
    }
  };
  return { gameBoard, placeSymbol, checkForAndDisplayEnd, displayBoard };
})();

// contains game logic
const gameController = (() => {
  // check for end conditions - called by boardController.checkForAndDisplayEnd
  const gameOver = () => {
    if (winningGame() === true) {
      return "win";
    } else if (fullBoard() === true) {
      return "tie";
    }
  };
  // called by gameOver
  const fullBoard = () => {
    let fullOrNot = true;
    boardController.gameBoard.forEach((space) => {
      if (space === "") {
        fullOrNot = false;
      }
    });
    return fullOrNot;
  };
  // called by gameOver
  const winningGame = () => {
    if (winViaRow() === true || winViaColumn() === true || winViaDiagonal() === true) {
      return true;
    } else {
      return false;
    }
  };
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
  };
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
  };
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
  };
  // switch the current player - called by playMove each time it is triggered
  const switchCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };
  return { gameOver, fullBoard, winningGame, winViaRow, winViaColumn, winViaDiagonal,
           switchCurrentPlayer };
})();

// game player objects - two will be created below
const Player = (name, symbol) => {
  // play a move - triggered by an onClick in index.html
  const playMove = (space) => {
    if (boardController.gameBoard[space] === "") {
      boardController.placeSymbol(space, symbol);
      boardController.checkForAndDisplayEnd();
      gameController.switchCurrentPlayer();
    }
    boardController.displayBoard();
  }
  return { name, symbol, playMove };
};

// initialization of players / current player
const player1 = Player("Baby Yoda", "X");
const player2 = Player("Luke Skywalker", "O");
currentPlayer = player1;
