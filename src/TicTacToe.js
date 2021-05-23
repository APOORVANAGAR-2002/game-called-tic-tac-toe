import { useContext, useState, React } from "react";
import { BoardContext } from "./App";
import produce from "immer";
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";

let moves = 0;

function TicTacToe() {

  let { board, setBoard } = useContext(BoardContext);
  let [player, setPlayer] = useState("O");

  // horizontal winning condition
  let checkRow = function (board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== -1) {
        return (true);
      }
    }
    return (false);
  }

  // vertical winning condition
  let checkCol = function (board) {
    for (let i = 0; i < board.length; i++) {
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== -1) {
        return (true);
      }
    }
    return (false);
  }

  // diagonal winning condition
  let checkDiagonal = function (board) {
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== -1) {
      return true;
    }
    else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== -1) {
      return true;
    }
    return false;
  }

  // checking winner
  let checkWinner = function (board) {
    if (checkRow(board) || checkCol(board) || checkDiagonal(board)) {
      return player;
    }
    return null;
  }

  return (<div style={{
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#2b2e4a"
  }}>

    <Typography variant="h3" style={{
      color: "#f39189",
      fontFamily: "Lucida Console",
    }}>Tic Tac Toe</Typography>
    <Typography variant="h6" style={{
      color: "#f39189",
      fontFamily: "Lucida Console"
    }}>Current Player: {player}</Typography>

    {
      board.map(function (row, rowIndex) {
        return (
          <div style={{
            display: "flex",
            flexDirection: "row"
          }}>

            {
              row.map(function (item, colIndex) {
                return <Button style={{
                  width: "100px",
                  height: "100px",
                  background: "#e84545",
                  color: "f2edd7",
                  fontWeight: "3rem",
                  fontSize: "50px",
                  margin: "5px",
                  fontFamily: "Lucida Console"
                }} onClick={function () {
                  const updated = produce(board, (draftState) => {
                    if (draftState[rowIndex][colIndex] === -1) {
                      draftState[rowIndex][colIndex] = player;
                    }


                  });
                  let result = checkWinner(updated);
                  moves++;

                  if (result !== null || moves === 9) {
                    if (result === null && moves === 9) {
                      window.alert("Oops! Game Tied");
                    }
                    else {
                      window.alert("And the winner is... " + result);
                    }
                    window.location.reload();
                  }

                  setBoard(updated);
                  setPlayer(player === "O" ? "X" : "O");
                }
                }> {item === -1 ? " " : item} </Button>
              })
            }
          </div>
        )
      })
    }

  </div>)
}

export default TicTacToe;