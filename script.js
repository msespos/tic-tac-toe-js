const boardController = (() => {
  let gameBoard = ["1", "2", "3", "4","5", "6", "7", "8", "9"];
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
})();

const Player = (name, symbol) => {
  const playMove = (space) => {
    space = parseInt(space);
    boardController.gameBoard[space - 1] = symbol;
    boardController.displayBoard();
  }
  return { name, symbol, playMove };
};

let player1 = Player("mike", "X");
let player2 = Player("katie", "O");
let currentPlayer = player1;

player1.playMove("8");
player2.playMove("3");
player1.playMove("5");

