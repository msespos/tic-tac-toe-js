// contains board array
const Board = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  return { gameBoard };
})();

// contains board display methods
const boardController = (() => {
  // called by playMove Player method
  const placeSymbol = (space, symbol) => {
    Board.gameBoard[space] = symbol;
  };
  // called by playMove Player method
  const checkForAndDisplayEnd = () => {
    if (gameController.gameOver() === "win" || gameController.gameOver() === "tie") {
      disableGrid();
      addNewGameButton();
      displayBoard();
    }
    if (gameController.gameOver() === "win") {
      alert("Game Over - " + currentPlayer.name + " wins!");
    } else if (gameController.gameOver() === "tie") {
      alert("Game Over - Tie");
    }
  };
  const disableGrid = () => {
    for (i = 0; i < 9; i++) {
      const box = document.getElementById("box-" + (i + 1));
      box.style.pointerEvents = 'none';
    }
  }
  const addNewGameButton = () => {
    const button = document.getElementById("new-game-button")
    button.style.display = "block";
  }
  const displayBoard = () => {
    for (i = 0; i < 9; i++) {
      const box = document.getElementById("box-" + (i + 1));
      box.textContent = "";
      const token = document.createTextNode(Board.gameBoard[i]);
      box.appendChild(token);
    }
  };
  return { placeSymbol, checkForAndDisplayEnd, displayBoard };
})();

// contains game logic
const Game = (() => {
  // called by gameController.gameOver
  const fullBoard = () => {
    let fullOrNot = true;
    Board.gameBoard.forEach((space) => {
      if (space === "") {
        fullOrNot = false;
      }
    });
    return fullOrNot;
  };
  // called by gameController.gameOver
  const winningGame = () => {
    return winViaRow() || winViaColumn() || winViaDiagonal();
  };
  // called by winningGame
  const winViaRow = () => {
    let winOrNot = false;
    for (let i = 0; i < 9; i += 3) {
      if (Board.gameBoard[i] != "" &&
          Board.gameBoard[i] === Board.gameBoard[i + 1] &&
          Board.gameBoard[i + 1] === Board.gameBoard[i + 2]) {
        winOrNot = true;
      }
    }
    return winOrNot;
  };
  // called by winningGame
  const winViaColumn = () => {
    let winOrNot = false;
    for (let i = 0; i < 3; i += 1) {
      if (Board.gameBoard[i] != "" &&
          Board.gameBoard[i] === Board.gameBoard[i + 3] &&
          Board.gameBoard[i + 3] === Board.gameBoard[i + 6]) {
        winOrNot = true;
      }
    }
    return winOrNot;
  };
  // called by winningGame
  const winViaDiagonal = () => {
    return Board.gameBoard[4] != "" &&
            (Board.gameBoard[0] === Board.gameBoard[4] &&
             Board.gameBoard[4] === Board.gameBoard[8] ||
             Board.gameBoard[2] === Board.gameBoard[4] &&
             Board.gameBoard[4] === Board.gameBoard[6]);
  };
  return { fullBoard, winningGame, winViaRow, winViaColumn, winViaDiagonal };
})();

// contains gameplay methods
const gameController = (() => {
  // check for end conditions - called by boardController.checkForAndDisplayEnd
  const gameOver = () => {
    if (Game.winningGame()) {
      return "win";
    } else if (Game.fullBoard()) {
      return "tie";
    }
  };
  // switch the current player - called by Player.playMove each time it is triggered
  const switchCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };
  return { gameOver, switchCurrentPlayer };
})();

// game player objects - two will be created below
const Player = (name, symbol) => {
  // play a move - triggered by an onClick in index.html
  const playMove = (space) => {
    if (Board.gameBoard[space] === "") {
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
