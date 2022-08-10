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
  const displayEnd = (board) => {
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
  }
  const enableBoard = () => {
    for (i = 0; i < 9; i++) {
      const box = document.getElementById("box-" + (i + 1));
      box.style.pointerEvents = "auto";
    }
  }
  const clearBoard = () => {
    Board.gameBoard.fill("");
  }
  const displayBoard = () => {
    for (i = 0; i < 9; i++) {
      const box = document.getElementById("box-" + (i + 1));
      box.textContent = "";
      const token = document.createTextNode(Board.gameBoard[i]);
      box.appendChild(token);
    }
  };
  return { placeSymbol, displayEnd, disableBoard, enableBoard, clearBoard, displayBoard };
})();

// contains game logic
const Game = (() => {
  // called by gameController.gameOver and boardController.displayEnd
  const fullBoard = (board) => {
    let fullOrNot = true;
    board.forEach((space) => {
      if (space === "") {
        fullOrNot = false;
      }
    });
    return fullOrNot;
  };
  // called by gameController.gameOver and boardController.displayEnd
  const winningGame = (board) => {
    return winViaRow(board) || winViaColumn(board) || winViaDiagonal(board);
  };
  // called by winningGame
  const winViaRow = (board) => {
    let winOrNot = false;
    for (let i = 0; i < 9; i += 3) {
      if (board[i] != "" &&
          board[i] === board[i + 1] &&
          board[i + 1] === board[i + 2]) {
        winOrNot = true;
      }
    }
    return winOrNot;
  };
  // called by winningGame
  const winViaColumn = (board) => {
    let winOrNot = false;
    for (let i = 0; i < 3; i += 1) {
      if (board[i] != "" &&
          board[i] === board[i + 3] &&
          board[i + 3] === board[i + 6]) {
        winOrNot = true;
      }
    }
    return winOrNot;
  };
  // called by winningGame
  const winViaDiagonal = (board) => {
    return board[4] != "" &&
            (board[0] === board[4] &&
             board[4] === board[8] ||
             board[2] === board[4] &&
             board[4] === board[6]);
  };
  return { fullBoard, winningGame, winViaRow, winViaColumn, winViaDiagonal };
})();

// contains gameplay methods
const gameController = (() => {
  let numPlayers = "";
  let firstPlayer = "";
  // sets up and starts game, depending on user input
  const startGame = () => {
    currentPlayer = player1;
    boardController.clearBoard();
    boardController.displayBoard();
    boardController.enableBoard();
    selectNumberOfPlayers();
    if (numPlayers === "1") {
      selectFirstPlayer();
      if (firstPlayer === "computer") {
        alert(player1.name + " makes their move!");
        computerMove();
        switchCurrentPlayer();
      } else {
        alert("Make your move, " + player1.name + " !");
        boardController.clearBoard();
      }
      boardController.displayBoard();
    }
  }
  const selectNumberOfPlayers = () => {
    numPlayers = prompt("One player or Two player game? Please enter 1 or 2");
    while (numPlayers !== "1" && numPlayers !== "2") {
      numPlayers = prompt("Please enter 1 or 2");
    };
    gameController.numPlayers = numPlayers;
  }
  const selectFirstPlayer = () => {
    humanPlayer = prompt("Would you like to be the first or second player? Please enter 1 or 2")
    while (humanPlayer !== "1" && humanPlayer !== "2") {
      humanPlayer = prompt("Please enter 1 or 2");
    };
    humanPlayer === "1" ? firstPlayer = "human" : firstPlayer = "computer"
  }
  // check for end conditions - called by gameController.playMove
  const gameOver = (board) => {
    if (Game.winningGame(board) || Game.fullBoard(board)) {
      return true;
    } else {
      return false;
    }
  };
  const switchCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };
  // play a move - triggered by an onClick in index.html
  const playMove = (space) => {
    if (Board.gameBoard[space] === "") {
      boardController.placeSymbol(space, currentPlayer.symbol);
      if (gameOver(Board.gameBoard)) {
        boardController.disableBoard();
        boardController.displayBoard();
        boardController.displayEnd(Board.gameBoard);
      }
      switchCurrentPlayer();
    }
    if (gameController.numPlayers === "1" && !gameOver(Board.gameBoard)) {
      computerMove();
      if (gameOver(Board.gameBoard)) {
        boardController.disableBoard();
        boardController.displayBoard();
        boardController.displayEnd(Board.gameBoard);
      }
      switchCurrentPlayer();
    }
    boardController.displayBoard();
  }
  const computerMove = () => {
    // from https://stackoverflow.com/questions/47917535/get-indexes-of-filtered-array-items
    const availableMoves = Board.gameBoard.reduce(function(acc, curr, index) {
      if (curr === "") {
        acc.push(index);
      }
      return acc;
    }, []);
    // from https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    boardController.placeSymbol(move, currentPlayer.symbol);
  }
  return { numPlayers, firstPlayer, startGame, selectNumberOfPlayers, selectFirstPlayer,
           gameOver, switchCurrentPlayer, playMove, computerMove };
})();
const AI = (() => {
  /* minimax pseudocode below taken from https://en.wikipedia.org/wiki/Minimax

  function  minimax( node, depth, maximizingPlayer ) is
      if depth = 0 or node is a terminal node then
          return the heuristic value of node
      if maximizingPlayer then
          value := −∞
          for each child of node do
              value := max(value, minimax(child, depth − 1, FALSE))
          return value
      else (* minimizing player *)
          value := +∞
          for each child of node do
              value := min( value, minimax( child, depth − 1, TRUE ) )
          return value
  */

  // taken from the pseudocode above
  // a node is an array representing the gameboard state
  // depth will start at 9
  // maximizingPlayer will be true to start
  const minimax = (node, depth, maximizingPlayer) => {
    if (depth === 0 || isTerminal(node)) {
      return heuristicValue(node);
    }
    if (maximizingPlayer) {
      let value = -Infinity;
      childrenOf(node).forEach((child) => {
        value = Math.max(value, minimax(child), depth - 1, false)
      });
      return value;
    } else {
      let value = Infinity;
      childrenOf(node).forEach((child) => {
        value = Math.min(value, minimax(child), depth - 1, true)
      });
      return value;
    }
  }

  // nodes are gameboard arrays

  // determine if a node is a terminal node (win or tie)
  const isTerminal = (node) => {
    return gameController.gameOver(node);
  }

  // give the heuristic value of a node (win, lose, or neither)
  const heuristicValue = (node) => {
    // to be completed
  }
  // find the children of a node (all board states that could be played next)
  const childrenOf = (node) => {
    // to be completed
  }
  return { minimax, isTerminal, heuristicValue, childrenOf };
})();

// game player objects - two will be created below
const Player = (name, symbol) => {
  return { name, symbol };
};

// initialization of players / current player / board and button
const player1 = Player("Baby Yoda", "X");
const player2 = Player("Luke Skywalker", "O");
let currentPlayer = player1;
