// contains board array
const Board = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  return { gameBoard };
})();

// contains board display methods
const boardController = (() => {
  // called by gameController.playMove
  const placeSymbol = (space, symbol) => {
    Board.gameBoard[space] = symbol;
  };
  // called by gameController.playMove
  const endAlert = (board) => {
    if (Game.winningGame(board)) {
      alert("Game Over - " + currentPlayer.name + " wins!");
    } else if (Game.fullBoard(board)) {
      alert("Game Over - Tie");
    }
  };
  const disableBoard = () => {
    for (i = 0; i < 9; i++) {
      const box = document.getElementById("box-" + (i + 1));
      box.style.pointerEvents = "none";
    }
  };
  const enableBoard = () => {
    for (i = 0; i < 9; i++) {
      const box = document.getElementById("box-" + (i + 1));
      box.style.pointerEvents = "auto";
    }
  };
  const clearBoard = () => {
    Board.gameBoard.fill("");
  };
  const displayBoard = () => {
    for (i = 0; i < 9; i++) {
      const box = document.getElementById("box-" + (i + 1));
      box.textContent = "";
      const token = document.createTextNode(Board.gameBoard[i]);
      box.appendChild(token);
    }
  };
  const showEndOfGame = () => {
    disableBoard();
    displayBoard();
    endAlert(Board.gameBoard);
  };
  const showWinningMove = () => {
    Game.winningMove.forEach((n) => {
      const box = document.getElementById("box-" + (n + 1));
      box.style.color = "red";
    });
  };
  const resetWinningMoveDisplay = () => {
    for (i = 0; i < 9; i++) {
      const box = document.getElementById("box-" + (i + 1));
      box.style.color = "purple";
    }
  };
  const placePlayerOneName = (playerOneName) => {
    const nameholder = document.querySelectorAll(".x-container");
    nameholder.forEach((div) => {
      let name = document.createTextNode("Player 1 (X)");
      if (playerOneName !== "Player 1") {
        name = document.createTextNode("Player 1 (X): " + playerOneName);
      }
      div.appendChild(name);
    });
  };
  // player two needs to be appended to two different divs for mobile responsiveness
  const placePlayerTwoName = (playerTwoName) => {
    const nameholder = document.querySelectorAll(".o-container-1, .o-container-2");
    nameholder.forEach((div) => {
      let name = document.createTextNode("Player 2 (O)");
      if (playerTwoName !== "Player 2") {
        name = document.createTextNode("Player 2 (O): " + playerTwoName);
      }
      div.appendChild(name);
    });
  };
  const clearNames = () => {
    const nameholder = document.querySelectorAll(".x-container, .o-container-1, .o-container-2")
    nameholder.forEach((div) => {
      while(div.firstChild) {
        div.removeChild(div.firstChild);
      }
    });
  };
  return { placeSymbol, disableBoard, enableBoard, clearBoard, displayBoard, showEndOfGame,
           showWinningMove, resetWinningMoveDisplay, placePlayerOneName, placePlayerTwoName, clearNames };
})();

// contains game logic
const Game = (() => {
  let winningMove = [];
  // called by gameController.gameOver and boardController.endAlert
  // sets winningMove as well as returning a boolean
  const fullBoard = (board) => {
    let fullOrNot = true;
    board.forEach((space) => {
      if (space === "") {
        fullOrNot = false;
      }
    });
    if (fullOrNot === true) {
      Game.winningMove = [];
    }
    return fullOrNot;
  };
  // called by gameController.gameOver and boardController.endAlert
  const winningGame = (board) => {
    return winViaRow(board) || winViaColumn(board) || winViaDiagonal(board);
  };
  // called by winningGame - sets winningMove as well as returning a boolean
  const winViaRow = (board) => {
    let winOrNot = false;
    for (let i = 0; i < 9; i += 3) {
      if (board[i] != "" &&
          board[i] === board[i + 1] &&
          board[i + 1] === board[i + 2]) {
        winOrNot = true;
        Game.winningMove = [i, i + 1, i + 2];
      }
    }
    return winOrNot;
  };
  // called by winningGame - sets winningMove as well as returning a boolean
  const winViaColumn = (board) => {
    let winOrNot = false;
    for (let i = 0; i < 3; i += 1) {
      if (board[i] != "" &&
          board[i] === board[i + 3] &&
          board[i + 3] === board[i + 6]) {
        winOrNot = true;
        Game.winningMove = [i, i + 3, i + 6];
      }
    }
    return winOrNot;
  };
  // called by winningGame - sets winningMove as well as returning a boolean
  const winViaDiagonal = (board) => {
    let winOrNot = false;
    if (board[4] != "" && (board[0] === board[4] && board[4] === board[8])) {
      winOrNot = true;
      Game.winningMove = [0, 4, 8];
    } else if (board[4] != "" && board[2] === board[4] && board[4] === board[6]) {
      winOrNot = true;
      Game.winningMove = [2, 4, 6];
    }
    return winOrNot;
  };
  return { winningMove, fullBoard, winningGame };
})();

// contains gameplay methods
const gameController = (() => {
  let numPlayers = "";
  let firstPlayer = "";
  // triggered by Save Game Settings button in modal - saves data from settings form
  const saveSettingsButton = document.querySelector('#save-settings-button');
  saveSettingsButton.onclick = () => {
    player1.name = document.getElementById('playerOneName').value;
    player2.name = document.getElementById('playerTwoName').value;
    if (document.getElementById('playerOneVComputer').checked) {
      numPlayers = "1";
      firstPlayer = "human";
    } else if (document.getElementById('computerVPlayerTwo').checked) {
      numPlayers = "1";
      firstPlayer = "computer";
    } else {
      numPlayers = "2";
      firstPlayer = "human";
    }
    boardController.clearNames();
    boardController.placePlayerOneName(player1.name);
    boardController.placePlayerTwoName(player2.name);
  };
  // triggered by New Game button - sets up and starts game, using current settings
  const startGame = () => {
    currentPlayer = player1;
    Game.winningMove = [];
    boardController.clearBoard();
    boardController.resetWinningMoveDisplay();
    boardController.displayBoard();
    boardController.enableBoard();
    if (numPlayers === "1") {
      if (firstPlayer === "computer") {
        alert(player1.name + " makes its move!");
        AI.computerMove(firstPlayer);
        switchCurrentPlayer();
      } else {
        alert("Make your move, " + player1.name + "!");
        boardController.clearBoard();
      }
      boardController.displayBoard();
    } else {
      alert("Make your move, " + player1.name + "!");
    }
  };
  // check for end conditions - called by playMove
  const gameOver = (board) => {
    return Game.winningGame(board) || Game.fullBoard(board)
  };
  const switchCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };
  // play a move - triggered by clicking on a board space (onClick in index.html)
  // plays human move; if in 1-player mode, plays computer move as well
  const playMove = (space) => {
    if (Board.gameBoard[space] === "") {
      boardController.placeSymbol(space, currentPlayer.symbol);
      if (gameOver(Board.gameBoard)) {
        boardController.showWinningMove();
        boardController.showEndOfGame();
      } else {
        switchCurrentPlayer();
        boardController.displayBoard();
      }
    }
    if (numPlayers === "1" && !gameOver(Board.gameBoard)) {
      boardController.disableBoard();
      setTimeout(() => {
        AI.computerMove(firstPlayer);
        if (gameOver(Board.gameBoard)) {
          boardController.showWinningMove();
          boardController.showEndOfGame();
        } else {
          switchCurrentPlayer();
          boardController.displayBoard();
          boardController.enableBoard();
        }
      }, 750);
    }
  };
  return { numPlayers, firstPlayer, startGame, gameOver, playMove };
})();

// contains methods for computer's moves
const AI = (() => {
  // makes the computer's move using the minimax method
  const computerMove = (firstPlayer) => {
    let availableMoves = [];
    Board.gameBoard.forEach((space, index) => {
      if (space === "") {
        availableMoves.push(index);
      }
    });
    let minimaxesOfChildren = AI.childrenOf(Board.gameBoard)
                                .map(child => AI.minimax(child, 9, false, firstPlayer));
    let max = Math.max(...minimaxesOfChildren);
    let move = availableMoves[minimaxesOfChildren.indexOf(max)];
    boardController.placeSymbol(move, currentPlayer.symbol);
  };
  // a node is an array representing the gameboard state
  // maximizingPlayer will start at false
  // called by gameController.computerMove
  const minimax = (node, depth, maximizingPlayer, firstPlayer) => {
    if (depth === 0 || isTerminal(node)) {
      return heuristicValue(node, firstPlayer);
    }
    if (maximizingPlayer) {
      let value = -Infinity;
      childrenOf(node, true).forEach((child) => {
        value = Math.max(value, minimax(child, depth - 1, false, firstPlayer));
      });
      return value;
    } else {
      let value = Infinity;
      childrenOf(node, false).forEach((child) => {
        value = Math.min(value, minimax(child, depth - 1, true, firstPlayer));
      });
      return value;
    }
  };
  // nodes are gameboard arrays
  // called by minimax - determines if a node is a terminal node (win or tie)
  const isTerminal = (node) => {
    return gameController.gameOver(node);
  };
  // called by minimax - gives the heuristic value of a node (win, lose, or neither)
  const heuristicValue = (node, firstPlayer) => {
    if (Game.winningGame(node)) {
      if (firstPlayer === "computer") {
        return winOrLoss(xJustWent(node));
      } else {
        return winOrLoss(!xJustWent(node));
      }
    } else {
      return 0;
    }
  };
  // called by mininax - find the children of a node (all board states that could be played next)
  const childrenOf = (node) => {
    let children = [];
    node.forEach((space, index) => {
      if (space === "") {
        let temp = node.map(el => el);
        if (xJustWent(node)) {
          temp[index] = "O";
        } else {
          temp[index] = "X";
        }
        children.push(temp);
      }
    });
    return children;
  };
  // helper function for heuristicValue
  const winOrLoss = (truthValue) => {
    if (truthValue) {
      return 1;
    } else {
      return -1;
    }
  }
  // helper function for heuristicValue and childrenOf
  const xJustWent = (node) => {
    return countSymbol(node, "X") > countSymbol(node, "O");
  };
  // helper function for xJustWent
  const countSymbol = (node, symbol) => {
    let count = 0;
    for (let i = 0; i < node.length; i++){
      if (node[i] == symbol) {
        count++;
      }
    }
    return count;
  };
  return { computerMove, minimax, childrenOf };
})();

// game player objects - two are created below
const Player = (name, symbol) => {
  return { name, symbol };
};

// code for showing and hiding the game settings modal
const modalController = (() => {
  // Modal JS mostly taken from https://sabe.io/tutorials/how-to-create-modal-popup-box
  const modal = document.querySelector(".modal");
  const trigger = document.querySelector(".trigger");
  const closeButton = document.querySelector(".close-button");
  const saveSettingsButton = document.querySelector("#save-settings-button");
  const toggleModal = () => {
    modal.classList.toggle("show-modal");
  }
  const windowOnClick = (event) => {
    if (event.target === modal) {
      toggleModal();
    }
  }
  trigger.addEventListener("click", toggleModal);
  closeButton.addEventListener("click", toggleModal);
  saveSettingsButton.addEventListener("click", toggleModal);
  window.addEventListener("click", windowOnClick);
})();

// initialization of players / current player / board and button
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");
boardController.placePlayerOneName(player1.name);
boardController.placePlayerTwoName(player2.name);
let currentPlayer = player1;
